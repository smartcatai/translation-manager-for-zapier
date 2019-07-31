const projectsDefault = require('../projects.json');
const project = require('./_project');

const listProjectCompleated = (z, bundle) => {
  let params = {}
  if (bundle.inputData.projectName) {
    params.projectName = bundle.inputData.projectName
  }
  return project.list(z, bundle, params)
}

module.exports = {
  key: 'new_project',

  noun: 'New Project',
  display: {
    label: 'Project New',
    description: 'Triggers when create a new project.'
  },

  operation: {

    inputFields: [
      project.listChoices
    ],

    perform: listProjectCompleated,

    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'name', label: 'Name'},
      {key: 'documents[]id', label: 'Document Id'},
      {key: 'documents[]name', label: 'Document Name'}
    ]
  },

};
