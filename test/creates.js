const should = require('should');
const assert = require('assert');

const zapier = require('zapier-platform-core');

const App = require('../index');
const apiConst = require('../apiConst');
const appTester = zapier.createAppTester(App);

describe('creates', () => {

  describe('create project create', () => {
    it('should create a new project', (done) => {
      const bundle = {
        authData: {
          api_server: 'europe',
          api_login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
          api_password: '32_xBrADOZXaB1B1JznYw0GAe8rw'
        },
        inputData: {
          name: 'Smith Family project',
          sourceLanguage: 'ru',
          targetLanguages: ['en'],
          filename: 'test_document.html',
          file: 'http://108.61.99.140/test_document.html',
        }
      };


      appTester(App.creates.create_project.operation.perform, bundle)
        .then((result) => {
          should(result).have.property('name');
          _projectId = result.id;
          done();
        })
        .catch(done);
    });
  });

  describe('create export action', () => {
    it('should load export', (done) => {
        const bundle = {
          authData: {
            api_server: 'europe',
            api_login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
            api_password: '32_xBrADOZXaB1B1JznYw0GAe8rw'
          },
          inputData: {
            documentIds: 'a882f5712d0c9d1bb54f2504_9'
          }
        };

        appTester(App.creates.create_export.operation.perform, bundle)
        .then(result => {
            console.log(result);
            should(result.documentIds[0]).eql('a882f5712d0c9d1bb54f2504_9');

            done();
        })
        .catch(done);
    });
  });

  describe('create job action', () => {
    it('should create job', (done) => {
        const bundle = {
          authData: {
            api_server: 'europe',
            api_login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
            api_password: '32_xBrADOZXaB1B1JznYw0GAe8rw'
          },
          inputData: {
            email : "test@example.com",
            firstName : "test",
            lastName : "test",
            serviceType : "test",
            jobDescription : "test",
            unitsType : "pages",
            unitsAmount : 1,
            pricePerUnit : 1,
            currency : "uSD",
            externalNumber : "233rwesdf3434"
          }
        };

        appTester(App.creates.create_job.operation.perform, bundle)
        .then(result => {
            if (result.id === undefined){
              assert.ok(false)
            }

            done();
        })
        .catch(done);
    });
  });

});
