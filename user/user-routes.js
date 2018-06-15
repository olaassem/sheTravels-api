const express = require('express');
const router = express.Router();
const userController = require('./user-controller');


router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

router.post('/register', userController.postNewUser);
router.post('/login', userController.loginUser);



module.exports = router;
