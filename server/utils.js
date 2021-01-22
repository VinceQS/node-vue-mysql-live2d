// 2020/05/05 12:12:12
function getTime() {
  const now = new Date()
  const Y = now.getFullYear()
  const M = (now.getMonth() + 1) > 9 ? (now.getMonth() + 1) : '0' + (now.getMonth() + 1)
  const D = now.getDate()
  const h = now.getHours()
  const m = now.getMinutes()
  const s = now.getSeconds()

  return Y + '/' + M + '/' + D + ' ' + h + ':' + m + ':' + s
}

function getRepeat(arr, cookie) {
  let find = false
  if (arr.length !== 0) {
    arr.forEach(element => {
      if (element.cookie === cookie) {
        find = true
      }
    })
  }
  return find
}
const fn = {
  getTime,
  getRepeat
}

module.exports = fn
