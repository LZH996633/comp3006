require('@babel/core');
require('@babel/register');
require('@babel/polyfill');
let cfg = require('../src/config').default;
let mongoose = require('mongoose');
let chai = require('chai');
let chaiHttp = require('chai-http');
let userService = require('../src/service/UserService').default;
let taskService = require('../src/service/TaskService').default;
// let projectService = require('../src/service/ProjectService').default;
let CryptoJS = require('crypto-js');
process.env.PORT = 5200;
let app = require('../src/main').default;

chai.use(chaiHttp);
chai.should();

let token = '';
let project_id = '';
const loginUserInfo = {username: 'aaa', password: CryptoJS.MD5('aaa').toString()};
suiteSetup(async function () {
  console.log('----------------begin-------------');
  await new Promise((resolve) => {
    const db = mongoose.connect(cfg.dbConn, {useUnifiedTopology: true, useNewUrlParser: true}, function (err) {
      if (err) {
        throw err;
      }
      console.log('Connected to mongodb success');
      resolve(db);
    });
  });
});

suiteTeardown(() => {
  mongoose.connection.close();
  console.log('----------------end-------------');
  setTimeout(() => {
    process.exit();
  }, 10);
});

suite('Test user service', function () {
  test('Test the success function', function () {
    const result = userService.success('success');
    chai.assert.isObject(result, 'success');
  });

  test('Test the failure function', function () {
    const result = userService.failure;
    chai.assert.throws(result, Error);
  });

  test('Test the user login', async function () {
    const result = await userService.UserSignIn(loginUserInfo);
    chai.assert.isObject(result, 'aaa');
  });

  test('Test user login api', async function () {
    const info = await chai
      .request(app)
      .post('/api/user/signin')
      .send({...loginUserInfo});
    chai.expect(info).to.have.status(200);
    token = info.body.data.token;
  });
});

suite('Test project api', function () {
  test('Test get /api/project/search', async function () {
    const info = await chai.request(app).get('/api/project/search').set('token', token);
    project_id = info.body.data.list[0].id;

    chai.expect(info).to.have.status(200);
  });
  test('Test get /api/project/mine/list', async function () {
    const info = await chai.request(app).get('/api/project/mine/list').set('token', token);
    chai.expect(info).to.have.status(200);
  });
  test('Test get /api/project/:id', async function () {
    const info = await chai
      .request(app)
      .get('/api/project/' + project_id)
      .set('token', token);
    chai.expect(info).to.have.status(200);
  });
  test('Test post /api/project/', async function () {
    const info = await chai.request(app).post('/api/project/').set('token', token).send({});
    chai.expect(info).to.have.status(400);
  });
});

suite('Test task service', function () {
  test('Test the success function', function () {
    const result = taskService.success('success');
    chai.assert.isObject(result, 'success');
  });

  test('Test the failure function', function () {
    const result = taskService.failure;
    chai.assert.throws(result, Error);
  });
});
