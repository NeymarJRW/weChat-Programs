var util = require("../../utils/util.js")
Page({
  data: {
    girlImg: '',
  }, 
  tiaozhuan: function (e) {
    var id = e.currentTarget.dataset['index']
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },
  onLoad: function (e) {
    var self = this
    wx.showLoading({
      title: "加载中"
    })
    this.setData({
      girlImg: util.girlImg
    })
    wx.request({
      url: util.uriS,
      success: res => {
        setTimeout(function () {
          self.setData({
            pageState: true
          })
          wx.hideLoading()
        }, 500)
      }
    })
  },
  oneTap() {
    var self = this
    this.setData({
      child: 1,
      adult: 0,
    })
  },
  twoTap() {
    var self = this
    this.setData({
      child: 0,
      adult: 1,
    })
  },
})