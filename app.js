//app.js
// const host = 'https://admin.gq1994.top/api'
// const host = 'http://192.168.0.7/api'
const host = 'https://api.jishiceping.com/api'
//const host = 'http://localhost:8000/api'
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        let This = this
        // 小程序打开
        wx.login({
            success: function (res) {
                var code = res.code;
                if (res.code) {
                    wx.getUserInfo({
                        withCredentials: true,
                        success: res => {
                            getApp().globalData.userInfo = res.userInfo;
                            wx.request({
                                url: getApp().globalData.login.url,
                                data: {
                                    js_code: code,
                                    name: res.userInfo.nickName,
                                    head_url: res.userInfo.avatarUrl,
                                },
                                method: getApp().globalData.login.method,
                                success: function (res) {
                                    if (res.statusCode === 200) {
                                        // 登录成功 将token存入本地
                                        getApp().globalData._token = res.data.data._token;
                                        getApp().globalData.userInfo.id = res.data.data.user.id;
                                        getApp().globalData.userInfo.tel = res.data.data.user.tel;
                                        getApp().globalData.userInfo.name = res.data.data.user.name;
                                        getApp().globalData.userInfo.open_id = res.data.data.user.open_id;
                                        getApp().globalData.userInfo.tel = res.data.data.user.tel;
                                        getApp().globalData.userInfo.address = res.data.data.user.address;
                                        getApp().globalData.userInfo.sex = res.data.data.user.sex;
                                        getApp().globalData.userId = res.data.data.user.id;
                                    }
                                }
                            });
                        },
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: {},
        _token: null,
        host: host,
        login: {
            url: host + '/login',
            method: 'post'
        },
        my_coupons: {
            url: host + '/my_coupons',
            method: 'get'
        },
        rand_order: {
            url: host + '/rand_order',
            method: 'get'
        },
        get_news: {
            url: host + '/news?per_page=3',
            method: 'get'
        },
        get_banner_news: {
            url: host + '/get_banner_news?num=3',
            method: 'get'
        },
        getOneNews: {
            url: host + '/news/',
            method: 'get'
        },
        getComments: {
            url: host + '/comments?per_page=5',
            method: 'get'
        },
        getGoods: {
            url: host + '/goods',
            method: 'get'
        },
        getOneGood: {
            url: host + '/goods/',
            method: 'get'
        },
        users_update: {
            url: host + '/users_update',
            method: 'post'
        },
        add_comment: {
            url: host + '/comments',
            method: 'post'
        },
        wechat_pay:{
            createWechatOrder:{
                url: host + '/wechat_pay/createWechatOrder',
                method:'post'
            },
            createOrder:{
                url: host + '/wechat_pay/createOrder',
                method:'post'
            },
        },
        userId: null,
        subjectId: 1,
        questionANumber: 60,
        questionBNumber: 150,
        questionCNumber: 28,
        questionASeconds: 15,
        questionBSeconds: 1500,
        questionCSeconds: 15,
        timeOutUrl: "/pages/order/index",//答题中断跳转地址
    }
})