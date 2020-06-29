/**
 * DATEFORMAT
 * 日期格式化(YMDH、MDH、MD)
 */

export function dateFormat(value, type) {
  if (!value) {
    return "";
  }
  value = value.replace(/-/g, "/")
  let date = new Date(value);
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  let h = date.getHours();
  let mm = date.getMinutes();
  let s = date.getSeconds();
  switch (type) {
    case "YMD": {
      let ymdString = y + "-" + m + "-" + d;
      return ymdString;
    }
    case "YMDH": {
      let ymdhString = y + "-" + appendZero(m) + "-" + appendZero(d) + " " + appendZero(h) + ":" + appendZero(mm);
      return ymdhString;
    }
    case "MDH": {
      let mdhString = m + "-" + d + " " + h + ":" + mm;
      return mdhString;
    }
    case "MD": {
      let mdString = m + "-" + d;
      return mdString;
    }
    case "HMS": {
      let mdString = h + "-" + mm + "-" + s;
      return mdString;
    }
  }
}

/**
 * 补零
 * @method appendZero
 * @param val {String}
 */
export const appendZero = function(val) {
  return val = parseInt(val) < 10 ? "0" + val : val
}

/**
 * hideIdentityCard
 * 身份证掩码
 */

export function hideIdentityCard(value) {
  if (!value) return ''
  return value.replace(/^(.{6})(?:\w+)(.{6})$/, "$1******$2")
}
