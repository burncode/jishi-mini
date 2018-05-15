//app.js
const host = 'https://admin.gq1994.top/api'
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
                            This.globalData.userInfo = res.userInfo;
                            console.log(res.userInfo)
                            console.log(code)
                        },
                        complete: res => {
                            wx.request({
                                url: getApp().globalData.login.url,
                                data: {
                                    js_code: code,
                                    name: This.globalData.userInfo.nickName,
                                    head_url: This.globalData.userInfo.avatarUrl,
                                },
                                method: getApp().globalData.login.method,
                                success: function (res) {
                                    if (res.data.StatusCode === 200) {
                                        // 登录成功 将token存入本地
                                        getApp().globalData._token = res.data.ResultData._token;
                                        getApp().globalData.userInfo.id = res.data.ResultData.user.id;
                                        getApp().globalData.userInfo.tel = res.data.ResultData.user.tel;
                                    }
                                }
                            });
                        }
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
            url:host + '/login',
            method:'post'
        },
    }
})