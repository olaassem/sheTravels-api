'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const expect = chai.expect;

const review = require('../review/review-model');
const user = require('../user/user-model');
const {
  app,
  runServer,
  closeServer
} = require('../server');
const {
  TEST_DATABASE_URL
} = require('../config');

chai.use(chaiHttp);

let token;
let userId;
let reviewID;


function createUser() {
  console.log("Creating user.");
  let testUser = {
    name: "Zoya",
    username: "testing",
    password: "thisis10letterslong",
    age: "20s",
    country: "Bermuda"

  }
  return new Promise((resolve, reject) => {
    chai.request(app)
      .post('/user/register')
      .send(testUser)
      .then((res) => {
        console.log('Registered user.');
        loginUser().then(() => {
          resolve()
        });
      })
      .catch((error) => {
        console.log(error)
        reject(error) //
      });
  });
}

function loginUser() {
  console.log('logging in user')
  let loginUser = {
    username: "testing",
    password: "thisis10letterslong"
  }
  return new Promise((resolve, reject) => {
    chai.request(app)
      .post('/user/login')
      .send(loginUser)
      .then((res) => {
        token = res.body.data.token;
        userId = res.body.data.userID;
        resolve();
      })
      .catch((error) => {
        console.log(error)
        reject(error)
      });
  });
}

function tearDownDb() {
  console.warn('Deleting database');
  return mongoose.connection.dropDatabase();
}
//
// describe('test review API resources', function() {
//   before(function(done) {
//     this.timeout(3000);
//     console.log('before running server')
//     runServer(TEST_DATABASE_URL)
//       .then(function() {
//         console.log('before calling create new user');
//         createUser().then(
//           () => {
//             console.log('after calling create new user');
//
//             done()
//           });
//       })
//   });
//
//   after(function() {
//     tearDownDb();
//     return closeServer();
//   });
//
//
//   it('POST - should create logged-in test user', function() {
//     console.log("we should have a user here");
//     console.log(userId);
//     console.log("we should have a token here");
//     console.log(token);
//     let res;
//     return chai.request(app)
//       .post('/review/new')
//       .send({
//         token: token,
//         userID: userId,
//         submitted: Date.now(),
//         address: "Test Location",
//         fomrattedAddress: "2324 Test Address St.",
//         picture: "picturepicturepicture",
//         visit: "November 2017",
//         duration: "2 weeks",
//         rating: "Good",
//         safety: "Safe",
//         dress: "Whatever you like",
//         affordability: "Cheap",
//         title: "Title",
//         summary: "Stuff and thangs about location."
//       })
//       .then(function(_res) {
//         res = _res;
//         expect(res).to.have.status(200);
//       })
//   });
//
//   it('GET - should return all existing reviews for logged-in test user', function() {
//     let res;
//     return chai.request(app)
//       .get('/review/all/' + `${token}`)
//       .then(function(_res) {
//         res = _res;
//         reviewID = _res.body.data[0]._id;
//         console.log('this is the reviewID');
//         console.log(reviewID);
//         expect(res).to.have.status(200);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });
//
//
//   it('GET - should return all db reviews', function() {
//     return chai.request(app)
//       .get(`/review/allreviews`)
//       .then(res => {
//         expect(res).to.have.status(200);
//         expect(res.body).to.be.a('object');
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });
//
//
//   it('should delete review with requested ID', function() {
//     return chai.request(app)
//       .delete(`/review/${reviewID}/${token}`)
//       .then((res) => {
//         expect(res).to.have.status(200);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   });
// });
