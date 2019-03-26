const createProject = require('./createProject');
const getProject = require('./getProject');
const createExport = require('./createExport');

module.exports = {
    [createProject.key]: createProject,
    [getProject.key]: getProject,
    [createExport.key]: createExport,
}