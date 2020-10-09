var util = require("../../utils/util.js")
Page({
  data: {
    imagePort: "",
    imageScreen: ""
  },
  onLoad: function (options) {
  
    var self = this
    let videoAd = null
    let interstitialAd = null
    let number = 0
    wx.request({
      url: util.uri,
      success: res => {
        self.setData({
          imagePort: res.data.images[0],
          imageScreen: res.data.images[1]
        })
        if(res.data.type === 1) {
          if (wx.createRewardedVideoAd) {
            videoAd = wx.createRewardedVideoAd({ adUnitId: res.data.adunit[0] })
            videoAd.onLoad(() => {
              if (number === 0) {
                videoAd.show().catch(() => {
                  // 失败重试
                  videoAd.load()
                    .then(() => videoAd.show())
                    .catch(err => {
                      console.log('激励视频 广告显示失败')
                    })
                })
                number++
              }
            })
            videoAd.onError((err) => {})
            videoAd.onClose((res) => {
              wx.navigateBack({ delta: 1 })
            })
          }
        }
        if(res.data.type === 2) {
          if (wx.createInterstitialAd) {
            interstitialAd = wx.createInterstitialAd({
              adUnitId: res.data.adunit[0]
            })
            interstitialAd.onLoad(() => {
              if (number === 0) {
                interstitialAd.show().catch((err) => {
                  console.error(err)
                })
                number++
              }
            })
            interstitialAd.onError((err) => { })
            interstitialAd.onClose(() => {
              wx.navigateBack({ delta: 1 })
            })
          }
        }
      }
    })
    
  }
})