// pages/shouye/shouye.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello son',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  getAccount:function(e){
      this.setData({
          account:e.detail.value
      })
  },
  getPasswd:function(e){
      this.setData({
          passwd:e.detail.value
      })
  },
  loginF:function(){
      var account = this.data.account;
      var passwd = this.data.passwd;
      var globalData = getApp().globalData;//获取全局变量
      var openid = globalData.open_id;//获取openid
      var nickName = globalData.userInfo.nickName;//获取用户名
      var headPic = globalData.userInfo.avatarUrl;//获取用户头像 
      wx.request({
          url: 'http://jwxt.gduf.edu.cn/app.do?method=authUser&xh='+account+'&pwd='+passwd,
          method: 'POST',
          success: function (result) {
              console.log(result);
              if (result.data.flag == '1'){
                  wx.request({
                      url: 'http://127.0.0.1:3000/login',
                      method:'POST',
                      data:{
                          openid:openid,
                          status:'1',
                          nickName:nickName,
                          headPic:headPic
                      },
                      success:function(result){
                          console.log(result);
                          wx.switchTab({
                              url: '../home/home',
                          })
                      }
                  })
              }
          }
      })


  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(this.data.userInfo)
        
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onReady:function(){
      
  }
})
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
