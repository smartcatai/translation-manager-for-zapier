const projectsDefault = require('../projects.json');
const project = require('./_project');

const listProjectCompleated = (z, bundle) => {
  let params = {};
  if (bundle.inputData.projectName) {
    params.projectName = bundle.inputData.projectName;
  }
  return project.list(z, bundle, params).then((projects) => {
    let completedProjects = [];
    if (projects.length > 0) {
      completedProjects = projects.filter((project) => {
        return project.status === 'completed';
      });
    }
    if (completedProjects.length === 0) {
      completedProjects = projectsDefault;
    }

    return completedProjects;
  })
}

module.exports = {
  key: 'completed_project',

  noun: 'Completed Project',
  display: {
    label: 'Project Completed',
    description: 'Triggers when the status of a project changes to completed.'
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
