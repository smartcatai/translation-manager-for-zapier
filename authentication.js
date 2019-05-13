const apiConst = require('./apiConst');

const test = (z , bundle) => {
  return z.request({
      url: `https://${apiConst.servers[bundle.authData.api_server]}${apiConst.routes.account}`,
    }).then((response) => {
      if (response.status === 401) {
        throw new Error('The username and/or password you supplied is incorrect');
      }
      return z.JSON.parse(response.content);
    });
};

const auth = {
  type: 'custom',
  connectionLabel: 'Basic {{name}}({{bundle.authData.api_login}})',
  test: test,
  fields: [
    {
      key: 'api_server',
      type: 'string',
      required: true,
      choices: apiConst.servers,
      helpText: 'Server for connection'
    },
    {
      key: 'api_login',
      type: 'string',
      required: true,
      helpText: 'Smartcat account ID.'
    },
    {
      key: 'api_password',
      type: 'string',
      required: true,
      helpText: 'API key for identify'
    }
  ]
};

const addHeaders = (request, z, bundle) => {

  const basicHash = Buffer(`${bundle.authData.api_login}:${bundle.authData.api_password}`).toString('base64');
  request.headers.Authorization = `Basic ${basicHash}`;
  return request;
};

module.exports = {
  form: auth,
  addHeaders: addHeaders
};
