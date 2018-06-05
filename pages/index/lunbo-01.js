// pages/index/lunbo-01.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      guid:null
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
        // 拿到guid
        let This = this;
        This.setData({
          guid:option.guid
        });
        wx.request({
            url: getApp().globalData.getOneNews.url + option.guid,
            method: getApp().globalData.getOneNews.method,
            header: {
                'Accept': 'application/json',
            },
            success (res) {
                res.data.data.content= getApp().convertHtmlToText(res.data.data.content);
                This.setData(res.data.data);

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
            title: '专栏详情',
            path: '/pages/index/lunbo-01?guid=' + this.data.guid
        }
    }
})