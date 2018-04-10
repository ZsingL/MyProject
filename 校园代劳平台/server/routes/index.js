let express = require('express');
let mongoose = require("mongoose");
let router = express.Router();
let userSchema = require("../model/userModel.js").userSchema;
let userController = require('../controller/userController.js');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//获取学生登录信息
router.post('/login', function (req, res, next) {
  userController.inserUser(req.body, function () {
    res.end('登录成功');
  })
});
//验证是否登录
router.get('/isLogin', function (req, res, next) {
  userController.isLogin(req.query.openid, function (result) {
    res.json(result);
  })
})
/*//获取用户信息
router.post('/getUserInfo', function (req, res, next) {
  userController.inserUser(req.body, function () {
    res.end('获取成功');
  })
});*/

//发布任务
router.post('/taskAdd', function (req, res, next) {
  userController.taskAdd(req.body, function () {
    res.end('发布成功')
  })
});

//获取所有未领取任务
router.get('/getAllTask', function (req, res, next) {
  userController.getAllTask(function (result) {
    res.json(result);//返回任务数据
  })
});

//查看任务详情
router.get('/getTaskDetail', function (req, res, next) {
  var id = req.query.id;
  userController.getTaskDetail(id,function(err,result){
    res.json(result)
  })
});

//领取任务
router.post('/taskGet', function (req, res, next) {
  userController.taskGet(req.body._id, function (result) {
    res.end('领取成功');
  })
});

//获取我的任务
router.get('/myTask', function (req, res, next) {
  var openid = req.query.openid;
  userController.getMyTask(openid, function (result) {
    res.json(result)
  })
})

module.exports = router;
