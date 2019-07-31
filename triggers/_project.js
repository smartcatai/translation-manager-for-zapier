const apiConst = require('../apiConst');

const listProject = (z, bundle, params = {}) => {

    const requestOptions = {
        url: `https://${apiConst.servers[bundle.authData.api_server]}${apiConst.routes.project}/list`,
        params: params
    };

    return z.request(requestOptions)
        .then((response) => {
            return z.JSON.parse(response.content);
        });
};

const listProjectChoices = function(z, bundle, params = {}){
    return listProject(z, bundle, params)
        .then((projects) => {
            const projectNames = projects.reduce((names, project) => {
                names.push(project.name);
                return names;
            }, [])
            return {
                key: 'projectName',
                choices: projectNames,
                required: false,
                type: 'string',
                label: 'Project Name'
            }
        });
}

module.exports =  {
    list: listProject,
    listChoices: listProjectChoices
}