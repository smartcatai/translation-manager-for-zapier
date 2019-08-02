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
        return project.status === 'inprogress';
      });
    }
    if (inProgressProjects.length === 0) {
      inProgressProjects = projectsDefault;
    }

    return inProgressProjects;
  })
}

module.exports = {
  key: 'in_progress_project',

  noun: 'In Project Project',
  display: {
    label: 'Project in progress',
    description: 'Triggers when the status of a project changes to In Project.'
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
