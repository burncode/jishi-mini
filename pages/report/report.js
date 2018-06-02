// pages/report/report.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reportUrl: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userId = options.user_id ? options.user_id : app.globalData.userId;
    console.log(app.globalData.host + '/report/' + userId + '?order_number=' + options.order_number);
    this.setData({
      reportUrl: app.globalData.host + '/report/' + userId + '?order_number=' + options.order_number+'#wechat_redirect'
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
    let order_number = wx.getStorageSync('order_number');
    console.log(order_number);
    return {
      title: '报告',
      path: '/pages/report/report?order_number=' + order_number
    }
  }
})