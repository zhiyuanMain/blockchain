import { BigNumber } from 'bignumber.js'
import Vue from 'vue'
import i18n from '@/langs'
import cookie from 'js-cookie'
const moment = require('moment-timezone')
// 设置当前时区为韩国首尔时间
moment.tz.setDefault("Asia/Seoul")

Vue.prototype.$moment = moment


// 资金展示 + $1999
export function ups_and_downs_symbol_num(value) {
  const c = window.$root.$store.state.common.currency.showValue
  let s = ''
  console.log('value', typeof value)
  if (value) {
    let v = ''
    if (value && Number(value) > 0) {
      v = value
      s = '+ ' + c + v
    }
    if (value && Number(value) < 0) {
      v = value.substring(1)
      s = '- ' + c + v
    }
    if (Number(value) === 0) {
      v = '0'
      s = '' + c + v
    }
  }
  return s
}

// 小数保留位数 不补零
export function decimal(value,len=6) {
  if(value !== null && value !== ''){
    return new BigNumber(Number(value)).decimal(len).toNumber()
  }
  if(value === 0){
    return '0'
  }
  return ''
}
// 小数补零
export function changeDecimalBuZero(number, bitNum) {
  /// <summary>
  /// 小数位不够，用0补足位数
  /// </summary>
  /// <param name="number">要处理的数字</param>
  /// <param name="bitNum">生成的小数位数</param>
  var f_x = parseFloat(number);
  if (isNaN(f_x)) {
      return 0;
  }
  var s_x = number.toString();
  var pos_decimal = s_x.indexOf('.');
  if (pos_decimal < 0) {
      pos_decimal = s_x.length;
      s_x += '.';
  }
  while (s_x.length <= pos_decimal + bitNum) {
      s_x += '0';
  }
  console.log('s_x',s_x)
  return s_x;
}
// 掩码
export function toMask(str) {
  if (!str) {
    return ''
  }
  let s = str
  let st = s.substring(0, 4)
  let sb = s.substring(s.length - 4)
  return st + '**' + sb
}
/**
 * 时间戳转换成日期
 * @param {\} v 时间戳
 * @param {*} format 格式化日期  注意区分大小写！ 日期：大写   时分秒:小写   HH:24小时制 hh:12小时制
 */
export function formatTime(v, format = 'YYYY.MM.DD HH:mm:ss') {
  if (v) {
    return moment(v).format(format)
  }
  return '-'
}


// 根据交易类型 转换成 + -
export function transTypeToSymbol (v) {
  if (v) {
    let s = ''
    switch (v) {
      case 'D': // 充币
        s = '+'
        break
      case 'C': // 提币
        s = '-'
        break
    }
    return s
  }
  return v
}

// 根据正负数 转换成 + -
export function transNumberSymbol(v){
  if(v !== null || v){
    return Number(v) >= 0 ? '+' : '-'
  }
  return ''
}

// 根据交易类型返回相应的文案
// export function transTypeLabel(v) {
//   if (v) {
//     let s = ''
//     switch (v) {
//       case 'deposit': // 充币
//         s = i18n.t('utils/filters.deposit')
//         break
//       case 'withdraw': // 提币
//         s = i18n.t('utils/filters.withdraw')
//         break
//       case 'sell': // 买入
//         s = i18n.t('utils/filters.sell')
//         break
//       case 'income': // 收益
//         s = i18n.t('utils/filters.income')
//         break
//     }
//     return s
//   }
//   return v
// }
// 会根据订单状态返回相应的文案
export function tranStateLabel(v) {
  //0已创建，1处理中，2成功，3失败
  let s = ''
  switch (v) {
    case 1:
      s = i18n.t('filters.ing')
      break
    case 3:
      s = i18n.t('filters.order')
      break
  }
  return s ? s : '-'
}
// 交易状态  提币
export function tranStateWithdraw(v){
  // CREATED(0, "待打款"),
  // IN_PAYMENT(1, "待打款"),
  // SUBMIT(2, "打款中"),
  // SUCCESS(3, "已打款")
  let s = ''
  switch (v) {
    case 0:
      s = i18n.t('filters.pending-payment')
      break
    case 1:
      s = i18n.t('filters.pending-payment')
      break
    case 2:
      s = i18n.t('filters.making-money')
      break
    case 3:
      s = i18n.t('filters.payment')
      break
  }
  return s ? s : '-'
}

// 根据订单状态返回相应的文案
export function orderStateLabel(v) {
  // 0-已创建，1-支付成功，2-失败，3-已结束
  let s = '-'
  switch (v) {
    case 0:
      s = i18n.t('filters.pending-order')
      break
    case 1:
      s = i18n.t('filters.execute-order')
      break
    case 2:
      s = i18n.t('filters.error')
      break
    case 3:
      s = i18n.t('filters.order')
      break
  }
  return s
}




//将科学计数法转换为小数
export const toNonExponential = (num) => {
  console.log('num',num)
  if(num){
    var m = Number(num).toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
    return Number(num).toFixed(Math.max(0, (m[1] || '').length - m[2]))
    }
}


// 根据时间戳 转换成还有几天到期
export function dateOut (v) {
  if (v) {
    // 获取当前时间 时间戳 转换成9时区时间戳
    // let nowTime = formatTime(new Date().getTime(),'YYYY.MM.DD HH:mm:ss')
    // 获取后台到期时间时间戳
    let start = new Date().getTime()
    let end = moment(v).valueOf()
    let day = BigNumber(end).minus(start).div(86400000).decimal(6).toNumber()
    return day >= 0 ? Math.ceil(day) || 1 : '0'
  }
  return null
}

// 千分位
export const splitK = num => {
  let decimal = String(num).split('.')[1] || ''; //小数部分
  let tempArr = [];
  let revNumArr = String(num)
    .split('.')[0]
    .split('')
    .reverse(); //倒序
  for (let i in revNumArr) {
    tempArr.push(revNumArr[i]);
    if ((i + 1) % 3 === 0 && i != revNumArr.length - 1) {
      tempArr.push(',');
    }
  }
  let zs = tempArr.reverse().join(''); //整数部分
  return decimal ? zs + '.' + decimal : zs;
};

