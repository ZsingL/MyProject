// pages/taskAdd/taskAdd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      inputNum:0,
      taskImage:'',
      taskTypeArr:['其他','外卖','快递','代购'],
      taskType:0
  },
  //获取任务类型
  chooseTaskType:function(e){
      this.setData({
          taskType:e.detail.value
      })
      console.log(this.data.taskType);
  },
  //获取任务标题title
  titleInput:function(e){
      this.setData({
          title:e.detail.value
      })

  },
  //获取任务内容desc
  descTextarea:function(e){
      this.setData({
          desc:e.detail.value,
          inputNum:e.detail.value.length
      })
  },
  //获取任务地点address
  addressInput:function(e){
      this.setData({
          address:e.detail.value 
      })
  },
  //获取任务时长taskHours
  hoursInput: function(e){
      this.setData({
          taskHours:e.detail.value
      })
  },
  //获取任务酬劳taskMoney
  moneyInput:function(e){
      this.setData({
          taskMoney:e.detail.value
      })
  },
    uploadImage:function(){
        var that = this;
        count:1;
        wx.chooseImage({
            success: function(res) {
                var tempFilePaths = res.tempFilePaths;
                console.log(tempFilePaths)
                that.setData({
                    taskImage:tempFilePaths
                })
                console.log(tempFilePaths);
            },
        })
    },
    removeImage:function(){
        this.setData({
            taskImage:''
        })
    },
    previewImg:function(){
        wx.previewImage({
            urls: this.data.taskImage,
        })
    },
//取消发布
  cancelPublish:function(){
    wx.switchTab({
      url: '../home/home',
    })
  },

//发布任务
  taskPublish:function(){
      console.log(this.data.title);
      if (!this.data.title){
          wx.showModal({
              title: '提示',
              content: '标题不能为空',
              showCancel:false,
              confirmText:'确定',
          })
          return; 
      }
      if (!this.data.taskHours){
          wx.showModal({
              title: '提示',
              content: '任务时长不能为空',
              showCancel: false,
              confirmText: '确定',
          })
          return;
      }
      var timeStamp = Date.parse(new Date());
      //获取当前时间
      var n = timeStamp * 1000;
      this.setData({
          timeStamp:n
      })
      var date = new Date(n);
      //年
      var Y = date.getFullYear();
      //月
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      //日
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      //时
      var h = date.getHours();
      //分
      var m = date.getMinutes();
      //秒
      var s = date.getSeconds();
      var publishTime = Y + "-" + M + "-" + D + " " + h + ":" + m +":" + s;
      var globalData = getApp().globalData;//获取全局变量
      var open_id = globalData.open_id;//获取openid
      var nickName = globalData.userInfo.nickName;//获取用户名
      var headPic = globalData.userInfo.avatarUrl;//获取用户头像
      wx.request({
          url: 'http://127.0.0.1:3000/taskAdd',
          method: 'POST',
          data: {
              openid: open_id,
              nickName: nickName,
              headPic: headPic,
              publishTime: publishTime,
              timeStamp: this.data.timeStamp,
              taskType:this.data.taskType,
              taskPic: this.data.taskImage,
              title: this.data.title,
              desc: this.data.desc,
              address: this.data.address,
              taskHours: this.data.taskHours,
              taskMoney: this.data.taskMoney,
              taskStatus:1
          },
          success: function (result) {
              console.log(result);
              wx.showToast({
                  title: result.data,
                  duration: 1500,
                  success:function(){
                      wx.redirectTo({
                          url: '../taskSquare/taskSquare',
                      })

                  }

              })


          },
          fail: function (err) {
              console.log(err);
          }
      })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})