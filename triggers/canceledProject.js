const projectsDefault = require('../projects.json');
const project = require('./_project');

const listProjectCompleated = (z, bundle) => {
  let params = {};
  if (bundle.inputData.projectName) {
    params.projectName = bundle.inputData.projectName;
  }
  return project.list(z, bundle, params).then((projects) => {
    let canceledProjects = [];
    if (projects.length > 0) {
      canceledProjects = projects.filter((project) => {
        return project.status === 'canceled';
      });
    }
    if (canceledProjects.length === 0) {
      canceledProjects = projectsDefault;
    }

    return canceledProjects;
  })
}

module.exports = {
  key: 'canceled_project',

  noun: 'Canceled Project',
  display: {
    label: 'Project Canceled',
    description: 'Triggers when the status of a project changes to Canceled.'
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
