const routes = {
    "account": "/api/integration/v1/account",
    "createProject": "/api/integration/v1/project/create",
    "project": "/api/integration/v1/project",
    "createExport": "/api/integration/v1/document/export",
    "addDocument": "/api/integration/v1/project/document",
    "updateDocument": "/api/integration/v1/document/update",
    "vendors": "/api/integration/v1/directory?type=vendor",
    "callback": "/api/integration/v1/callback"
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

const documentType = {
    "txt": "Plain text",
    "json": "Json",
    "html": "Plain text",
    "po": "PO"
}

module.exports = {
    routes: routes,
    servers: servers,
    workflowStages: workflowStages,
    documentType: documentType,
}