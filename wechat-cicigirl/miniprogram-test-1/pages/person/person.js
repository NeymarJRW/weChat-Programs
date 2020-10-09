var util = require("../../utils/util.js")
Page({
  data: {
    child: 1,
    adult: 0,
    ds: 0,
    url: "./imgs/1.png",
    urltext: [
      [
        "身体就像一棵小树，四肢就像刚长出的小树枝。他瘦瘦的身体却撑着一个大大的脑袋，真让人担心弱小的身体能撑的住吗,"
      ],
      [
        ""
      ],
      [
        "他的脸白白的，最引人注目的要属他那双水汪汪的大眼睛了，瞪得圆圆的，有时候真能让人想起西游记中孙悟空的火眼金睛。人们都说：“眼睛是心灵的窗户。”他那大大的脑袋中装满了丰富的知识让人羡慕。他还有一张灵巧的小嘴，红红的，他唱出来的歌非常动听呢！"
      ]
    ],
    curtext: [
      "身体就像一棵小树，四肢就像刚长出的小树枝。他瘦瘦的身体却撑着一个大大的脑袋，真让人担心弱小的身体能撑的住吗,"
    ],
    urlimg: "./imgs/lh_zsboy.png",
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
  },
  oneTap() {
    var self = this
    this.setData({
      child: 1,
      adult: 0,
    })
  },
  twoTap() {
    var self = this
    this.setData({
      child: 0,
      adult: 1,
    })
  },
})