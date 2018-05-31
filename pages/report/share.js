// pages/report/report.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNumber:0,
    userId:0,
  },

  /**9
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData);
    console.log(options.order_number);                 console.log(options.user_id);
    console.log(app.globalData.hroot + "/images/cover.png");
    this.setData({
      orderNumber:options.order_number,
      userId:options.user_id,
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
    return {
      title: '分享报告',
      path: '/pages/report/report?user_id='+this.userId+'&order_number='+this.orderNumber,
      imageUrl: "https://api.jishiceping.com/images/cover.png",
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