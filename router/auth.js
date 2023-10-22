const express =require('express');
const router =express.Router();

const authContoller = require('../contoller/authContoller');

router.post('/',authContoller.handleLogin);

module.exports = router ;