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
  connectionLabel: '{{name}}',
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
      label: 'Account ID',
      type: 'string',
      required: true,
      helpText: 'Login to your Smartcat account and navigate to Settings > API to find your Account Id and API Key'
    },
    {
      key: 'api_password',
      label: 'API Key',
      type: 'string',
      required: true
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
