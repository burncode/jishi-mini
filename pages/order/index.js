const app = getApp()
Page({
    /**
     * 页面的初始数据
     */
    data: {
        subjectStatus: 0,
        activeUnfinished: 'active',
        activeFinished: '',
        userInfo: {},
        orders: [
            {
                title: '高考专业测评',
                payPrice: 998.00,
                price: 1100.00,
                remainingNumber: 33,
                payDate: '2018-03-12 22:23',
                orderNo: '12457854598547545',
            },
        ],
    },
    toMyCoupons: function () {
        wx.navigateTo({
            url: '/pages/coupon/index'
        })
    },
    toUsersDetail: function (data) {
        wx.navigateTo({
            url: '/pages/ceping/user-form',
        });
    },
    activeUnfinished: function (e) {
        this.setData({
            activeUnfinished: 'active',
            activeFinished: '',
            orders: [
                {
                    title: '高考专业测评',
                    payPrice: 998.00,
                    price: 1100.00,
                    remainingNumber: 33,
                    payDate: '2018-03-12 22:23',
                    orderNo: '12457854598547545',
                },

            ],
        })
    },
    activeFinished: function (e) {
        this.setData({
            activeUnfinished: '',
            activeFinished: 'active',
            orders: [],//置空
        })
    },
    goComment: (data) => {
        wx.navigateTo({
            url: '/pages/comment/comment?id=' + data.currentTarget.dataset.id,
        });
    },
    bindGetUserInfo: function (e) {
        var This = this;
        // 小程序打开
        wx.login({
            success: function (res) {
                var code = res.code;
                if (res.code) {
                    wx.getUserInfo({
                        withCredentials: true,
                        success: res => {
                            getApp().globalData.userInfo = e.detail.userInfo;
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
                                        // 登录成功 将token存入本地
                                        getApp().globalData._token = res.data.data._token;
                                        getApp().globalData.userInfo.id = res.data.data.user.id;
                                        getApp().globalData.userInfo.tel = res.data.data.user.tel;
                                        getApp().globalData.userInfo.name = res.data.data.user.name;
                                        getApp().globalData.userInfo.address = res.data.data.user.address;
                                        getApp().globalData.userInfo.sex = res.data.data.user.sex;
                                        getApp().globalData.userId = res.data.data.user.id;
                                        This.setData({
                                            userInfo: getApp().globalData.userInfo,
                                        });
                                    }
                                }
                            });
                        },
                        complete: res => {
                            if (res.errMsg !== 'getUserInfo:ok') {
                                wx.request({
                                    url: getApp().globalData.login.url,
                                    data: {
                                        js_code: code,
                                    },
                                    method: getApp().globalData.login.method,
                                    success: function (res) {
                                        if (res.statusCode === 200) {
                                            // 登录成功 将token存入本地
                                            getApp().globalData._token = res.data.data._token;
                                            getApp().globalData.userInfo.id = res.data.data.user.id;
                                            getApp().globalData.userInfo.tel = res.data.data.user.tel;
                                            getApp().globalData.userInfo.name = res.data.data.user.name;
                                            getApp().globalData.userInfo.tel = res.data.data.user.tel;
                                            getApp().globalData.userInfo.address = res.data.data.user.address;
                                            getApp().globalData.userInfo.sex = res.data.data.user.sex;
                                            getApp().globalData.userId = res.data.data.user.id;
                                            This.setData({
                                                userInfo: getApp().globalData.userInfo,
                                            });
                                        }
                                    }
                                });
                            }
                        }
                    })
                }
            },
            complete: res => {
                if (res.errMsg !== 'getUserInfo:ok') {
                    wx.request({
                        url: getApp().globalData.login.url,
                        data: {
                            js_code: code,
                        },
                        method: getApp().globalData.login.method,
                        success: function (res) {
                            if (res.statusCode === 200) {
                                // 登录成功 将token存入本地
                                getApp().globalData._token = res.data.data._token;
                                getApp().globalData.userInfo.id = res.data.data.user.id;
                                getApp().globalData.userInfo.tel = res.data.data.user.tel;
                                getApp().globalData.userInfo.name = res.data.data.user.name;
                                getApp().globalData.userInfo.tel = res.data.data.user.tel;
                                getApp().globalData.userInfo.address = res.data.data.user.address;
                                getApp().globalData.userInfo.sex = res.data.data.user.sex;
                                getApp().globalData.userId = res.data.data.user.id;
                                This.setData({
                                    userInfo: getApp().globalData.userInfo,
                                });
                            }
                        }
                    });
                }
            }
        });
    },
    goReport: function () {
        wx.navigateTo({
            url: '/pages/report/report',
        })
    },

    goEvaluate: function () {
        //获取历史答题状态
        wx.request({
            url: app.globalData.host + '/history',
            method: 'POST',
            data: {
                member_id: app.globalData.userId,
                subject_id: app.globalData.subjectId
            },
            success: function (res) {
                var history = res.data.data;
                wx.setStorageSync('history', history)

                var question_no = history.current_key + 1

                if (history.current_key > 0) {
                    if (history.category_id == 1) {
                        if (question_no < app.globalData.questionANumber) {
                            var category_id = 1;
                            wx.setStorageSync('category_id', category_id)
                            wx.request({
                                url: app.globalData.host + '/questions?category_id=' + category_id,
                                method: 'POST',
                                success: function (res) {
                                    wx.setStorageSync('a_questions', res.data)
                                    wx.navigateTo({
                                        url: '/pages/ceping/question-a'
                                    })
                                }
                            })

                        } else {
                            wx.navigateTo({
                                url: '/pages/ceping/yindao-c'
                            })

                        }

                    } else if (history.category_id == 2) {

                        if (question_no < app.globalData.questionBNumber) {
                            var category_id = 2;
                            wx.setStorageSync('category_id', category_id)
                            wx.request({
                                url: app.globalData.host + '/questions?category_id=' + category_id,
                                method: 'POST',
                                success: function (res) {
                                    wx.setStorageSync('b_questions', res.data)
                                    wx.navigateTo({
                                        url: '/pages/ceping/question-b'
                                    })
                                }
                            })

                        } else {
                            wx.navigateTo({
                                url: '/pages/ceping/yindao-a'
                            })

                        }
                    } else if (history.category_id == 3) {

                        if (question_no < app.globalData.questionCNumber) {
                            var category_id = 3;
                            wx.setStorageSync('category_id', category_id)
                            wx.request({
                                url: app.globalData.host + '/questions?category_id=' + category_id,
                                method: 'POST',
                                success: function (res) {
                                    wx.setStorageSync('c_questions', res.data)
                                    wx.navigateTo({
                                        url: '/pages/ceping/question-c'
                                    })
                                }
                            })

                        } else {

                        }
                    }
                } else {
                    wx.navigateTo({
                        url: '/pages/ceping/yindao-b'
                    })

                }
            }
        })
    },


    goCoupon: function () {
        wx.navigateTo({
            url: '/pages/coupon/send',
        })
    }
    ,

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
    }
    ,

    goCoupon: function () {
        wx.navigateTo({
            url: '/pages/coupon/send',
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            userInfo: getApp().globalData.userInfo
        });

        var that = this
        //获取历史答题状态
        wx.request({
            url: app.globalData.host + '/history',
            method: 'POST',
            data: {
                member_id: app.globalData.userId,
                subject_id: app.globalData.subjectId
            },
            success: function (res) {
                var history = res.data.data;
                if (history) {
                    var subject_status = history.subject_status
                    that.setData({
                        subjectStatus: subject_status
                    });

                } else {
                }


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
    onShareAppMessage: function () {

    }
})