//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        imgUrls: [
            '/demo/swiper.gif',
            '/demo/swiper-002.gif'

        ],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000
    },

    onLoad: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        return {
            title: '我正在使用基石测评，您也来吧-首页',
            path: '/pages/index/index'
        }
    }
})
