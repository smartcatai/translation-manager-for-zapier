const apiConst = require('./apiConst');
const auth = {
  type: 'custom',
  connectionLabel: 'Basic {{bundle.authData.api_login}}',
  test: {
    url:
      'https://{{bundle.authData.api_server}}'+ apiConst.routes.account,
  },
  fields: [
    {
      key: 'api_server',
      type: 'string',
      required: true,
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
