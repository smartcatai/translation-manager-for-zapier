const canceledProject = require('./canceledProject');
const completedProject = require('./completedProject');
const inProgressProject = require('./inProgressProject');
const newProject = require('./newProject');


module.exports = {
    [canceledProject.key]: canceledProject,
    [completedProject.key]: completedProject,
    [inProgressProject.key]: inProgressProject,
    [newProject.key]: newProject,
}