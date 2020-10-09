const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const uri = "https://www.cicigirl.com/Public/json/data1.json"

const uriS = "https://www.cicigirl.com/Public/json/s.json"


module.exports = {
  formatTime: formatTime,
  uri: uri,
  uriS: uriS
}
