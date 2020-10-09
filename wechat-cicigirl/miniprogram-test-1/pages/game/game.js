// pages/yxts/index.js
var util = require("../../utils/util.js")
Page({
  data: {
    pageState: false
  },
  onLoad: function (e) {
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