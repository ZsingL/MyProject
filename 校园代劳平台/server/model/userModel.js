/**
 * Created by Zsing on 2018/3/15.
 */
let mongoose = require("mongoose");
//任务表（集合）
var taskSchemaModel = mongoose.Schema({
    openid:String,//微信唯一标识
    nickName:String,//用户名
    headPic:String,//用户头像
    timeStamp:String,//时间戳
    publishTime:String,//发布时间
    title:String,//任务标题
    desc:String,//任务内容
    address:String,//任务地点
    taskHours:Number,//任务时长
    taskMoney:Number,//任务酬劳
    taskType:String,//任务类型
    taskPic:String,//任务图片
    taskStatus:String//任务状态 1待领取 2已领取 3已结束
});
//个人用户表（集合）
var userSchemaModel = mongoose.Schema({
    openid:String,//用户openid
    nickName:String,//用户名
    headPic:String,//用户头像
    status:String,//判断是否登录的标识1已登录，0未登录
    tel:Number,//电话号码
    publishTaskList:Array,//发布的任务
    getTaskList:Array//领取的任务
});

module.exports = {
    taskSchemaModel:taskSchemaModel,
    userSchemaModel:userSchemaModel
};