//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js")
Page({
  data: {
    curitem: "",
    lists: [],
    datas: [],
    page: 2,
    bottomLine: false,
    weburl: "",
    webstate: null,
    bottomLine: false,
    state: null
  },
  //事件处理函数
  itemTap: function (e) {
    wx.showLoading()
    var self = this
    this.setData({
      curitem: e.currentTarget.dataset.index,
      page: 2,
      bottomLine: false
    })
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 0
    })
    this.getData(e.currentTarget.dataset.index, 1)
  },
  dataTap: function (e) {
    var self = this
    var dataset = e.currentTarget.dataset
    wx.navigateTo({
      url: `../detailed/index?id=${dataset.id}&des=${dataset.des}&url=${dataset.url}&name=${dataset.name}`
    })
  },
  getData(index, limit) {
    var self = this
    wx.request({
      url: `https://www.cicigirl.com/Public/json/lists${index + 1}.json`,
      success(res) {
        wx.hideLoading()
        wx.stopPullDownRefresh()
        self.setData({
          datas: res.data.msg
        })
      }
    })
  },
  onLoad: function () {
    wx.showShareMenu({
      withShareTicket: true
    })
    var self = this
    self.setData({
      curitem: 1
    })
    wx.request({
      url: util.uri,
      success: res => {
        self.setData({
          weburl: res.data.url,
          state: res.data.state,
          banCity: res.data.city
        })
        if(res.data.state === 1) {
          wx.request({
            url: 'https://pv.sohu.com/cityjson?ie=utf-8',
            success: res => {
              if(res.data) {
                if (res.data.match(/{.+}/g)[0]) {
                  var city = JSON.parse(res.data.match(/{.+}/g)[0])
                  if (self.data.banCity.indexOf(city.cname) > -1) {
                    self.setData({
                      webstate: 0
                    })
                    self.getList()
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
        if(res.data.state === 0) {
          self.setData({
            webstate: res.data.state
          })
          self.getList()
        }
      }
    })
  },
  onReachBottom: function (e) {

  },
  getList: function() {
    var self = this
    wx.request({
      url: "https://www.cicigirl.com/Public/json/list.json",
      success(res) {
        console.log(res.data)
        if (res.data.code === 200) {
          var dataList = res.data.msg
          self.setData({
            lists: dataList,
            curitem: dataList[0].id
          })
          wx.request({
            url: `https://www.cicigirl.com/Public/json/lists${dataList[0].id + 1}.json`,
            success(res) {
              if (res.data.code === 200) {
                self.setData({
                  datas: res.data.msg
                })
              }
            }
          })
        }
      }
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
