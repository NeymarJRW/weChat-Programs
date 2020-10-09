//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js")
Page({
  data: {
    content: {}
  },
  onLoad: function (option) {
    wx.showLoading({
      title: '加载中',
    })
    var self = this
    wx.request({
      url: util.uriS,
      success: res => {
        self.setData({
          content: res.data[Number(option.id)]
        })
        wx.hideLoading()
      }
    })
  }
})
