const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const apiConst = require('../apiConst');
const appTester = zapier.createAppTester(App);

describe('basic auth app', () => {

  it('fails on bad auth', (done) => {
    // Try changing the values of username or password to see how the test method behaves
    const bundle = {
      authData: {
        api_server: apiConst.servers.europe,
        username: 'user',
        password: 'badpwd'
      }
    };

    appTester(App.authentication.test, bundle)
      .then(() => {
        done('Should not get here');
      })
      .catch((error) => {
        console.log(error.message);
        //error.message.should.containEql('The username and/or password you supplied is incorrect');
        done();
      });
  });

  it('automatically has Authorize Header add', (done) => {
    // Try changing the values of username or password to see how the test method behaves
    const bundle = {
      authData: {
        api_server: apiConst.servers.europe,
        api_login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
        api_password: '32_xBrADOZXaB1B1JznYw0GAe8rw'
      }
    };

    appTester(App.authentication.test, bundle)
      .then((response) => {
        should.exist(response);
        should(response.id).eql(bundle.authData.api_login);
        done();
      })
      .catch(done);
  });

});
