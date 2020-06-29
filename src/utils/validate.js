/* 电话号码验证 */
export function validatePhone(str) {
  const reg = /^1[3456789]\d{9}$/;
  return reg.test(str);
}

/* 验证码验证 */
export function validateCode(str) {
  const reg = /^[A-Za-z0-9]{1,}$/;
  return reg.test(str);
}

/* 整数验证 */
export function validateInteger(str) {
  const reg = /^[0-9]*[1-9][0-9]*$/;
  return reg.test(str);
}

/* 正数验证 */
export function validatePositiveNum(str) {
  const reg = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
  return reg.test(str);
}

/* 两位小数验证 */
export function validateTwoDecimalPlaces(str) {
  const reg = /^\d*(\.?\d{0,2})/;
  return reg.test(str);
}

/* 银行卡号验证 */ 
export function validataBankAccount(str){
  const reg = /^([1-9]{1})(\d{14}|\d{18}|\d{15}|\d{16})$/;
  return reg.test(str)
}

/* 邮箱验证 */ 
export function validataEmail(str){
  const reg = /^([-_a-zA-Z0-9\u4e00-\u9fa5\.])+@([-_a-zA-Z0-9])+(\.[a-zA-Z]{2,5}){1,3}$/;
  return reg.test(str)
}


/**
 * 车牌号校验
 * @param {string} email
 * @returns {Boolean}
 */
export function pattPlateNumber(str) {
  let regex =  /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/;
  if (regex.test(str)) {
    return true
  }else{
    return false
  }
}