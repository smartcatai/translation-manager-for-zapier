const apiConst = require('../apiConst');
const projectsDefault = require('../projects.json');

const listProject = (z, bundle) => {

  let params = {
    externalTag: 'source:Zapier',
  };
  if (bundle.inputData.projectName) {
    params.projectName = bundle.inputData.projectName;
  }

  const requestOptions = {
    url: `https://${apiConst.servers[bundle.authData.api_server]}${apiConst.routes.project}/list`,
    params: params
  };

  return z.request(requestOptions)
    .then((response) => {
      const projects = z.JSON.parse(response.content);
      const compleatedProjects = projectsDefault;

      if (projects) {
        compleatedProjects = projects.filter((project) => {
          return project.status === 'completed';
        });
      }

      if(compleatedProjects.length===0){
        return projectsDefault
      }

      return compleatedProjects;
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
      {key: 'projectName', type: 'string',  helpText: 'Enter project name(if you really know that project exist)', required: false}
    ],

    perform: listProject,

    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'name', label: 'Name'},
      {key: 'documents[]id', label: 'Document Id'},
      {key: 'documents[]name', label: 'Document Name'}
    ]
  },

};
