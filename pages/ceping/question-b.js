const app = getApp()
Page({
  confirm: function () {
    this.setData({
      hidden: true
    });
    wx.switchTab({
      url: app.globalData.timeOutUrl,
      success: function (e) {
        var page = getCurrentPages().pop();
        if (page == undefined || page == null) return;
        page.onLoad();
      },
    });


  },
  startTimer: function () {
    var that = this
    var timer = setInterval(function () {
      var seconds = that.data.seconds
      seconds--
      if (seconds <= 0) {
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

  displayButton: function () {
    if (this.data.progress.current_no >= app.globalData.questionBNumber) {
      var button_name = '提交答案'
      var bindfunction = 'submit'
      this.setData({
        button_name: button_name,
        bindfunction: bindfunction,
      })
    } else {

    }
    

  },
  radioChange: function (e) {
    var b_questions = wx.getStorageSync('b_questions')
    var selected = e.detail.value
    var category_id = wx.getStorageSync('category_id')
    var question_id = b_questions.data[this.data.current_key].id
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
        that.nextQuestion();
      },
    })
  },
  nextQuestion: function (event) {
    this.setData({
      seconds: app.globalData.questionBSeconds,
      //selected: false,
    })
    var selected = false
    if (this.data.progress.current_no >= 150) {
      var button_name = '提交答案'
      var bindfunction = 'submit'
      selected = true
      this.setData({
        button_name: button_name,
        bindfunction: bindfunction,
        selected: selected,
      })
    } else {
      var current_key = this.data.current_key + 1
      var progress = this.data.progress
      progress.current_no += 1
      progress.percent = progress.current_no / progress.question_count * 100;
      this.setData({
        progress: progress,
        current_key: current_key,
        items: [
          { name: '1', value: 'A非常贴切描述我' },
          { name: '2', value: 'A一般' },
          { name: '3', value: '中立' },
          { name: '4', value: 'B一般' },
          { name: '5', value: 'B非常贴切描述我' },
        ],
      })
    }




  },
  submit: function (event) {
    clearInterval(this.data.timer)
    var data = {
      member_id: app.globalData.userId,
      category_id: wx.getStorageSync('category_id'),
      order_number: wx.getStorageSync('order_number'),
    };
    wx.request({
      url: app.globalData.host + '/grade',
      method: 'POST',
      data: data,
      success: function (msg) {

      },
    })
    wx.redirectTo({
      url: '/pages/ceping/yindao-a'
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
    seconds: app.globalData.questionBSeconds,
    items: [
      { name: '1', value: 'A非常贴切描述我' },
      { name: '2', value: 'A一般' },
      { name: '3', value: '中立' },
      { name: '4', value: 'B一般' },
      { name: '5', value: 'B非常贴切描述我' },
    ],
    button_name: '',
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
    var b_questions = wx.getStorageSync('b_questions')
    var history = wx.getStorageSync('history')
    if (history.category_id == 2) {
      var current_key = history.current_key;
      //答题中断，返回答题
      current_key += 1;
    } else {
      var current_key = 0;

    }

    var current_no = current_key + 1
    var question_count = b_questions.data.length
    var progress = this.data.progress;
    progress.percent = current_no / question_count * 100;
    progress.current_no = current_no
    progress.question_count = question_count

    var bindfunction = 'nextQuestion'
    this.setData({
      progress: progress,
      question_items: b_questions.data,
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