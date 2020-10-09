//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js")
Page({
  data: {
    weburl: "https://www.cicigirl.com/#/",
    webstate: 0,
    girlImg:'',
  },
  tiaozhuan:function(e){
    var id = e.currentTarget.dataset['index']
    wx.navigateTo ({
      url: '/pages/detail/detail?id='+id
    })  
  },
  onLoad: function () {
    this.setData({
      girlImg: util.girlImg
    })
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
    wx.request({
      url: util.uri,
      success: res => {
        self.setData({
          weburl: res.data.url,
          state: res.data.state,
          banCity: res.data.city
        })
        if (res.data.state === 1) {
          wx.request({
            url: 'https://pv.sohu.com/cityjson?ie=utf-8',
            success: res => {
              if (res.data) {
                if (res.data.match(/{.+}/g)[0]) {
                  var city = JSON.parse(res.data.match(/{.+}/g)[0])
                  if (self.data.banCity.indexOf(city.cname) > -1) {
                    self.setData({
                      webstate: 0
                    })
                  } else {
                    self.setData({
                      webstate: self.data.state
                    })
                  }
                }
              }
            }
          })
        }
        if (res.data.state === 0) {
          self.setData({
            webstate: res.data.state
          })
        }
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
