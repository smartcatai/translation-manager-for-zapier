const triggers = require('./triggers/index');
const creates = require('./creates/index');
const authentication = require('./authentication');
const hidtrators = require('./hydrators/index');


// Now we can roll up all our behaviors in an App.
const App = {
  // This is just shorthand to reference the installed dependencies you have. Zapier will
  // need to know these before we can upload
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  hydrators: hidtrators,
  authentication: authentication.form,

  beforeRequest: [authentication.addHeaders],

  afterResponse: [],

  resources: {},

  // If you want your trigger to show up, you better include it here!
  triggers: triggers,

  // If you want your searches to show up, you better include it here!
  searches: {},

  // If you want your creates to show up, you better include it here!
  creates: creates
};

// Finally, export the app.
module.exports = App;
