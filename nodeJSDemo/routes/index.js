var express = require('express');
var router = express.Router();
//controller/user.js中对登录注册进行了逻辑判断
var userController = require("../controller/user");
/* 注册路径：/api/register */
//数据是使用post方式传递的
router.post('/register',userController.register);//在controller/user.js定义了register

/* 登录路径：/api/login */
//数据是使用post方式传递的
router.post('/login',userController.login);//在controller/user.js定义了login
module.exports = router;
