const routes = {
    "account": "/api/integration/v1/account",
    "accountTeam": "/api/integration/v1/account/myTeam",
    "accountSearchTeam": "/api/integration/v1/account/searchMyTeam",
    "createProject": "/api/integration/v1/project/create",
    "invoiceJob": "/api/integration/v1/invoice/job",
    "project": "/api/integration/v1/project",
    "createExport": "/api/integration/v1/document/export",
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
const currency = [
    'uSD','eUR', 'rUB',
    'tRY', 'jPY', 'sGD',
    'mYR', 'hKD', 'uAH',
    'cNY', 'aUD', 'gBP',
    'cAD'
]

module.exports = {
    routes: routes,
    servers: servers,
    currency: currency,
    workflowStages: workflowStages
}