const app = getApp()
Page({
  confirm: function () {

    this.setData({
      hidden: true
    });
    wx.switchTab({
      url: app.globalData.timeOutUrl
    });
  },
  startTimer: function () {
    var that = this
    var timer = setInterval(function () {
      var progress = that.data.progress;
      var seconds = progress.seconds
      seconds--
      if (seconds <= 0) {
        clearInterval(timer)
        that.setData({
          hidden: false
        });
        return false
      }
      if (seconds < 10) {
        progress.leading_zero = 0;
      } else {
        progress.leading_zero = '';
      }
      progress.seconds = seconds;
      that.setData({
        progress: progress,
        timer: timer,
      })
    }, 1000)
  },

  displayButton: function () {
    if (this.data.progress.current_no >= 60) {
      var button_name = '提交答案'
      var bindfunction = 'submit'

      this.setData({
        button_name: button_name,
        bindfunction: bindfunction,
        selected: true,
      })
    } else {

      var current_key = this.data.current_key + 1
      var progress = this.data.progress
      progress.current_no += 1
      progress.percent = progress.current_no / progress.question_count * 100;
      progress.seconds = this.data.seconds;
      progress.leading_zero = '';
      this.setData({
        progress: progress,
        current_key: current_key,
        selected_key: null,
        items: [
          { name: '1', value: '同意' },
          { name: '2', value: '不同意' },
        ],
      })
    }


  },
  radioChange: function (e) {
    var a_questions = wx.getStorageSync('a_questions')
    var selected = e.detail.value
    var category_id = wx.getStorageSync('category_id')
    var question_id = a_questions.data[this.data.current_key].id;
    var selected_key = selected - 1;
    this.setData({
      selected_key: selected_key,
    });
    var answer = {
      member_id: app.globalData.userId,
      subject_id: app.globalData.subjectId,
      category_id: category_id,
      question_id: question_id,
      selected: selected,
      current_key: this.data.current_key,
      order_number: wx.getStorageSync('order_number'),
    }
    this.sendAnswer(answer)
  },
  sendAnswer: function (answer) {
    var that = this;
    wx.request({
      url: app.globalData.host + '/answer',
      method: 'POST',
      data: answer,
      success: function (msg) {
        setTimeout(function () {
          that.nextQuestion();
        }, 50)
      },
    })
  },
  nextQuestion: function (event) {
    this.setData({
      seconds: app.globalData.questionASeconds,
    })
    this.displayButton(this.data.current_key)

  },
  submit: function (event) {
    clearInterval(this.data.timer)
    var data = {
      member_id: app.globalData.userId,
      category_id: wx.getStorageSync('category_id'),
      order_number: wx.getStorageSync('order_number'),
    }
    wx.request({
      url: app.globalData.host + '/grade',
      method: 'POST',
      data: data,
      success: function (msg) {

      },
    })
    wx.redirectTo({
      url: '/pages/ceping/yindao-c'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    selected_key: null,
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

    var a_questions = wx.getStorageSync('a_questions')
    var history = wx.getStorageSync('history')
    if (history.category_id == 1) {
      var current_key = history.current_key;
      //答题中断，返回答题
      current_key += 1;
    } else {
      var current_key = 0;
    }

    var current_no = current_key + 1
    var question_count = a_questions.data.length
    var progress = this.data.progress;
    progress.percent = current_no / question_count * 100;
    progress.current_no = current_no
    progress.question_count = question_count
    progress.seconds = this.data.seconds;
    if (progress.seconds < 10) {
      progress.leading_zero = 0;
    } else {
      progress.leading_zero = '';
    }
    var bindfunction = 'nextQuestion'
    this.setData({
      progress: progress,
      question_items: a_questions.data,
      current_key: current_key,
      bindfunction: bindfunction
    });
    this.startTimer();


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