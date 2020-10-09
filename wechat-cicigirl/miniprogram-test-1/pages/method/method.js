// pages/np/index.js
var util = require("../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    wx.request({
      url: util.uriS,
      success: res => {
        self.setData({
          lists: res.data
        })
      }
    })
  }
})