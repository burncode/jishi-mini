const app = getApp();
var area = require('../../data/area')
var p = 0, c = 0, d = 0
Page({


    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        tel: '',
        address: '',
        sex: '',
        provinceName: [],
        provinceCode: [],
        provinceSelIndex: '',
        cityName: [],
        cityCode: [],
        citySelIndex: '',
        districtName: [],
        districtCode: [],
        districtSelIndex: '',
        showMessage: false,
        messageContent: '',
        showDistpicker: false,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      console.log('已知用户信息：');
      console.log(getApp().globalData.userInfo);
        this.setData(getApp().globalData.userInfo);
        // 载入时要显示再隐藏一下才能显示数据，如果有解决方法可以在issue提一下，不胜感激:-)
        // 初始化数据
        this.setAreaData()
    },
    setAreaData: function (p, c, d) {
      var p = p || 0 // provinceSelIndex
      var c = c || 0 // citySelIndex
      var d = d || 0 // districtSelIndex
      // 设置省的数据
      var province = area['100000']
      var provinceName = [];
      var provinceCode = [];
      for (var item in province) {
        provinceName.push(province[item])
        provinceCode.push(item)
      }
      this.setData({
        provinceName: provinceName,
        provinceCode: provinceCode
      })
      // 设置市的数据
      var city = area[provinceCode[p]]
      var cityName = [];
      var cityCode = [];
      for (var item in city) {
        cityName.push(city[item])
        cityCode.push(item)
      }
      this.setData({
        cityName: cityName,
        cityCode: cityCode
      })
      // 设置区的数据
      var district = area[cityCode[c]]
      var districtName = [];
      var districtCode = [];
      for (var item in district) {
        districtName.push(district[item])
        districtCode.push(item)
      }
      this.setData({
        districtName: districtName,
        districtCode: districtCode
      })
    },
    changeArea: function (e) {
      p = e.detail.value[0]
      c = e.detail.value[1]
      d = e.detail.value[2]
      this.setAreaData(p, c, d)
    },
    showDistpicker: function () {
      this.setData({
        showDistpicker: true
      })
    },
    distpickerCancel: function () {
      this.setData({
        showDistpicker: false
      })
    },
    distpickerSure: function () {
      var provinceName = this.data.provinceName;
      var cityName = this.data.cityName;
      var districtName = this.data.districtName;

      this.setData({
        provinceSelIndex: p,
        citySelIndex: c,
        districtSelIndex: d,
        address: provinceName[p] +' '+cityName[c] +' '+districtName[d] 
      })
      this.distpickerCancel()
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

    },
    onSubmit: function (e) {
        var This = this;
        var order_number = wx.getStorageSync('order_number');
        
        var data = e.detail.value;
        data.order_number = order_number;
        data.sex = This.data.sex;
        wx.request({
            url: getApp().globalData.users_update.url, //仅为示例，并非真实的接口地址
            method: getApp().globalData.users_update.method,
            data: data,
            header: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getApp().globalData._token
            },
            success: function (res) {
                if (res.statusCode === 200) {
                  This.goEvaluate();
                    // getApp().globalData.userInfo.name = res.data.name;
                    // getApp().globalData.userInfo.tel = res.data.tel;
                    // getApp().globalData.userInfo.address = res.data.address;
                    // getApp().globalData.userInfo.sex = res.data.sex;
                    // wx.showModal({
                    //     title: '提示',
                    //     content: res.data.message,
                    //     success: function(res) {
                    //       if (res.confirm) {
                    //         console.log('用户点击确定')
                            
                    //       }

                    //     }
                    // })
                } else if (res.statusCode === 422) {
                    var obj = res.data
                    This.setData({
                        disabled: false
                    });
                    wx.showModal({
                        title: '提示',
                        content: res.data.errors[Object.keys(res.data.errors)[0]][0]
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data
                    })
                }
            },
            error: function () {
                wx.showModal({
                    title: '提示',
                    content: '提交失败'
                })
            }
        })
    },
    abc: function (e) {
     
    
    },
    radioChange: function (e) {
        this.data.sex = e.detail.value;
    },
    goEvaluate: function(e)
  {
      console.log('开始测评');
      var order_number = wx.getStorageSync('order_number');
      console.log('获取订单号：' + order_number);
      wx.request({
        url: app.globalData.host + '/history',
        method: 'POST',
        data: {
          member_id: app.globalData.userId,
          subject_id: app.globalData.subjectId,
          order_number: order_number,
        },
        success: function(res) {
          var history = res.data.data;
          wx.setStorageSync('history', history)

          var question_no = history.current_key + 1

          if (history.current_key > 0) {
            if (history.category_id == 1) {
              if (question_no < app.globalData.questionANumber) {
                var category_id = 1;
                wx.setStorageSync('category_id', category_id)
                wx.request({
                  url: app.globalData.host + '/questions?category_id=' + category_id,
                  method: 'POST',
                  success: function (res) {
                    wx.setStorageSync('a_questions', res.data)
                    wx.redirectTo({
                      url: '/pages/ceping/question-a'
                    })
                  }
                })

              } else {
                wx.redirectTo({
                  url: '/pages/ceping/yindao-c'
                })

              }

            } else if (history.category_id == 2) {

              if (question_no < app.globalData.questionBNumber) {
                var category_id = 2;
                wx.setStorageSync('category_id', category_id)
                wx.request({
                  url: app.globalData.host + '/questions?category_id=' + category_id,
                  method: 'POST',
                  success: function (res) {
                    wx.setStorageSync('b_questions', res.data)
                    wx.redirectTo({
                      url: '/pages/ceping/question-b'
                    })
                  }
                })

              } else {
                wx.redirectTo({
                  url: '/pages/ceping/yindao-a'
                })

              }
            } else if (history.category_id == 3) {

              if (question_no < app.globalData.questionCNumber) {
                var category_id = 3;
                wx.setStorageSync('category_id', category_id)
                wx.request({
                  url: app.globalData.host + '/questions?category_id=' + category_id,
                  method: 'POST',
                  success: function (res) {
                    wx.setStorageSync('c_questions', res.data)
                    wx.redirectTo({
                      url: '/pages/ceping/question-c'
                    })
                  }
                })

              } else {

              }
            }
          } else {
            wx.redirectTo({
              url: '/pages/ceping/yindao-b'
            })

          }
        }
      })
  }
})