const apiConst = require('../apiConst');
const projectsDefault = require('../projects.json');
const project = require('./_project');

const listProjectStatistic = (z, bundle) => {
  let params = {};
  const projectUrl = `https://${apiConst.servers[bundle.authData.api_server]}${apiConst.routes.project}`
  if (bundle.inputData.projectName) {
    params.projectName = bundle.inputData.projectName;
  }
  return project.list(z, bundle, params).then((projects) => {
    let statisticProjects = [];
    if (projects.length > 0) {
      statisticProjects = projects.filter((project) => {
  
        return z.request({
            url: `${projectUrl}/${project.id}/statistic`,
        })
        .then((response) => {
            return response.code === 200 ? true : false ;
        });
        
      });
    }
    if (statisticProjects.length === 0) {
      statisticProjects = projectsDefault;
    }

    return statisticProjects;
  })
}

module.exports = {
  key: 'statistic_project',

  noun: 'Statistic Project',
  display: {
    label: 'Project Statistic',
    description: 'Triggers when the status of a project changes to statistic.'
  },

  operation: {

    inputFields: [
      project.listChoices
    ],

    perform: listProjectStatistic,

    outputFields: [
      {key: 'id', label: 'ID'},
      {key: 'name', label: 'Name'},
      {key: 'documents[]id', label: 'Document Id'},
      {key: 'documents[]name', label: 'Document Name'}
    ]
  },

};
