const should = require('should');

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
            should(result.documentIds[0]).eql('a882f5712d0c9d1bb54f2504_9');

            done();
        })
        .catch(done);
    });
  });

  describe('create document create', () => {
    it('should create a new document', (done) => {
      const bundle = {
        authData: {
          api_server: 'europe',
          api_login: '40c7d5b2-da26-4b36-84f1-8305b3aadb03',
          api_password: '32_xBrADOZXaB1B1JznYw0GAe8rw'
        },
        inputData: {
          projectName: 'Smith Family project',
          sourceLanguage: 'ru',
          targetLanguages: ['en'],
          documentName: 'test_document_2',
          documentType: 'html',
          content: '<html><body><p>тест док 2222</p><p>тест 2</p><p>тест 3</p></body></html>',
        }
      };


      appTester(App.creates.create_document.operation.perform, bundle)
        .then((result) => {
          should(result).have.property('name');
          _projectId = result.id;
          done();
        })
        .catch(done);
    });
  });

});
