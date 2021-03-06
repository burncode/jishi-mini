const app = getApp();
Page({
    /**
     * 页面的初始数据
     */
    data: {
        subjectStatus: 0,
        activeUnfinished: 'active',
        activeFinished: '',
        userInfo: {},
        histories_finished: [],
        histories_unfinished: [],
        orders: [],
    },
    toPhone: function() {
      wx.makePhoneCall({
        phoneNumber: app.globalData.consultationPhone
      })
    },
    toMyCoupons: function () {
        wx.navigateTo({
            url: '/pages/coupon/index'
        })
    },
    toSearch: function () {
      wx.navigateTo({
        url: '/pages/search/index'
      })
    },
    toMyGifts: function () {
        wx.navigateTo({
            url: '/pages/gift/index'
        })
    },
    toUsersDetail: function (data) {
        console.log('点击立即测评，填写个人信息：');
        console.log('将本次测评相关订单号存入缓存待用');
        var order_number = data.currentTarget.dataset.orderNo;
        wx.setStorageSync('order_number', order_number);
        console.log('订单号：' + order_number);

        wx.navigateTo({
            url: '/pages/ceping/user-form',
        });
    },
    activeUnfinished: function (e) {
        this.setData({
            activeUnfinished: 'active',
            activeFinished: '',
            orders: this.data.histories_unfinished,
        })
    },
    activeFinished: function (e) {
        this.setData({
            activeUnfinished: '',
            activeFinished: 'active',
            orders: this.data.histories_finished,
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
                console.log(code);
                if (res.code) {
                    wx.getUserInfo({
                        withCredentials: true,
                        success: res => {
                            app.globalData.userInfo = e.detail.userInfo;
                            wx.request({
                                url: app.globalData.login.url,
                                data: {
                                    js_code: code,
                                    name: e.detail.userInfo.nickName,
                                    head_url: e.detail.userInfo.avatarUrl,
                                },
                                method: app.globalData.login.method,
                                success: function (res) {
                                    if (res.statusCode === 200) {
                                        // 登录成功 将token存入本地
                                        app.globalData._token = res.data.data._token;
                                        app.globalData.userInfo.id = res.data.data.user.id;
                                        app.globalData.userInfo.tel = res.data.data.user.tel;
                                        app.globalData.userInfo.name = res.data.data.user.name;
                                        app.globalData.userInfo.address = res.data.data.user.address;
                                        app.globalData.userInfo.sex = res.data.data.user.sex;
                                        app.globalData.userId = res.data.data.user.id;
                                        This.setData({
                                            userInfo: app.globalData.userInfo,
                                        });
                                        // 分享进来的
                                        console.log(getApp().globalData.order_id);
                                        console.log(app.globalData);
                                        console.log(1);
                                        if (app.globalData.order_id) {
                                            console.log(1);
                                            getApp().receiveOrder(app.globalData.order_id);
                                        }
                                    }
                                }
                            });
                        },
                        complete: res => {
                            if (res.errMsg !== 'getUserInfo:ok') {
                                wx.request({
                                    url: app.globalData.login.url,
                                    data: {
                                        js_code: code,
                                    },
                                    method: app.globalData.login.method,
                                    success: function (res) {
                                        if (res.statusCode === 200) {
                                            // 登录成功 将token存入本地
                                            app.globalData._token = res.data.data._token;
                                            app.globalData.userInfo.id = res.data.data.user.id;
                                            app.globalData.userInfo.tel = res.data.data.user.tel;
                                            app.globalData.userInfo.name = res.data.data.user.name;
                                            app.globalData.userInfo.tel = res.data.data.user.tel;
                                            app.globalData.userInfo.address = res.data.data.user.address;
                                            app.globalData.userInfo.sex = res.data.data.user.sex;
                                            app.globalData.userId = res.data.data.user.id;
                                            This.setData({
                                                userInfo: app.globalData.userInfo,
                                            });
                                            // 分享进来的
                                            if (app.globalData.order_id) {
                                                getApp().receiveOrder(app.globalData.order_id);
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    })
                }
            },
        });
    },
    goReport: function (e) {
        var order_number = e.currentTarget.dataset.orderNo;
        wx.setStorageSync('order_number', order_number);
        wx.navigateTo({
            url: '/pages/report/report?order_number=' + order_number,
        })
    },

    goEvaluate: function (e) {
        console.log(e);
        console.log('点击继续测评');
        //获取历史答题状态
        var order_number = e.currentTarget.dataset.orderNo;
        wx.setStorageSync('order_number', order_number);
        wx.request({
            url: app.globalData.host + '/history',
            method: 'POST',
            data: {
                member_id: app.globalData.userId,
                subject_id: app.globalData.subjectId,
                order_number: order_number,
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

                        if (question_no < app.globalData.questionBNumber) {
                            var category_id = 2;
                            wx.setStorageSync('category_id', category_id)
                            wx.request({
                                url: app.globalData.host + '/questions?category_id=' + category_id,
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
                    
                        if (question_no < app.globalData.questionCNumber) {
                            var category_id = 3;
                            wx.setStorageSync('category_id', category_id)
                            wx.request({
                                url: app.globalData.host + '/questions?category_id=' + category_id,
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
                            url: app.globalData.host + '/questions?category_id=' + category_id,
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

    goCoupon: function () {
        wx.redirectTo({
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
            userInfo: app.globalData.userInfo
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
        this.setData({
            activeUnfinished: 'active',
            activeFinished: '',
            orders: this.data.histories_unfinished,
        })
        //获取订单列表
        var that = this;
        wx.request({
            url: app.globalData.host + '/histories',
            method: 'POST',
            data: {
                member_id: app.globalData.userId,
                subject_id: app.globalData.subjectId
            },
            success: function (res) {
                var histories_finished = res.data.data.finished;
                var histories_unfinished = res.data.data.unfinished;
                that.setData({
                    orders: histories_unfinished,
                    histories_unfinished: histories_unfinished,
                    histories_finished: histories_finished,
                });
            },
        });
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
        let that = this;
        wx.showNavigationBarLoading()
        //获取订单列表
        wx.request({
            url: app.globalData.host + '/histories',
            method: 'POST',
            data: {
                member_id: app.globalData.userId,
                subject_id: app.globalData.subjectId
            },
            success: function (res) {
                var histories_finished = res.data.data.finished;
                var histories_unfinished = res.data.data.unfinished;
                that.setData({
                    orders: histories_unfinished,
                    histories_unfinished: histories_unfinished,
                    histories_finished: histories_finished,
                });
            },
            fail: function () {
                wx.hideNavigationBarLoading() //完成停止加载
                wx.stopPullDownRefresh() //停止下拉刷新
            },
            complete: function () {
                wx.hideNavigationBarLoading() //完成停止加载
                wx.stopPullDownRefresh() //停止下拉刷新
            }
        });
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
        console.log(res);
        if (res.target.dataset.share_id) {
            var id = res.target.dataset.share_id;
            var This = this;
            console.log('/pages/home/home?order_id=' + id);
            return {
                title: This.data.userInfo.name + '赠送您一张测评卡，速来领取',
                path: '/pages/home/home?order_id=' + id,
                success:function (res) {
                    wx.request({
                        url: app.globalData.sendOrder.url + id,
                        method: app.globalData.sendOrder.method,
                        header: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + getApp().globalData._token
                        },
                        success:function (res) {
                            wx.showModal({
                                title: '提示',
                                content: res.data.message
                            })
                        }
                    });
                },
                fail:function (res) {
                    wx.showModal({
                        title: '提示',
                        content: '转发失败'
                    })
                }
            }
        }
    },
})