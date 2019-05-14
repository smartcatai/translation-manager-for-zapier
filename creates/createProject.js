
const request = require('request');
const Multipart = require('multipart-stream')
const apiConst = require('../apiConst');
const langs = require('../langs.json');

sourceLangs = langs.reduce((langs, lang) => { langs[lang.key] = lang.label; return langs },{})

const vendor = (z, bundle) => {
  const response = z.request(`https://${apiConst.servers[bundle.authData.api_server]}${apiConst.routes.vendors}`);
  // json is is [{"key":"field_1"},{"key":"field_2"}]
  return response
    .then(res => res.json)
    .then(res => res.items.reduce(
      (vendors, vendor )=>{vendors[vendor.id]=vendor.name; return vendors },
      {}
      ))
    .then(vendors => { return {key: 'vendor', choices: vendors, required: false, type: 'string', label: 'Vendor'}});
};

// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'create_project',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Project',
  display: {
    label: 'Create Project',
    description: 'Creates a new Project.'
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [
      {key: 'name', required: true, type: 'string', label: 'Name'},
      {key: 'sourceLanguage', choices: sourceLangs, required: true, type: 'string', label: 'Source Language'},
      {key: 'targetLanguages', choices: sourceLangs, required: true, list: true, type: 'string', label: 'Target Languages'},
      vendor,
      {key: 'workflowStages', choices: apiConst.workflowStages, required: true, list: true, type: 'string', label: 'Workflow Stages'},
      {key: 'filename', required: true, type: 'string', label: 'Filename'},
      {key: 'file', required: true, list: true, type: 'file', label: 'File'},
      {key: 'description', required: false, type: 'string', label: 'Description'},

    ],
    perform: (z, bundle) => {
      const mp = new Multipart();
      const model = {
        name: bundle.inputData.name,
        description: bundle.inputData.description || 'project from zapier',
        sourceLanguage: bundle.inputData.sourceLanguage,
        targetLanguages: bundle.inputData.targetLanguages,
        assignToVendor :false,
        useMT: false,
        pretranslate: false,
        useTranslationMemory: false,
        autoPropagateRepetitions: false,
        workflowStages: bundle.inputData.workflowStages,
        isForTesting: false,
        externalTag: 'source:Zapier',
      };

      if(bundle.inputData.vendor){
        model.vendorAccountIds = [
          bundle.inputData.vendor
        ];
        model.assignToVendor = true;
      }

      mp.addPart({
        headers:{
          'Content-Disposition': 'form-data; name="model"',
          'Content-Type':'application/json',
        },
        body: z.JSON.stringify(model)
      })
      if(bundle.inputData.file){
        mp.addPart({
          headers:{
            'Content-Disposition': `form-data; name="file_"; filename="${bundle.inputData.filename}"`,
            'Content-Type':'application/octet-stream',
          },
          body: request(bundle.inputData.file)
        })
      }

      const promise = z.request({
        url: `https://${apiConst.servers[bundle.authData.api_server]}${apiConst.routes.createProject}`,
        method: 'POST',
        body: mp,
        headers: {
          'Content-Type': `multipart/form-data; boundary="${mp.boundary}"`,
          'Accept': 'application/json'
        }
      });
      /*
      {
          name: bundle.inputData.name,
          directions: bundle.inputData.directions,
          authorId: bundle.inputData.authorId,
          style: bundle.inputData.style,
        }
      */

      return promise.then((response) => JSON.parse(response.content));
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
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'createdAt', label: 'Created At'},
      {key: 'name', label: 'Name'},
    ]
  }
};
