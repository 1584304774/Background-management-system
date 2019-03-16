var express = require('express');
var router = express.Router();
//在controller/job.js文件中定义了职能添加的业务逻辑
var jobController = require("../controller/job");
//引入util/multer.js中的配置项
var cpUpload = require("../util/multer").cpUpload;
//数据是通过post方式传输的
//增加职位的路径
router.post("/addjob",cpUpload,jobController.addjob);
//通过get方法传输
//获取职能详情的路径
router.get("/getjob",jobController.getjob)
//用于删除职能的路径
router.get("/deljob",jobController.deljob)
//先获取到指定的职能详情数据，将其数据赋值给弹出的对话框中的输入框
router.get("/findjob",jobController.findjob)
//修改信息的路径(也需要图片的获取，所以需要图片的配置项)
router.post("/modifyjob",cpUpload,jobController.modifyjob);
module.exports = router;