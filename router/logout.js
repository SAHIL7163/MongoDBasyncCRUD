const express =require('express');
const router = express.Router();

const logoutContoller = require('../contoller/logoutContoller');

router.get('/' , logoutContoller.handlelogOut);


module.exports =router;