const app = getApp()
Page({
  confirm: function () {

    console.log(app.globalData.timeOutUrl)
    this.setData({
      hidden: true
    });
    wx.switchTab({
      url: app.globalData.timeOutUrl
    })
    console.log("clicked confirm");

  },
  startTimer: function () {
    var that = this
    var timer = setInterval(function () {
      var seconds = that.data.seconds
      seconds--
      if (seconds <= 0) {
        that.timeOut()
        clearInterval(timer)
        that.setData({
          hidden: false
        });
        return false
      }
      that.setData({
        seconds: seconds,
        timer: timer,
      })
    }, 1000)
  },
  timeOut: function () {
    console.log('时间到');
  },
  displayButton: function () {
    if (this.data.progress.current_no >= 59) {
      var button_name = '提交答案'
      var bindfunction = 'submit'
    } else {
      var button_name = '下一题'
      var bindfunction = 'nextQuestion'
    }
    this.setData({
      button_name: button_name,
      bindfunction: bindfunction,
    })

  },
  radioChange: function (e) {
    this.setData({
      selected:true,
    })

    var a_questions = wx.getStorageSync('a_questions')
    var selected = e.detail.value
    var category_id = wx.getStorageSync('category_id')
    var question_id = a_questions.data[this.data.current_key].id
    var answer = {
      member_id: app.globalData.userId,
      subject_id: app.globalData.subjectId,
      category_id: category_id,
      question_id: question_id,
      selected: selected,
      current_key: this.data.current_key,
    }
    this.sendAnswer(answer)
  },
  sendAnswer: function (answer) {
    wx.request({
      url: app.globalData.host + '/answer',
      method: 'POST',
      data: answer,
      success: function (msg) {

      },
    })
  },
  nextQuestion: function (event) {
    console.log('点击下一题')
    this.setData({
      seconds: app.globalData.questionASeconds,
      selected:false,
    })
    this.displayButton(this.data.current_key)
    var current_key = this.data.current_key + 1
    var progress = this.data.progress
    progress.current_no += 1
    progress.percent = progress.current_no / progress.question_count * 100;
    this.setData({
      progress: progress,
      current_key: current_key,
      items: [
        { name: '1', value: '同意' },
        { name: '2', value: '不同意' },
      ],
    })
  },
  submit: function (event) {
    clearInterval(this.data.timer)
    var data = {
      member_id: app.globalData.userId,
      category_id: wx.getStorageSync('category_id')
    }
    wx.request({
      url: app.globalData.host + '/grade',
      method: 'POST',
      data: data,
      success: function (msg) {

      },
    })
    wx.navigateTo({
      url: '/pages/ceping/yindao-c'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    timer: null,
    selected: false,
    hidden: true,
    nocancel: false,
    seconds: app.globalData.questionASeconds,
    currentNo: 1,
    items: [
      { name: '1', value: '同意' },
      { name: '2', value: '不同意' },

    ],

    button_name: '下一题',
    progress: {
      current_no: null,
      question_count: null,
      percent: null,

    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.startTimer()
    var a_questions = wx.getStorageSync('a_questions')
    var history = wx.getStorageSync('history')
    console.log(history)
    if (history.category_id == 1) {
      var current_key = history.current_key;
    } else {
      var current_key = 0;

    }

    var current_no = current_key + 1
    var question_count = a_questions.data.length
    var progress = this.data.progress;
    progress.percent = current_no / question_count * 100;
    progress.current_no = current_no
    progress.question_count = question_count

    var bindfunction = 'nextQuestion'
    this.setData({
      progress: progress,
      question_items: a_questions.data,
      current_key: current_key,
      bindfunction: bindfunction
    })

    this.displayButton()
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