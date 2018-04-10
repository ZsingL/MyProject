/**
 * Created by Zsing on 2018/3/15.
 */
let mongoose = require("mongoose");
let taskSchemaModel = require('../model/userModel.js').taskSchemaModel;
let userSchemaModel = require("../model/userModel.js").userSchemaModel;
let userSchema = mongoose.model('userInfo',userSchemaModel);
let taskSchema = mongoose.model('taskSchema',taskSchemaModel);
let ObjectId = require('mongodb').ObjectId;
mongoose.connect('mongodb://localhost:27017/xydlpt');



var db =mongoose.connection;
db.once('open',function (err) {

    if(err){

        return;
    }
    console.log('open');

});



//检查是否登录
function isLogin(openid,callBack){
    userSchema.find({openid:openid}, function (err,res) {
        callBack(res);
    })
}
//新增用户(无则新增用户信息，有则更新信息)
function inserUser(userInfo,callBack){
    userSchema.update({openid:userInfo.openid},{$set:userInfo},{upsert:true}, function (err,res) {
        callBack(res)
    });
}

//发布任务
function taskAdd(taskInfo,callBack){
    //将任务添加到任务集合（表）
    var task = new taskSchema(taskInfo);
    task.save(function (err,res) {
        //将任务添加到用户集合，pulishTaskList数组中
        userSchema.update({openid:res.openid},{$addToSet:{publishTaskList:res}}, function (err,res){
            console.log(res);
            callBack()
        });
    });
}

//获取所有任务数据
function getAllTask(callBack){
    taskSchema.find({},function(err,res){
        callBack(res);
    });
}

//获取任务详情
function getTaskDetail(id,callBack){
    taskSchema.find({'_id':ObjectId(id)}, function (err,res) {
        if (err){
            console.log(err);
        }
        callBack(err,res);
    })
}

//领取任务
function taskGet(id,callBack){
    //用_id查找唯一任务
    taskSchema.find({'_id':ObjectId(id)}, function (err,res) {
        //更改我发布的taskStatus为2
       /* userSchema.update({openid:res[0].openid},{$push:{publishTaskList:{taskStatus:'2'}}}, function (err,res) {

        });*/
        //用openid找到用户，将任务添加到我领取的列表中
        userSchema.update({openid:res[0].openid},{$addToSet:{getTaskList:res[0]}}, function (error,result) {
            //我领取的任务taskStatus改为2 已领取
            userSchema.updateOne({openid:res[0].openid,"getTaskList._id":ObjectId(id)},{$set:{"getTaskList.$.taskStatus":2}}, function (err,result) {
                console.log(result);
            });
            //我发布的任务taskStatus改为2 已被领取
            userSchema.updateOne({openid:res[0].openid,"publishTaskList._id":ObjectId(id)},{$set:{"publishTaskList.$.taskStatus":2}}, function (err,result) {
                console.log(result);
            });
            });

            callBack(res);
        //将任务列表的status改为2
        taskSchema.deleteOne({'_id':ObjectId(id)}, function (err,res) {
            console.log(res);
        })
    })
}
//获取我的任务
function getMyTask(openid,callBack){
    userSchema.find({openid: openid}, function (err,res) {
        callBack(res);
    })
}



module.exports = {
    isLogin,
    inserUser,
    taskAdd,
    getAllTask,
    getTaskDetail,
    taskGet,
    getMyTask

};