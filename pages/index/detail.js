// pages/index/detail.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        good_id: null,
        comments: [],
        userInfo:{},
    },

    zhifu: function () {
        let This = this;
        console.log(This.data);
        wx.request({
            url: getApp().globalData.wechat_pay.createWechatOrder.url,
            method: getApp().globalData.wechat_pay.createWechatOrder.method,
            header: {
                'Accept': 'application/json',
            },
            data: {
                openId: This.data.userInfo.open_id,
                goodsId: This.data.good_id,
                class_id: This.data.class_id,
                price: This.data.price,
                activity_price: This.data.activity_price,
                goodName: This.data.goods_name,
                price_level: This.data.price_level,
               
            },
            success(res) {
                let data = res.data;
                wx.requestPayment({
                    timeStamp: data.timeStamp.toString(),
                    nonceStr: data.nonceStr,
                    package: data.package,
                    signType: data.signType,
                    paySign: data.paySign,
                    success: function (res) {
                        wx.redirectTo({
                            url: '/pages/index/pay-success?order_id=' + data.order.order_id + '&class_id=' + data.order.class_id,
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
    },

    bindGetUserInfo: function (e) {
        let This = this;
        // 小程序打开
        wx.login({
            success: function (res) {
                let code = res.code;
                if (code) {
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
                                        app.globalData.userInfo.open_id = res.data.data.user.open_id;
                                        app.globalData.userInfo.tel = res.data.data.user.tel;
                                        app.globalData.userInfo.name = res.data.data.user.name;
                                        app.globalData.userInfo.address = res.data.data.user.address;
                                        app.globalData.userInfo.sex = res.data.data.user.sex;
                                        app.globalData.userId = res.data.data.user.id;
                                        This.setData({
                                            userInfo: app.globalData.userInfo,
                                        });
                                        This.zhifu();
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
                                    }
                                });
                            }
                        }
                    })
                }
            },
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
        // 拿到guid
        let This = this;
        This.setData({
            good_id: option.id,
            userInfo:getApp().globalData.userInfo
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
        return {
            title: '商品详情',
            path: '/pages/index/detail?id='+this.data.good_id
        }
    },
    getComments: function (id) {
        let This = this;
        wx.request({
            url: getApp().globalData.getComments.url, //仅为示例，并非真实的接口地址
            method: getApp().globalData.getComments.method,
            data: {
                goods_id: id,
                per_page: 'all',
            },
            success: function (res) {
                if (res.statusCode === 200) {
                  console.log(res.data.data);
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