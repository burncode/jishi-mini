// pages/coupon/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        subjectStatus: 0,
        activeUnfinished: 'active',
        activeFinished: '',
        tab:'send',
        gifts: [],
        page: 1,
        total_page: 1,
        next_page_url: '',
        moreLoading: false,
        moreLoadingComplete: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        var This = this;
        if (getApp().globalData._token) {
            This.getSends({});
        }
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
    toGoodDetail: (data) => {
        wx.navigateTo({
            url: '/pages/index/detail?id=' + data.currentTarget.dataset.id,
        });
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        // 页面进来 请求房源数据
        wx.showNavigationBarLoading()
        if (this.data.tab==='send'){
            this.getSends({});
        }else{
            this.getReceives({});
        }
        wx.hideNavigationBarLoading() //完成停止加载
        wx.stopPullDownRefresh() //停止下拉刷新
    }
    ,

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // 页面进来 请求房源数据
        let This = this;
        if (!This.data.next_page_url) {
            This.setData({
                next_page_url: '',
                moreLoadingComplete: true,
                moreLoading: false,
            });
            return;
        }
        This.setData({
            moreLoading: true,
        });
        wx.request({
            url: This.data.next_page_url, //仅为示例，并非真实的接口地址
            header: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getApp().globalData._token
            },
            success: function (res) {
                if (res.statusCode === 200 && res.data.data.data) {
                    This.setData({
                        gifts: This.data.gifts.concat(res.data.data.data),
                        total_page: res.data.data.last_page,
                        page: res.data.data.current_page,
                        next_page_url: res.data.data.next_page_url,
                        moreLoadingComplete: false,
                    });
                } else {
                    This.setData({
                        next_page_url: '',
                        moreLoadingComplete: true,
                        moreLoading: false,
                    });
                }
            },
            error: function () {
                wx.showModal({
                    title: '提示',
                    content: '数据加载失败'
                })
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    getSends: function (data) {
        var This = this;
        wx.request({
            url: getApp().globalData.gift_sends.url, //仅为示例，并非真实的接口地址
            method: getApp().globalData.gift_sends.method,
            data: data,
            header: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getApp().globalData._token
            },
            success: function (res) {
                console.log(res);
                if (res.statusCode === 200) {
                    This.setData({
                        gifts: res.data.data.data,
                        total_page: res.data.data.last_page,
                        page: res.data.data.current_page,
                        next_page_url: res.data.data.next_page_url,
                        moreLoadingComplete: false,
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '数据加载失败'
                    })
                }
            },
            error: function () {
                wx.showModal({
                    title: '提示',
                    content: '数据加载失败'
                })
            }
        })
    },
    getReceives: function (data) {
        var This = this;
        wx.request({
            url: getApp().globalData.gift_receives.url, //仅为示例，并非真实的接口地址
            method: getApp().globalData.gift_receives.method,
            data: data,
            header: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getApp().globalData._token
            },
            success: function (res) {
                console.log(res);
                if (res.statusCode === 200) {
                    This.setData({
                        gifts: res.data.data.data,
                        total_page: res.data.data.last_page,
                        page: res.data.data.current_page,
                        next_page_url: res.data.data.next_page_url,
                        moreLoadingComplete: false,
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: '数据加载失败'
                    })
                }
            },
            error: function () {
                wx.showModal({
                    title: '提示',
                    content: '数据加载失败'
                })
            }
        })
    },
    copy: function (e) {
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
                    }
                })
            }
        })
    },
    activeUnfinished: function (e) {
        this.getSends({});
        this.setData({
            activeUnfinished: 'active',
            tab: 'send',
            activeFinished: '',
            orders: this.data.histories_unfinished,
        })
    },
    activeFinished: function (e) {
        this.getReceives({});
        this.setData({
            activeUnfinished: '',
            activeFinished: 'active',
            tab: 'receive',
            orders: this.data.histories_finished,
        })
    },
    goReport: function (e) {
        var order_number = e.currentTarget.dataset.orderNo;
        wx.setStorageSync('order_number', order_number);
        wx.navigateTo({
            url: '/pages/report/report?order_number=' + order_number,
        })
    },
    toUsersDetail: function (data) {
        var order_number = data.currentTarget.dataset.orderNo;
        wx.setStorageSync('order_number', order_number);
        wx.navigateTo({
            url: '/pages/ceping/user-form',
        });
    },
})