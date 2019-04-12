const createProject = require('./createProject');
const createExport = require('./createExport');

module.exports = {
    [createProject.key]: createProject,
    [createExport.key]: createExport,
}