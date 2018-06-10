// pages/coupon/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        subjectStatus: 0,
        activeUnfinished: 'active',
        activeFinished: '',
        tab: 'send',
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
        if (this.data.tab === 'send') {
            this.getSends({});
        } else {
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
        This.setData({
            activeUnfinished: 'active',
            tab: 'send',
            activeFinished: '',
            gifts: [],
            page: 1,
            total_page: 1,
            next_page_url: '',
            moreLoading: false,
            moreLoadingComplete: false,
        });
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
        console.log(This.data);
        This.setData({
            activeUnfinished: '',
            activeFinished: 'active',
            tab: 'receive',
            gifts: [],
            page: 1,
            total_page: 1,
            next_page_url: '',
            moreLoading: false,
            moreLoadingComplete: false,
        });
        wx.request({
            url: getApp().globalData.gift_receives.url, //仅为示例，并非真实的接口地址
            method: getApp().globalData.gift_receives.method,
            data: data,
            header: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getApp().globalData._token
            },
            success: function (res) {
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
    },
    activeFinished: function (e) {
        this.getReceives({});
    },
    goReport: function (e) {
        var order_number = e.currentTarget.dataset.orderNo;
        var user_id = e.currentTarget.dataset.userId;
        wx.setStorageSync('order_number', order_number);
        console.log(user_id)        
        wx.navigateTo({
          url: '/pages/report/report?user_id=' + user_id +'&order_number=' + order_number,
        })
    },
    toUsersDetail: function (data) {
        console.log(data);
        var order_number = data.currentTarget.dataset.order_no;
        wx.setStorageSync('order_number', order_number);
        wx.navigateTo({
            url: '/pages/ceping/user-form',
        });
    },

    goEvaluate: function (e) {
        console.log(e);
        console.log('点击继续测评');
        //获取历史答题状态
        var order_number = e.currentTarget.dataset.order_no;
        wx.setStorageSync('order_number', order_number);
        wx.request({
            url: getApp().globalData.host + '/history',
            method: 'POST',
            data: {
                member_id: getApp().globalData.userId,
                subject_id: getApp().globalData.subjectId,
                order_number: order_number,
            },
            success: function (res) {
                var history = res.data.data;
                wx.setStorageSync('history', history)

                var question_no = history.current_key + 1

                if (history.current_key > 0) {
                    if (history.category_id == 1) {
                        if (question_no < getApp().globalData.questionANumber) {
                            var category_id = 1;
                            wx.setStorageSync('category_id', category_id)
                            wx.request({
                                url: getApp().globalData.host + '/questions?category_id=' + category_id,
                                method: 'POST',
                                success: function (res) {
                                    wx.setStorageSync('a_questions', res.data)
                                    wx.redirectTo({
                                        url: '/pages/ceping/question-a'
                                    })
                                }
                            })

                        } else {
                            wx.redirectTo({
                                url: '/pages/ceping/yindao-c'
                            })

                        }

                    } else if (history.category_id == 2) {

                        if (question_no < getApp().globalData.questionBNumber) {
                            var category_id = 2;
                            wx.setStorageSync('category_id', category_id)
                            wx.request({
                                url: getApp().globalData.host + '/questions?category_id=' + category_id,
                                method: 'POST',
                                success: function (res) {
                                    wx.setStorageSync('b_questions', res.data)
                                    wx.redirectTo({
                                        url: '/pages/ceping/question-b'
                                    })
                                }
                            })

                        } else {
                            wx.redirectTo({
                                url: '/pages/ceping/yindao-a'
                            })

                        }
                    } else if (history.category_id == 3) {

                        if (question_no < getApp().globalData.questionCNumber) {
                            var category_id = 3;
                            wx.setStorageSync('category_id', category_id)
                            wx.request({
                                url: getApp().globalData.host + '/questions?category_id=' + category_id,
                                method: 'POST',
                                success: function (res) {
                                    wx.setStorageSync('c_questions', res.data)
                                    wx.redirectTo({
                                        url: '/pages/ceping/question-c'
                                    })
                                }
                            })

                        } else {
                            history.current_key -= 1;
                            wx.setStorageSync('history', history)
                            var category_id = 3;
                            wx.setStorageSync('category_id', category_id)
                            wx.request({
                                url: getApp().globalData.host + '/questions?category_id=' + category_id,
                                method: 'POST',
                                success: function (res) {
                                    wx.setStorageSync('c_questions', res.data)
                                    wx.redirectTo({
                                        url: '/pages/ceping/question-c'
                                    })
                                }
                            })
                        }
                    }
                } else {
                    wx.redirectTo({
                        url: '/pages/ceping/yindao-b'
                    })

                }
            }
        })
    },
})