//index.js
//获取应用实例
var interval;

Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        imgUrls: [
            '/demo/swiper.gif',
            '/demo/swiper-002.gif'
        ],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        rand_order: '',
        news: [],
        comments: [],
        goods: [],
    },

    onLoad: function () {
        var This = this;
        This.getRandOrder();
        This.getNews();
        This.getComments();
        This.getGoods();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    bindGetUserInfo: function (e) {
        console.log(e.detail.userInfo)
        var This=this;
        // 小程序打开
        wx.login({
            success: function (res) {

                var code = res.code;
                console.log(code);

                if (res.code) {
                    wx.getUserInfo({
                        withCredentials: true,
                        success: res => {
                            getApp().globalData.userInfo = res.userInfo;
                            console.log(code)
                        },
                        complete: res => {
                            console.log(res);
                            wx.request({
                                url: getApp().globalData.login.url,
                                data: {
                                    js_code: code,
                                    name: e.detail.userInfo.nickName,
                                    head_url: e.detail.userInfo.avatarUrl,
                                },
                                method: getApp().globalData.login.method,
                                success: function (res) {
                                    if (res.statusCode === 200) {
                                        console.log(res.data);
                                        // 登录成功 将token存入本地
                                        getApp().globalData._token = res.data.data._token;
                                        getApp().globalData.userInfo.id = res.data.data.user.id;
                                        getApp().globalData.userInfo.tel = res.data.data.user.tel;
                                        getApp().globalData.userInfo.name = res.data.data.user.name;
                                        getApp().globalData.userInfo.tel = res.data.data.user.tel;
                                        getApp().globalData.userInfo.address = res.data.data.user.address;
                                        getApp().globalData.userInfo.sex = res.data.data.user.sex;
                                        getApp().globalData.userId = res.data.data.user.id;
                                        console.log(getApp().globalData);
                                    }
                                }
                            });
                        }
                    })
                }
            }
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var This = this;
        // interval = setInterval(function () {
        //     This.getRandOrder();
        // }, 5000);
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
        clearInterval(interval);
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        clearInterval(interval);
    },

    getRandOrder: function () {
        var This = this;
        wx.request({
            url: getApp().globalData.rand_order.url, //仅为示例，并非真实的接口地址
            method: getApp().globalData.rand_order.method,
            success: function (res) {
                console.log(res);
                console.log(res.data.data);

                if (res.statusCode === 200) {
                    This.setData({
                        rand_order: res.data.data,
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '播报数据加载失败'
                    })
                }
            },
            error: function () {
                wx.showModal({
                    title: '提示',
                    content: '播报数据加载失败'
                })
            }
        })
    },
    getNews: function () {
        var This = this;
        wx.request({
            url: getApp().globalData.get_news.url, //仅为示例，并非真实的接口地址
            method: getApp().globalData.get_news.method,
            success: function (res) {
                if (res.statusCode === 200) {
                    This.setData({
                        news: res.data.data.data,
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '专家专栏数据加载失败'
                    })
                }
            },
            error: function () {
                wx.showModal({
                    title: '提示',
                    content: '专家专栏数据加载失败'
                })
            }
        })
    },
    getComments: function () {
        var This = this;
        wx.request({
            url: getApp().globalData.getComments.url, //仅为示例，并非真实的接口地址
            method: getApp().globalData.getComments.method,
            success: function (res) {
                if (res.statusCode === 200) {
                    This.setData({
                        comments: res.data.data.data,
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
    getGoods: function () {
        var This = this;
        wx.request({
            url: getApp().globalData.getGoods.url, //仅为示例，并非真实的接口地址
            method: getApp().globalData.getGoods.method,
            success: function (res) {
                if (res.statusCode === 200) {
                    This.setData({
                        goods: res.data.data.data,
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '商品数据加载失败'
                    })
                }
            },
            error: function () {
                wx.showModal({
                    title: '提示',
                    content: '商品数据加载失败'
                })
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        return {
            title: '我正在使用基石测评，您也来吧-首页',
            path: '/pages/index/index'
        }
    },

    /**
     * 跳转到新闻详情页面
     */
    toNewsDetail: function (data) {
        wx.navigateTo({
            url: '/pages/index/lunbo-01?guid=' + data.currentTarget.dataset.id,
        });
    },
    toGoodsDetail: function (data) {
        wx.navigateTo({
            url: '/pages/index/detail?id=' + data.currentTarget.dataset.id,
        });
    },
})
