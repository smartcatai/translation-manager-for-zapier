const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const apiConst = require('../apiConst');
const appTester = zapier.createAppTester(App);

describe('triggers', () => {
    describe('completed project trigger', () => {
        it('should load project', (done) => {
            const bundle = {
                authData: {
                    api_server: 'europe',
                    api_login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
                    api_password: '32_xBrADOZXaB1B1JznYw0GAe8rw'
                    },
                inputData: {
                    projectName: 'Smith Family project'
                }
            };

            appTester(App.triggers.completed_project.operation.perform, bundle)
            .then(result => {
                console.log(result[0]);
                //hould(result[0].name).eql('Smith Family project');

                done();
            })
            .catch(done);
        });
    });
});
