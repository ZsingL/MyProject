// pages/taskSquare/taskSquare.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      taskTypeArr: ['其他', '外卖', '快递', '代购'],
  },

  taskDetail:function(e){
      var id = e.currentTarget.id;
      wx.navigateTo({
          url: '../taskDetail/taskDetail?id='+id,
      })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      wx.request({
          url: 'http://127.0.0.1:3000/getAllTask',
          method:'GET',
          success:function(result){
              that.setData({
                  taskInfo: result.data
              })
          }
      })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      var taskInfo = this.data.taskInfo;  
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