const apiConst = require('../apiConst');
const hidtrators = require('../hydrators/index');

// We recommend writing your creates separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'create_export',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Export',
  display: {
    label: 'Create Export',
    description: 'Creates a new Export.'
  },

  // `operation` is where the business logic goes.
  operation: {
    inputFields: [
      {key: 'documentIds', required: true, type: 'string', label: 'Ids document for export'},
    ],
    perform: (z, bundle) => {

      let queryParams = '?';
      if (bundle.inputData.documentIds) {
        queryParams += `documentIds[]=${bundle.inputData.documentIds}`;
      }

      url = `https://${apiConst.servers[bundle.authData.api_server]}${apiConst.routes.createExport}${queryParams}`;

      const promise = z.request({
        url: url,
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        }
      });

      return promise
        .then((response) => JSON.parse(response.content))
        .then((result) => {
          result.file = z.dehydrateFile(hidtrators.stashDocs, {
            exportId: result.id
          });
          return result;
        });
    },

    // In cases where Zapier needs to show an example record to the user, but we are unable to get a live example
    // from the API, Zapier will fallback to this hard-coded sample. It should reflect the data structure of
    // returned records, and have obviously dummy values that we can show to any user.
    sample: {
      id: 1,
      documentIds: [
        'a882f5712d0c9d1bb54f2504_9'
      ],
    },

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    // outputFields: () => { return []; }
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'documentIds', label: 'Ids of documents'},
      {key: 'file', label: 'file'},
    ]
  }
};
