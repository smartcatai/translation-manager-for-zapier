const projectsDefault = require('../projects.json');
const project = require('./_project');

const listProjectInProgress = (z, bundle) => {
  let params = {};
  if (bundle.inputData.projectName) {
    params.projectName = bundle.inputData.projectName;
  }
  return project.list(z, bundle, params).then((projects) => {
    let inProgressProjects = [];
    if (projects.length > 0) {
      inProgressProjects = projects.filter((project) => {
        return project.status.toLowerCase() === 'inprogress';
      });
    }
    if (inProgressProjects.length === 0) {
      inProgressProjects = projectsDefault;
    }

    return inProgressProjects;
  })
}

module.exports = {
  key: 'progress_project',

  noun: 'In Progress Project',
  display: {
    label: 'Project in Progress',
    description: 'Triggers when the status of a project changes to In Progress.'
  },

  operation: {

    inputFields: [
      project.listChoices
    ],

    perform: listProjectInProgress,

    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'name', label: 'Name'},
      {key: 'documents[]id', label: 'Document Id'},
      {key: 'documents[]name', label: 'Document Name'}
    ]
  },

};
