const createProject = require('./createProject');
const createExport = require('./createExport');
const createJob = require('./createJob');

module.exports = {
    [createProject.key]: createProject,
    [createExport.key]: createExport,
    [createJob.key]: createJob,
}