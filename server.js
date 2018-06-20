const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const {PORT, DATABASE_URL, CLIENT_ORIGIN} = require('./config');
const app = express();


mongoose.Promise = global.Promise;


//MIDDLEWARE
app.use(morgan('common'));
app.use(bodyparser.json());
app.use(cors({origin: CLIENT_ORIGIN}));

//ROUTES
const user = require('./user/user-routes');
const review = require('./review/review-routes');


// app.get('/', (req, res) => {
//   res.sendFile(_dirname + '../sheTravels-client/public/index.html').status(200);
// });


//PREFIXES
app.use('/user', user);
app.use('/review', review);


app.use('*', function (req, res) {
	res.status(404).json({
		message: 'Not Found'
	});
});


let server;

function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, error => {
      if (error) {
        return reject(error);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', error => {
          mongoose.disconnect();
          reject(error);
        });
    });
  });
}


function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(error => {
        if (error) {
          return reject(error);
        }
        resolve();
      });
    });
  });
}


if (require.main === module) {
  runServer(DATABASE_URL).catch(error => console.error(error));
}

module.exports = { app, runServer, closeServer };
