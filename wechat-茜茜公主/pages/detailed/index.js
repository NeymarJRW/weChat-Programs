//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [],
    listdes: "",
    listname: "",
    swiperIndex: 0,
    imgheights: []
  },
  onPreview: function(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: [e.currentTarget.dataset.url]
    })
  },
  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  },
  //事件处理函数
  onLoad: function (e) {
    var self = this
    wx.showShareMenu({
      withShareTicket: true
    })
    var imgs = e.url.split(",")
    this.setData({
      imgUrls: imgs,
      listdes: e.des,
      listname: e.name,
    })
  },
  imageLoad(e) {
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      ratio = imgwidth / imgheight;
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },  
  bindchange(e) {
    this.setData({
      swiperIndex: e.detail.current
    })
  }
})