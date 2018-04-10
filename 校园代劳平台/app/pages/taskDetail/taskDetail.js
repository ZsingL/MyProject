// pages/taskDetail/taskDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  taskGet:function() {
      wx.request({
          url:'http://127.0.0.1:3000/taskGet' ,
          method:'POST',
          data:{_id:this.data.id},
          success:function(result){
              console.log(result);
          }
      })
      wx.switchTab({
          url: '../myTask/myTask',
      })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options)
      var id = options.id;
      this.setData({
          id:id
      })
      var that = this;
      wx.request({
          url: 'http://127.0.0.1:3000/getTaskDetail',
          method:'GET',
          data:{id:id},
          success:function(result){
              that.setData({
                  taskDetail:result.data[0]
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