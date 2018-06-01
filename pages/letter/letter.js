const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: true,
    canIGo: false,
  
  },
  goReport: function () {
    var canIGo = this.data.canIGo;
    if (canIGo) {
      var order_number = wx.getStorageSync('order_number');
      wx.navigateTo({
        url: '/pages/report/report?order_number=' + order_number ,
      })
    } else {
      wx.showToast({
        title: '报告生成中',
        icon: 'loading',
      })
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //去请求生成报告
    
    var order_number = wx.getStorageSync('order_number');
    var reportUrl = app.globalData.host + '/report/' + app.globalData.userId + '?order_number=' + order_number
    var that = this;
    wx.request({
      url: reportUrl,
      success: function(res){
        //等五秒再看结果
        setTimeout(function(){
          that.setData({
            canIGo: true,
          })
        },5000);
      }
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
  
  }
})