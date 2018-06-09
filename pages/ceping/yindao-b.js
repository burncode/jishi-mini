const app = getApp()
Page({
  startB: function (event) {
    wx.redirectTo({
      url: '/pages/ceping/yindao-b-2'
    })

  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category_id = 2;
    wx.setStorageSync('category_id', category_id);
    
    wx.request({
      url: app.globalData.host + '/questions?category_id=' + category_id,
      method: 'POST',
      success: function (res) {
        var b_questions = res.data
        wx.setStorageSync('b_questions', b_questions)
      }
    })

    //获取历史答题状态
    
    wx.request({
      url: app.globalData.host + '/history',
      method: 'POST',
      data: {
        member_id: app.globalData.userId,
        subject_id: app.globalData.subjectId,
        order_number: wx.getStorageSync('order_number')
      },
      success: function (res) {
        var history = res.data.data;
        wx.setStorageSync('history', history)

        var question_no = history.current_key + 1

        if (history.current_key > 0  && history.category_id == category_id) {
          if (history.category_id == 2) {

            if (question_no < app.globalData.questionBNumber) {
              wx.redirectTo({
                url: '/pages/ceping/question-b'
              })
            } else {
              wx.redirectTo({
                url: '/pages/ceping/yindao-a'
              })

            }
          }
        }
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