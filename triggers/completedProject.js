const apiConst = require('../apiConst');

const listProject = (z, bundle) => {

  let params = {
    externalTag: 'source:Zapier',
  };
  if (bundle.inputData.projectName) {
    params.projectName = bundle.inputData.projectName;
  }

  // You can build requests and our client will helpfully inject all the variables
  // you need to complete. You can also register middleware to control this.
  const requestOptions = {
    url: `https://${bundle.authData.api_server}${apiConst.routes.project}/list`,
    params: params
  };

  // You may return a promise or a normal data structure from any perform method.
  return z.request(requestOptions)
    .then((response) => {
      const projects = z.JSON.parse(response.content);

      // Make it possible to get the actual project contents if necessary (no need to make the request now)
      return projects.filter((project) => {
        return project.status === 'completed';
      });
    });
};

// We recommend writing your triggers separate like this and rolling them
// into the App definition at the end.
module.exports = {
  key: 'completed_project',

  // You'll want to provide some helpful display labels and descriptions
  // for users. Zapier will put them into the UX.
  noun: 'Completed Projects',
  display: {
    label: 'Completed Projects',
    description: 'Trigger when fount completed project.'
  },

  // `operation` is where the business logic goes.
  operation: {

    // `inputFields` can define the fields a user could provide,
    // we'll pass them in as `bundle.inputData` later.
    inputFields: [
      {key: 'projectName', type: 'string',  helpText: 'Enter project name', required: false}
    ],

    perform: listProject,

    // If the resource can have fields that are custom on a per-user basis, define a function to fetch the custom
    // field definitions. The result will be used to augment the sample.
    //   outputFields: [
    //    () => { return []; }
    //   ]
    // For a more complete example of using dynamic fields see
    // https://github.com/zapier/zapier-platform-cli#customdynamic-fields.
    // Alternatively, a static field definition should be provided, to specify labels for the fields
    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'name', label: 'Name'},
      {key: 'documents[]id', label: 'Document Id'},
      {key: 'documents[]name', label: 'Document Name'}
    ]
  },

};
