import { lStorage } from "@/utils/storage.js";

/**
 * 参数合并
 * 使用：merge({title: '标题'}, options)
 * @param {*} target
 */
export const merge = target => {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i];
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }
};

/**
 * 根据字段获取url参数
 * @method getQueryString
 * @param name {String}
 */
export const getQueryString = function(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg)
    ? window.location.search.substr(1).match(reg)
    : window.location.hash
        .substr(window.location.hash.indexOf("?") + 1)
        .match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

/**
 * 判断对象是否相同
 * @method diff
 * @param obj {Object}
 */
export const diff = function(obj1, obj2) {
  var o1 = obj1 instanceof Object;
  var o2 = obj2 instanceof Object;
  if (!o1 || !o2) {
    // 判断不是对象
    return obj1 === obj2;
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  for (var attr in obj1) {
    var t1 = obj1[attr] instanceof Object;
    var t2 = obj2[attr] instanceof Object;
    if (t1 && t2) {
      return diff(obj1[attr], obj2[attr]);
    } else if (obj1[attr] !== obj2[attr]) {
      return false;
    }
  }
  return true;
};

/**
 * 时间格式化
 * @method FormatTime
 * @param str {String} 2019-08-01
 */
export const FormatTime = function(str, type) {
  if (typeof str !== "string" || str === "") return;
  let array = str.split(" ");
  let date = (array[0] || "").split("-");
  let time = (array[1] || "").split(":");
  let y = parseInt(date[0] || 0);
  let M = parseInt(date[1] || 0);
  let d = parseInt(date[2] || 0);
  let h = parseInt(time[0] || 0);
  let m = parseInt(time[1] || 0);
  let s = parseInt(time[2] || 0);
  switch (type) {
    case "YMD":
      let ymdString = `${y}年${M}月${d}日`;
      return ymdString;
    case "YMDHMS":
      let ymdhmsString = `${y}年${M}月${d}日 ${h}时${m}分${s}秒`;
      return ymdhmsString;
    case "Date":
      return {
        y: y,
        M: M,
        d: d,
        h: h,
        m: m,
        s: s
      };
  }
};

/**
 * 日期格式化
 * @method FormatDate
 * @param val {String} 2019-08-01 10:01:01
 */
export const FormatDate = function(val, type) {
  console.log('date', val)
  let date = new Date(val);
  let y = date.getFullYear()
  let M = date.getMonth() + 1
  let d = date.getDate()
  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()
  switch (type) {
    case "YMD":
      let ymdString = `${y}-${appendZero(M)}-${appendZero(d)}`;
      return ymdString;
    case "HMS":
      let hmsString = `${appendZero(h)}:${appendZero(m)}:${appendZero(s)}`;
      return hmsString;
    case "Date":
      return {
        y: y,
        M: M,
        d: d,
        h: h,
        m: m,
        s: s
      };
  }
};

/**
 * 日期补零
 * @method appendZero
 * @param val {String}
 */
export const appendZero = function(val) {
  return val = val < 10 ? "0" + val : val
}
