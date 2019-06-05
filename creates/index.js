const createProject = require('./createProject');
const createExport = require('./createExport');
const createDocument = require('./createDocument');

module.exports = {
    [createProject.key]: createProject,
    [createExport.key]: createExport,
    [createDocument.key]: createDocument,
}