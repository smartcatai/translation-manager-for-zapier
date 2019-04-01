const routes = {
    "account": "/api/integration/v1/account",
    "createProject": "/api/integration/v1/project/create",
    "project": "/api/integration/v1/project",
    "createExport": "/api/integration/v1/document/export",
    "vendors": "/api/integration/v1/directory?type=vendor",
}
const servers = {
    "usa" : "us.smartcat.ai",
    "europe" : "smartcat.ai",
    "asia" : "ea.smartcat.ai",
}
const workflowStages = [
    "Translation",
    "Editing",
    "Proofreading",
]

module.exports = {
    routes: routes,
    servers: servers,
    workflowStages: workflowStages
}