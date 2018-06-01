// pages/index/detail.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        good_id: null,
        comments: [],
    },

    zhifu:function() {
        let This = this;
        if (!getApp().globalData.userInfo.open_id){
          // 小程序打开
          wx.login({
            success: function (res) {
              var code = res.code;
              console.log(code);
              if (res.code) {
                wx.getUserInfo({
                  withCredentials: true,
                  success: res => {
                    app.globalData.userInfo = e.detail.userInfo;
                    wx.request({
                      url: app.globalData.login.url,
                      data: {
                        js_code: code,
                        name: e.detail.userInfo.nickName,
                        head_url: e.detail.userInfo.avatarUrl,
                      },
                      method: app.globalData.login.method,
                      success: function (res) {
                        if (res.statusCode === 200) {
                          // 登录成功 将token存入本地
                          app.globalData._token = res.data.data._token;
                          app.globalData.userInfo.id = res.data.data.user.id;
                          app.globalData.userInfo.tel = res.data.data.user.tel;
                          app.globalData.userInfo.name = res.data.data.user.name;
                          app.globalData.userInfo.address = res.data.data.user.address;
                          app.globalData.userInfo.sex = res.data.data.user.sex;
                          app.globalData.userId = res.data.data.user.id;
                          This.setData({
                            userInfo: app.globalData.userInfo,
                          });
                        }
                      }
                    });
                  },
                  complete: res => {
                    if (res.errMsg !== 'getUserInfo:ok') {
                      wx.request({
                        url: app.globalData.login.url,
                        data: {
                          js_code: code,
                        },
                        method: app.globalData.login.method,
                        success: function (res) {
                          if (res.statusCode === 200) {
                            // 登录成功 将token存入本地
                            app.globalData._token = res.data.data._token;
                            app.globalData.userInfo.id = res.data.data.user.id;
                            app.globalData.userInfo.tel = res.data.data.user.tel;
                            app.globalData.userInfo.name = res.data.data.user.name;
                            app.globalData.userInfo.tel = res.data.data.user.tel;
                            app.globalData.userInfo.address = res.data.data.user.address;
                            app.globalData.userInfo.sex = res.data.data.user.sex;
                            app.globalData.userId = res.data.data.user.id;
                            This.setData({
                              userInfo: app.globalData.userInfo,
                            });
                          }
                        },
                      });
                    }
                  }
                })
              }
            },
            complete: res => {
              if (res.errMsg !== 'getUserInfo:ok') {
                wx.request({
                  url: app.globalData.login.url,
                  data: {
                    js_code: code,
                  },
                  method: app.globalData.login.method,
                  success: function (res) {
                    if (res.statusCode === 200) {
                      // 登录成功 将token存入本地
                      app.globalData._token = res.data.data._token;
                      app.globalData.userInfo.id = res.data.data.user.id;
                      app.globalData.userInfo.tel = res.data.data.user.tel;
                      app.globalData.userInfo.name = res.data.data.user.name;
                      app.globalData.userInfo.tel = res.data.data.user.tel;
                      app.globalData.userInfo.address = res.data.data.user.address;
                      app.globalData.userInfo.sex = res.data.data.user.sex;
                      app.globalData.userId = res.data.data.user.id;
                      This.setData({
                        userInfo: app.globalData.userInfo,
                      });
                    }
                  }
                });
              }
            }
          });
        } else {
          wx.request({
            url: getApp().globalData.wechat_pay.createWechatOrder.url,
            method: getApp().globalData.wechat_pay.createWechatOrder.method,
            header: {
              'Accept': 'application/json',
            },
            data: {
              openId: getApp().globalData.userInfo.open_id,
              goodsId: This.data.good_id,
              price: This.data.price,
              activity_price: This.data.activity_price,
              goodName: This.data.goods_name,
              price_level: This.data.price_level,
              coupon_price: 20,
            },
            success(res) {
              let data = res.data;
              console.log(data);
              wx.requestPayment({
                timeStamp: data.timeStamp.toString(),
                nonceStr: data.nonceStr,
                package: data.package,
                signType: data.signType,
                paySign: data.paySign,
                success: function (res) {
                  console.log(res)
                  wx.redirectTo({
                    url: '/pages/index/pay-success?order_id=' + data.order.order_id,
                  });
                },
                fail: function (res) {
                  console.log('付款失败')
                  wx.showModal({
                    title: '支付',
                    content: '付款失败',
                    success: function (res) {
                      if (res.confirm) {
                        console.log('用户点击确定')
                      } else if (res.cancel) {
                        console.log('用户点击取消')
                      }
                    }
                  })
                },
                complete: function () {
                  console.log('完成请求')
                }
              })
            }
          });
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
        // 拿到guid
        let This = this;
        This.setData({
            good_id: option.id,
        });
        This.getComments(option.id);
        wx.request({
            url: getApp().globalData.getOneGood.url + option.id,
            method: getApp().globalData.getOneGood.method,
            header: {
                'Accept': 'application/json',
            },
            success (res) {
                This.setData(res.data.data)
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
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
        }
        return {
            title: '/pages/index/detail页面转发标题',
            path: '/pages/index/detail'
        }
    },
    getComments: function (id) {
        let This = this;
        wx.request({
            url: getApp().globalData.getComments.url, //仅为示例，并非真实的接口地址
            method: getApp().globalData.getComments.method,
            data:{
                goods_id:id,
                per_page:'all',
            },
            success: function (res) {
                if (res.statusCode === 200) {
                    This.setData({
                        comments: res.data.data,
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '评论数据加载失败'
                    })
                }
            },
            error: function () {
                wx.showModal({
                    title: '提示',
                    content: '评论数据加载失败'
                })
            }
        })
    },
})