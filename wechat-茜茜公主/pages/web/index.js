var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weburl: null
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var self = this
    wx.request({
      url: util.uri,
      success: res => {
        if (res.data["ad" + e.ad][0] > 0) {
          wx.redirectTo({
            url: "/pages/index/index"
          })
        } else {
          self.setData({
            weburl: res.data["ad" + e.ad][1]
          })
        }
      }
    })
  }
})