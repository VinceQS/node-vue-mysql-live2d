const func = {
  transformTime: function(data) {
    function handleDate(time) {
      const date = new Date(time);
      let Y = date.getFullYear();
      let M =
        date.getMonth() + 1 < 10
          ? "0" + parseInt(date.getMonth() + 1)
          : date.getMonth() + 1;
      let D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      let H = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      let m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      const newTime = Y + "-" + M + "-" + D + " " + H + ":" + m + ":" + s;
      return newTime;
    }
    for (let i = 0, len = data.length; i < len; i++) {
      data[i].create_time = handleDate(data[i].create_time);
    }
    return data;
  },
  getName: function() {
    console.log("aaa");
  }
};
module.exports = func;
