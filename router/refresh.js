const express =require('express');
const router = express.Router();

const refreshContoller = require('../contoller/refreshTokenController');

router.get('/',refreshContoller.handleRefreshToken);


module.exports =router;

