// pages/index/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        good_id: null,
        comments: [],
    },
    zhifu:()=>{
        wx.request({
            url: getApp().globalData.wechat_pay.createOrder.url,
            method: getApp().globalData.wechat_pay.createOrder.method,
            header: {
                'Accept': 'application/json',
            },
            data:{
              openId:getApp().globalData.userInfo.open_id
            },
            success (res) {
                let data = res.data;
                console.log(data);
                wx.requestPayment({
                    timeStamp: data.timeStamp.toString(),
                    nonceStr: data.nonceStr,
                    package: data.package,
                    signType: data.signType,
                    paySign: data.paySign,
                    success: function(res) {
                        console.log('付款成功')
                        console.log(res)
                        wx.request({
                            url: getApp().globalData.wechat_pay.createOrder.url,
                            method: getApp().globalData.wechat_pay.createOrder.method,
                            header: {
                                'Accept': 'application/json',
                            },
                            data:{
                                data:data
                            },
                            success (res) {

                            }
                        });
                    },
                    fail: function(res) {
                        console.log('付款失败')
                        console.log(res)
                    }
                })
            }
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
        var This = this;
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