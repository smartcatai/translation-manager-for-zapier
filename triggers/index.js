const canceledProject = require('./canceledProject');
const completedProject = require('./completedProject');
const newProject = require('./newProject');


module.exports = {
    [canceledProject.key]: canceledProject,
    [completedProject.key]: completedProject,
    [newProject.key]: newProject,
}