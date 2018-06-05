//app.js
// const host = 'https://admin.gq1994.top/api'
// const host = 'http://yuanshiceping.com/api'
 const host = 'https://api.jishiceping.com/api';

//  const host = 'http://www.xyy.com/api';
 const consultationPhone = '4001019859'; //咨询电话
App({
    onLaunch: function (option) {
        //检测网络状态
        wx.onNetworkStatusChange(function (res) {
            getApp().globalData.networtStatus = res;
        });

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
                                        // 分享进来的
                                        if (option.query.order_id) {
                                            getApp().globalData.order_id = option.query.order_id;
                                            var order_id = option.query.order_id;
                                            getApp().receiveOrder(order_id);
                                        }
                                    }
                                }
                            });
                        },
                        fail:function (res) {
                            // 分享进来的
                            if (option.query.order_id) {
                                getApp().globalData.order_id = option.query.order_id;
                                wx.showModal({
                                    title: '提示',
                                    content: '请先进入我的页面登录再领取'
                                })
                            }
                        }
                    })
                }
            },
        })
    },
    // 过滤html标签
    convertHtmlToText: function convertHtmlToText(inputText) {
        var returnText = "" + inputText;
        returnText = returnText.replace(/<\/div>/ig, '\r\n');
        returnText = returnText.replace(/<\/li>/ig, '\r\n');
        returnText = returnText.replace(/<li>/ig, '  *  ');
        returnText = returnText.replace(/<\/ul>/ig, '\r\n');
        //-- remove BR tags and replace them with line break
        returnText = returnText.replace(/<br\s*[\/]?>/gi, "\r\n");

        //-- remove P and A tags but preserve what's inside of them
        returnText = returnText.replace(/<p.*?>/gi, "\r\n");
        returnText = returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

        //-- remove all inside SCRIPT and STYLE tags
        returnText = returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
        returnText = returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
        //-- remove all else
        returnText = returnText.replace(/<(?:.|\s)*?>/g, "");

        //-- get rid of more than 2 multiple line breaks:
        returnText = returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\r\n\r\n");

        //-- get rid of more than 2 spaces:
        returnText = returnText.replace(/ +(?= )/g, '');

        //-- get rid of html-encoded characters:
        returnText = returnText.replace(/ /gi, " ");
        returnText = returnText.replace(/&/gi, "&");
        returnText = returnText.replace(/"/gi, '"');
        returnText = returnText.replace(/</gi, '<');
        returnText = returnText.replace(/>/gi, '>');

        return returnText;
    },
    receiveOrder:function (order_id) {
        wx.request({
            url: getApp().globalData.receiveOrder.url + order_id,
            method: getApp().globalData.receiveOrder.method,
            header: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getApp().globalData._token
            },
            success:function (res) {
                console.log(res);
                if (res.statusCode===200){
                    wx.showModal({
                        title: '提示',
                        content: '领取成功'
                    })
                }else{
                    wx.showModal({
                        title: '提示',
                        content: res.data.message
                    })
                }
            },
            fail:function (res) {
                wx.showModal({
                    title: '提示',
                    content: '领取失败'
                })
            }
        });
    },
    globalData: {
        userInfo: {},
        _token: null,
        host: host,
        consultationPhone: consultationPhone,
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
        sendOrder: {
            url: host + '/gifts/send/',
            method: 'post'
        },
        receiveOrder:{
            url: host + '/gifts/',
            method: 'post'
        },
        wechat_pay: {
            createWechatOrder: {
                url: host + '/wechat_pay/createWechatOrder',
                method: 'post'
            },
            createOrder: {
                url: host + '/wechat_pay/createOrder',
                method: 'post'
            },
        },
        gift_sends: {
            url: host + '/gifts/sendOrders',
            method: 'get'
        },
        gift_receives: {
            url: host + '/gifts/receiveOrders',
            method: 'get'
        },
        networtStatus: {
            isConnected: true,
            networkType: null
        },
        userId: null,
        subjectId: 1,
        questionANumber: 60,
        questionBNumber: 150,
        questionCNumber: 28,
        questionASeconds: 15,
        questionBSeconds: 15,
        questionCSeconds: 15,
        timeOutUrl: "/pages/order/index",//答题中断跳转地址
    }
})
