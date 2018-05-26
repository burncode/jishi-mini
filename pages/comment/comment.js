// pages/comment/comment.js
Page({
    goHome: function () {
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    onShareAppMessage: function () {
        return {
            title: '分享',
            path: '/pages/comment/comment'
        }
    },
    /**
     * 弹窗
     */
    showDialogBtn: function () {
        this.setData({
            showModal: true
        })
    },
    /**
     * 隐藏模态对话框
     */
    hideModal: function () {
        this.setData({
            showModal: false
        });
    },
    submit: function () {
        //提交到后台


        this.showDialogBtn()
    },
    //字数限制
    bindWordLimit: function (e) {
        var value = e.detail.value, len = parseInt(value.length);
        if (len > this.data.noteMaxLen) return;

        this.setData({
            currentNoteLen: len //当前字数
            //limitNoteLen: this.data.noteMaxLen - len //剩余字数
        });
    },
    // 星星点击事件
    starTap: function (e) {
        console.log(e)
        var index = e.currentTarget.dataset.index; // 获取当前点击的是第几颗星星
        var line = e.currentTarget.dataset.line; // 获取当前点击的是第几行
        var tempUserStars = this.data.userStars; // 暂存星星数组
        var len = tempUserStars[line].length; // 获取星星数组的长度

        var starTitleSelected = this.data.starTitleSelected;
        console.log(starTitleSelected);
        var starTitle = this.data.starTitle;
        console.log(starTitle);
        starTitleSelected[line] = starTitle[index];

        for (var i = 0; i < len; i++) {
            if (i <= index) { // 小于等于index的是满心
                tempUserStars[line][i] = '../../images/star_sel.png'
            } else { // 其他是空心
                tempUserStars[line][i] = '../../images/star_nor.png'
            }
        }
        // 重新赋值就可以显示了
        this.setData({
            userStars: tempUserStars,
            starTitle: starTitle,
            starTitleSelected: starTitleSelected
        })
    },
    /**
     * 页面的初始数据
     */
    data: {
        good_id: null,
        content: '',
        noteMaxLen: 80, //备注最多字数
        currentNoteLen: 0,
        userStars: [
            [
                '../../images/star_sel.png',
                '../../images/star_sel.png',
                '../../images/star_sel.png',
                '../../images/star_nor.png',
                '../../images/star_nor.png'
            ],
            [
                '../../images/star_sel.png',
                '../../images/star_sel.png',
                '../../images/star_sel.png',
                '../../images/star_nor.png',
                '../../images/star_nor.png'
            ],
            [
                '../../images/star_sel.png',
                '../../images/star_sel.png',
                '../../images/star_sel.png',
                '../../images/star_nor.png',
                '../../images/star_nor.png'
            ],

        ],
        starTypes: [
            {id: 1, title: "题目易懂性"},
            {id: 2, title: "结果准确性"},
            {id: 3, title: "建议实用性"},
        ],
        starTitle: [
            '差',
            '一般',
            '好',
            '很好',
            '极好',
        ],
        starTitleSelected: [
            '好',
            '好',
            '好'
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
        // 拿到guid
        console.log(option.id);
        let This = this;
        This.setData({
            good_id: option.id,
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