const express =require('express');
const router = express.Router();

const newUserContoller = require('../contoller/newUserContoller');

router.post('/' , newUserContoller.handleNewUser);


module.exports =router;