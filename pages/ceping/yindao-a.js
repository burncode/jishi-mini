const app = getApp()
Page({
  startA: function (event) {
    wx.navigateTo({
      url: '/pages/ceping/question-a'
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
    var category_id = 1;
    wx.setStorageSync('category_id', category_id)
    wx.request({
      url: app.globalData.host + '/questions?category_id=' + category_id,
      method: 'POST',
      success: function (res) {
        var a_questions = res.data
        wx.setStorageSync('a_questions', a_questions)
      }
    })

    //获取历史答题状态
    wx.request({
      url: app.globalData.host + '/history',
      method: 'POST',
      data: {
        member_id: app.globalData.userId,
        subject_id: app.globalData.subjectId,
        order_number: wx.getStorageSync('order_number'),
      },
      success: function (res) {
        var history = res.data.data;

        wx.setStorageSync('history', history)

        var question_no = history.current_key + 1;

        if (history.current_key > 0 && history.category_id == category_id) {
          if (history.category_id == 1) {
            if (question_no < app.globalData.questionANumber) {
              wx.navigateTo({
                url: '/pages/ceping/question-a'
              })
            } else {
              wx.navigateTo({
                url: '/pages/ceping/yindao-c'
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