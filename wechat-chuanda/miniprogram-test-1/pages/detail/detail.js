//index.js
//获取应用实例
const app = getApp()
var util = require("../../utils/util.js")
Page({
  data: {
    title:'',
    content:'',
    girlImg: '',
    item:''
  },

  onShareAppMessage: function (res) {
    var that = this;
    var girl_id = that.data.item;//获取产品id
    var girl_title = that.data.title;//获取产品标题
    console.log(girl_id)
    console.log(girl_title)

    if (res.from === 'button') {
      // 来自页面内转发按钮
      return {
        title: girl_title,
        path: '/pages/detail/detail?id='+girl_id,
      }
    }
  },
  backlast:function(){
    wx:wx.navigateBack({
      delta: 1,
    })
  },
  onLoad: function (option) {
    var id=option.id
    this.setData({
      girlImg: util.girlImg,
      item:id
    })
var self=this;
    wx.request({
      url: util.girlData,
      success: res => {

        self.setData({
          title: res.data[id - 1].title,
          content: res.data[id - 1].content,
        })
      }
    })
  }
})
