const MultipartRequest = require('../api/multipartRequest')
const apiConst = require('../apiConst');
const langs = require('../langs.json');

const sourceLangs = langs.reduce((langs, lang) => {
  langs[lang.key] = lang.label;
  return langs
}, {})

const vendor = (z, bundle) => {
  const response = z.request(`https://${apiConst.servers[bundle.authData.api_server]}${apiConst.routes.vendors}`);

  return response
    .then(res => res.json)
    .then(res => res.items.reduce(
      (vendors, vendor) => {
        vendors[vendor.id] = vendor.name;
        return vendors
      }, {}
    ))
    .then(vendors => {
      return {
        key: 'vendor',
        choices: vendors,
        required: false,
        type: 'string',
        label: 'Vendor'
      }
    });
};

const getProject = (z, bundle) => {
  let params = {
    externalTag: 'source:Zapier',
  };
  if (bundle.inputData.projectName) {
    params.projectName = bundle.inputData.projectName;
  }

  const requestOptions = {
    url: `https://${apiConst.servers[bundle.authData.api_server]}${apiConst.routes.project}/list`,
    params: params
  };

  return z.request(requestOptions)
    .then((response) => {
      return z.JSON.parse(response.content);
    });
};

const createProject = (z, bundle, file) => {
  const model = {
    name: bundle.inputData.projectName,
    description: 'Document from zapier',
    sourceLanguage: bundle.inputData.sourceLanguage,
    targetLanguages: bundle.inputData.targetLanguages,
    assignToVendor: false,
    useMT: false,
    pretranslate: false,
    useTranslationMemory: false,
    autoPropagateRepetitions: false,
    workflowStages: bundle.inputData.workflowStages,
    isForTesting: false,
    externalTag: 'source:Zapier',
  };
  const files = [];

  if (bundle.inputData.vendor) {
    model.vendorAccountIds = [
      bundle.inputData.vendor
    ];
    model.assignToVendor = true;
  }

  if (file) {
    files.push({
      name: `${bundle.inputData.documentName}.${bundle.inputData.documentType}`,
      content: file
    });
  }

  const url = `https://${apiConst.servers[bundle.authData.api_server]}${apiConst.routes.createProject}`;

  return MultipartRequest(z, url, 'post', model, files);
};
const updateDocument = (z, bundle, file, documentId) => {

  const model = {
    "bilingualFileImportSetings": {
      "targetSubstitutionMode": "all",
      "lockMode": "none",
      "confirmMode": "none"
    },
    "enablePlaceholders": true
  };
  const files = [];

  if (file) {
    files.push({
      name: `${bundle.inputData.documentName}.${bundle.inputData.documentType}`,
      content: file
    });
  }

  const url = `https://${apiConst.servers[bundle.authData.api_server]}${apiConst.routes.updateDocument}?documentId=${documentId}`;

  return MultipartRequest(z, url, 'put', model, files).then(result=>result[0]);

};

const addDocument = (z, bundle, file, projectId) => {

  const model = [{
    "externalId": null,
    "metaInfo": null,
    "disassembleAlgorithmName": null,
    "bilingualFileImportSetings": {
      "targetSubstitutionMode": "all",
      "lockMode": "none",
      "confirmMode": "none"
    },
    "targetLanguages": bundle.inputData.targetLanguages,
    "enablePlaceholders": true
  }];
  const files = [];

  if (file) {
    files.push({
      name: `${bundle.inputData.documentName}.${bundle.inputData.documentType}`,
      content: file
    });
  }

  const url = `https://${apiConst.servers[bundle.authData.api_server]}${apiConst.routes.addDocument}?projectId=${projectId}`;

  return MultipartRequest(z, url, 'post', model, files).then(result=>result[0]);

};

// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'create_document',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Document',
  display: {
    label: 'Create Document',
    description: 'Creates a new Document.'
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [{
        key: 'projectName',
        required: true,
        type: 'string',
        label: 'Project Name'
      },
      {
        key: 'sourceLanguage',
        choices: sourceLangs,
        required: true,
        type: 'string',
        label: 'Source Language'
      },
      {
        key: 'targetLanguages',
        choices: sourceLangs,
        required: true,
        list: true,
        type: 'string',
        label: 'Target Languages'
      },
      vendor,
      {
        key: 'workflowStages',
        choices: apiConst.workflowStages,
        required: true,
        list: true,
        type: 'string',
        label: 'Workflow Stages'
      },
      {
        key: 'documentName',
        required: true,
        type: 'string',
        label: 'Document Name'
      },
      {
        key: 'documentType',
        choices: apiConst.documentType,
        required: true,
        type: 'string',
        label: 'Document Type'
      },
      {
        key: 'update',
        type: 'boolean',
        label: 'Document Update'
      },
      (z, bundle) => {
        if (apiConst.documentType[bundle.inputData.documentType] === apiConst.documentType.json &&
          bundle.inputData.update) {
          return [{
            key: 'jsonMerge',
            required: true,
            type: 'boolean',
            label: 'Merge Json'
          }, ];
        }
        return [];
      },
      {
        key: 'content',
        required: true,
        list: true,
        type: 'text',
        label: 'Content'
      },
    ],
    perform: (z, bundle) => {
      let response;
      if (bundle.inputData.content) {

        const bf = Buffer.from(bundle.inputData.content, 'utf8');
        const project = getProject(z, bundle);

        if(!project){
          return createProject(z, bundle, bf.toString())
        }

        return project.then((result) => {
          const docs = result[0].documents.filter((document) => {
            return document.name === bundle.inputData.documentName
          });
          if (docs.length === 0) {
            return addDocument(z, bundle, bf.toString(), result[0].id);
          }
          return updateDocument(z, bundle, bf.toString(), docs[0].id);
        });
      }
    },

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      id: 1,
      createdAt: 1472069465,
      name: 'Best Spagetti Ever',
    },

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [{
        key: 'id',
        label: 'ID'
      },
      {
        key: 'createdAt',
        label: 'Created At'
      },
      {
        key: 'name',
        label: 'Name'
      },
    ]
  }
};