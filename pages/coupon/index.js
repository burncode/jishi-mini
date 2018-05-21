// pages/coupon/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coupons: [],
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
            This.getCouponsData({});
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
        this.getCouponsData({});
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
                        coupons: This.data.coupons.concat(res.data.data.data),
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
    }
    ,

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
    ,

    getCouponsData: function (data) {
        var This = this;
        wx.request({
            url: getApp().globalData.my_coupons.url, //仅为示例，并非真实的接口地址
            method: getApp().globalData.my_coupons.method,
            data: data,
            header: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getApp().globalData._token
            },
            success: function (res) {
                console.log(res);
                if (res.statusCode === 200) {
                    This.setData({
                        coupons: res.data.data.data,
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
    }
    ,
})