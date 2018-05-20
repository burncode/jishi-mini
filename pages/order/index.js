const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        activeUnfinished: 'active',
        activeFinished: '',
        userInfo: {},
        orders: [
            {
                title: '高考专业测评',
                payPrice: 998.00,
                price: 1100.00,
                remainingNumber: 33,
                payDate: '2018-03-12 22:23',
                orderNo: '12457854598547545',
            },
        ],
    },
    toMyCoupons: function () {
        wx.navigateTo({
            url: '/pages/coupon/index'
        })
    },
    toUsersDetail: function (data) {
        wx.navigateTo({
            url: '/pages/ceping/user-form',
        });
    },
    activeUnfinished: function (e) {
        this.setData({
            activeUnfinished: 'active',
            activeFinished: '',
            orders: [
                {
                    title: '高考专业测评',
                    payPrice: 998.00,
                    price: 1100.00,
                    remainingNumber: 33,
                    payDate: '2018-03-12 22:23',
                    orderNo: '12457854598547545',
                },

            ],
        })
    },
    activeFinished: function (e) {

        this.setData({
            activeUnfinished: '',
            activeFinished: 'active',
            orders: [],//置空
        })
    },


    goEvaluate: function () {
      //获取历史答题状态
      wx.request({
        url: app.globalData.host + '/history',
        method: 'POST',
        data: {
          member_id: app.globalData.userId,
          subject_id: app.globalData.subjectId
        },
        success: function (res) {
          var history = res.data.data;
          console.log(history)
          wx.setStorageSync('history', history)

          var question_no = history.current_key + 1

          if (history.current_key > 0) {
            if (history.category_id == 1) {
              if (question_no < app.globalData.questionANumber) {
                wx.navigateTo({
                  url: '/pages/ceping/question-a'
                })
              } else {
                wx.navigateTo({
                  url: '/pages/ceping/yindao-b'
                })

              }

            } else if (history.category_id == 2) {

              if (question_no < app.globalData.questionBNumber) {
                wx.navigateTo({
                  url: '/pages/ceping/question-b'
                })
              } else {
                wx.navigateTo({
                  url: '/pages/ceping/yindao-c'
                })

              }
            } else if (history.category_id == 3) {

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

    goCoupon: function () {
        wx.navigateTo({
            url: '/pages/coupon/send',
        })
    },

    copy: function (e) {
        console.log(e)
        wx.setClipboardData({
            data: e.currentTarget.dataset.orderNo,
            success: function (res) {
                wx.showToast({
                    title: '复制成功',
                    icon: 'succes',
                    duration: 1000,
                    mask: true
                })
                wx.getClipboardData({
                    success: function (res) {
                        console.log(res.data)
                    }
                })
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            userInfo: getApp().globalData.userInfo
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