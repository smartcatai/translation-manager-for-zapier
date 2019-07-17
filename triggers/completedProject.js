const apiConst = require('../apiConst');
const projectsDefault = require('../projects.json');

const listProject = (z, bundle, params = {}) => {

  const requestOptions = {
    url: `https://${apiConst.servers[bundle.authData.api_server]}${apiConst.routes.project}/list`,
    params: params
  };

  return z.request(requestOptions)
    .then((response) => {
      return z.JSON.parse(response.content);
    });
};

const listProjectCompleated = (z, bundle) => {
  let params = {};
  if (bundle.inputData.projectName) {
    params.projectName = bundle.inputData.projectName;
  }
  return listProject(z, bundle, params).then((projects) => {
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

const listProjectChoices = (z, bundle) => {
  return listProject(z, bundle, {})
    .then((projects) => { 
      const projectNames = projects.reduce((names, project)=>{
        names.push(project.name);
        return names;
      },[])
      return {key: 'projectName', choices: projectNames, required: false, type: 'string', label: 'Project Name'}
    });
};

module.exports = {
  key: 'completed_project',

  noun: 'Completed Projects',
  display: {
    label: 'Completed Projects With Polling',
    description: 'Trigger when fount completed project.'
  },

  operation: {

    inputFields: [
      listProjectChoices
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
