const app = getApp()
Page({
  startC: function (event) {
    wx.navigateTo({
      url: '/pages/ceping/question-c'
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
    var category_id = 3;
    wx.setStorageSync('category_id', category_id)
    wx.request({
      url: app.globalData.host + '/questions?category_id=' + category_id,
      method: 'POST',
      success: function (res) {
        var c_questions = res.data
        wx.setStorageSync('c_questions', c_questions)
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
        history.current_key += 1
        wx.setStorageSync('history', history)

        var question_no = history.current_key + 1

        if (history.current_key > 0 && history.category_id == category_id) {
            if (history.category_id == 3) {

                if (question_no < app.globalData.questionCNumber) {
                    wx.navigateTo({
                        url: '/pages/ceping/question-c'
                    })
                } else {

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