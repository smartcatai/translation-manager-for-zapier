const canceledProject = require('./canceledProject');
const completedProject = require('./completedProject');
const newProject = require('./newProject');
const statisticProject = require('./statisticProject');


module.exports = {
    [canceledProject.key]: canceledProject,
    [completedProject.key]: completedProject,
    [newProject.key]: newProject,
    [statisticProject.key]: statisticProject,
}