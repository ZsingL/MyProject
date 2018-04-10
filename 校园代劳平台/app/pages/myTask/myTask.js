// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      publishStatusArr:['未领取','未完成','待确认','已结束'],
      getStatusArr:['未完成','待确认','已结束'],
  },

  taskDetail:function(e){
      var id = e.currentTarget.id;
      console.log(e.target)
      var status = e.currentTarget.dataset.status;
      console.log(status)
      wx.navigateTo({
          url: '../taskDetail/taskDetail?id='+id+'&status='+status,
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var openid = getApp().globalData.open_id;
      console.log(openid)
      var that = this;
      wx.request({
          url: 'http://127.0.0.1:3000/myTask',
          method:'GET',
          data:{openid:openid},
          success:function(result){
              console.log(result)
              that.setData({
                  publishTaskList:result.data[0].publishTaskList,
                  getTaskList:result.data[0].getTaskList,
              })
          }
      })
  
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