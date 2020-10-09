//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js")
Page({
  data: {
    weburl: "https://www.cicigirl.com/#/",
    webstate: 0
  },
  onLoad: function () {
      var self=this;
      wx.request({
        url: util.uri,
        success:res=>{
          self.setData({
            webstate:res.data.state,
            weburl:res.data.url
          })
        }
      })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
