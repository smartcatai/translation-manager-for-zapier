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

  noun: 'Created Project',
  display: {
    label: 'Project Created',
    description: 'Triggers when a new project has been created.'
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
