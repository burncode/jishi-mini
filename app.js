//app.js
const host = 'https://admin.gq1994.top/api'
// const host = 'http://192.168.0.8/api'
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        let This = this
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
        rand_order:{
            url: host + '/rand_order',
            method: 'get'
        },
        get_news:{
            url: host + '/news?per_page=3',
            method: 'get'
        },
        getOneNews:{
            url: host + '/news/',
            method: 'get'
        },
        getComments:{
            url: host + '/comments',
            method: 'get'
        },
        getGoods:{
            url: host + '/goods',
            method: 'get'
        },
        getOneGood:{
            url: host + '/goods/',
            method: 'get'
        },
        users_update:{
            url: host + '/users_update',
            method: 'post'
        },
        userId: null,
        subjectId: 1,
        questionANumber: 60,
        questionBNumber:150,
        questionCNumber:28,
        questionASeconds: 15,
        questionBSeconds: 15,
        questionCSeconds:15,
        timeOutUrl:"/pages/order/index",//答题中断跳转地址
    }
})