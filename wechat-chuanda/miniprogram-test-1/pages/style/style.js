// pages/yxts/index.js
var util = require("../../utils/util.js")
Page({
  data: {
    girlImg: ''
  },
  tiaozhuan: function (e) {
    var id = e.currentTarget.dataset['index']
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },
  onLoad: function (e) {
    this.setData({
      girlImg: util.girlImg
    })
    var self = this
    wx.showLoading({
      title: "加载中"
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
  }
})