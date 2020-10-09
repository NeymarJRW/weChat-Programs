// pages/np/index.js
var util = require("../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    girlImg: '',
  },
  tiaozhuan: function (e) {
    var id = e.currentTarget.dataset['index']
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      girlImg: util.girlImg
    })
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