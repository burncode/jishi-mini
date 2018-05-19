// pages/ceping/user-form.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        tel: '',
        address: '',
        sex: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData(getApp().globalData.userInfo);
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

    },
    onSubmit: function (e) {
        var This = this;

        console.log(this.data.name);
        var data = e.detail.value;
        data.sex = This.data.sex;
        console.log(data);
        wx.request({
            url: getApp().globalData.users_update.url, //仅为示例，并非真实的接口地址
            method: getApp().globalData.users_update.method,
            data: data,
            header: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + getApp().globalData._token
            },
            success: function (res) {
                console.log(res);
                if (res.statusCode === 200) {
                    getApp().globalData.userInfo.name = res.data.name;
                    getApp().globalData.userInfo.tel = res.data.tel;
                    getApp().globalData.userInfo.address = res.data.address;
                    getApp().globalData.userInfo.sex = res.data.sex;
                    wx.showModal({
                        title: '提示',
                        content: res.data.message
                    })
                } else if (res.statusCode === 422) {
                    // console.log(res.data.errors);
                    console.log();
                    var obj = res.data
                    This.setData({
                        disabled: false
                    });
                    wx.showModal({
                        title: '提示',
                        content: res.data.errors[Object.keys(res.data.errors)[0]][0]
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data
                    })
                }
            },
            error: function () {
                wx.showModal({
                    title: '提示',
                    content: '提交失败'
                })
            }
        })
    },
    radioChange: function (e) {
        this.data.sex = e.detail.value;
    }
})