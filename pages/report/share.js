// pages/report/report.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNumber:0,
    userId:0,
    imageUrl: "https://api.jishiceping.com/images/report_share.jpg",
  },

  /**9
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      orderNumber:options.order_number,
      userId:options.user_id,
      imageUrl: "https://api.jishiceping.com/images/report_share.jpg",
    });
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
    var pathStr = '/pages/report/report?user_id=' + this.data.userId + '&order_number=' + this.data.orderNumber;
    return {
      title: '我的高考测评',
      desc:'我的测评结果你也来看看吧！',
      path: pathStr,
      imageUrl: this.data.imageUrl,
      success: (res) => {
        console.log("转发成功", res);
        wx.navigateBack();
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }  
  }
})
