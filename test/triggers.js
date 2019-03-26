const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const apiConst = require('../apiConst');
const appTester = zapier.createAppTester(App);

describe('triggers', () => {

    // describe('new project trigger', () => {
    //     it('should load project', (done) => {
    //         const bundle = {
    //         authData: {
    //             api_server: apiConst.servers.europe,
    //             api_login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
    //             api_password: '32_xBrADOZXaB1B1JznYw0GAe8rw'
    //             },
    //         inputData: {
    //                 projectId: '4d908357-34a2-4503-88c8-ce857b46fc75'
    //             }
    //         };

    //         appTester(App.triggers.project.operation.perform, bundle)
    //         .then(result => {
    //             console.log(result);
    //             should(result.name).eql('Smith Family project');

    //             done();
    //         })
    //         .catch(done);
    //     });
    // });

});
