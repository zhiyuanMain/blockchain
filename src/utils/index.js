import cookie from 'js-cookie'
import CallApp from 'callapp-lib';
import { BigNumber } from 'bignumber.js'
import i18n from '@/langs'
import router from '@/router'
import store from '@/store'
import {Toast} from 'vant'
import moment from 'moment-timezone'

/**
 * 中划线转驼峰
 * @param {String} str
 * @param {Boolean} c 首字母是否大写
 */
export function toCamel(str, c) {
  let strH = str.replace(
    /([^-])(?:-+([^-]))/g,
    (_, $1, $2) => $1 + $2.toUpperCase()
  )
  if (c) strH = strH.slice(0, 1).toUpperCase() + strH.slice(1)
  return strH
}
/**
 * 函数节流
 * @param {Function} fn
 * @param {number} wait
 */
export function throttle(fn, wait = 1000) {
  let pre = Date.now()
  return function() {
    let context = this
    let args = arguments
    let now = Date.now()
    if (now - pre >= wait) {
      fn.apply(context, args)
      pre = Date.now()
    }
  }
}
/**
 * 函数防抖
 * @param {Function} fn
 * @param {number} wait
 */
export function debounce(fn, wait = 1000) {
  let timer = null
  return function() {
    let context = this
    let args = arguments
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
    timer = setTimeout(function() {
      fn.apply(context, args)
    }, wait)
  }
}

// 设置语言
export function setLanguage(lang) {
  cookie.set('language', lang)
  // 清除
  const query = getQuery()
  // 如果存在search的时候
  if(JSON.stringify(query) !== '{}'){
    // 判断有没有 language，如果有清除 language
    let url = location.origin + location.pathname + '?'
    const {language} = query
    if(language){
      Object.keys(query).forEach(key => {
        if(key !== 'language'){
          url += key +'=' + query[key] + '&'
        }
      })
      url = url.slice(0,url.length-1)
      console.log(url)
      window.location.href = url
    } else {
      location.reload()
    }
  } else {
    location.reload()
  }
}
/**
 * 倒计时
 * @param {Function} call 倒计时每秒调用一次的函数用于获取当前时间
 * @param {Function} endCall 倒计时结束时调用
 * @param {number} time 秒
 */
export function timeout(call, endCall, time = 60) {
  let t = null
  let mt = time
  call(mt)
  t = setInterval(() => {
    if (mt > 1) {
      mt--
      call(mt)
    } else {
      endCall(0)
      clearInterval(t)
    }
  }, 1000)
}

/**
 * 获取token
 */
export function getToken() {
  return cookie.get('token') || ''
}

/**
 * 登出
 */
export function logout(call) {
  cookie.remove('token')
  localStorage.clear()
  call ? call() : ''
}

/**
 * 返回下一个月
 * @param {*} t Date 格式月份
 */
export function nextMonth(t) {
  let selectTime = t
  let year = selectTime.getFullYear()
  let month = selectTime.getMonth()
  // 获取下个月时间
  if (month === 11) {
    year = year + 1
    month = 1
  } else {
    month = month + 2
  }
  return new Date(`${year}/${month}`)
}




// 分钟倒计时
export const handleCountdown = (value) => {
  if (value && value > 0) {
    // 天
    let day = Math.floor(value / (24 * 60 * 60))
    //小时
    const hours = Math.floor((value / 60 / 60) % 24)
    //分钟
    const minutes = Math.floor((value / 60) % 60)
    //秒
    const seconds = Math.floor(value % 60)
    const time = (v) => (v >= 10 ? v : `0${v}`)
    const textTime =
      time(day) + ' ' + time(hours) + ':' + time(minutes) + ':' + time(seconds)
    return textTime
  } else if (!value || value < 0) {
    return false
  }
}
// 账户余额数据重组
export const getBalanceList = (arr, key = 'debit') => {
  if (arr.length) {
    let newArr = []
    arr.forEach((item, idx) => {
      item.balanceList.forEach((child) => {
        const { accountType, coinType, oid, state, coinTypeLabel } = item
        if (child.balanceType === key) {
          newArr.push({
            accountType,
            coinType,
            oid,
            state,
            ...child,
            coinTypeLabel,
          })
        }
      })
    })
    return newArr
  }
  return arr
}

//将科学计数法转换为小数
export const toNonExponential = (num) => {
  var m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/)
  return num.toFixed(Math.max(0, (m[1] || '').length - m[2]))
}

// 获取浏览器当前语言环境
export const getLanguage = () => {
  let lang = navigator.language.toLowerCase()
  lang = lang.substr(0, 2) //截取lang前2位字符
  console.log('lang-->', lang)
  if (lang.indexOf('zh') >  -1) {
    return 'zh_CN'
  } else if (lang === 'ko') {
    return 'ko'
  } else if (lang === 'en') {
    return 'en'
  } else {
    return 'en'
  }
}
// 获取 url 参数
export function getQuery() {
  // debugger
  const query = {}
  const { search } = window.location
  search
    .substr(1)
    .split('&')
    .forEach(str => {
      const strArr = str.split('=')
      query[strArr[0]] = decodeURIComponent(strArr[1])
    })
  return query
}


const {VUE_APP_ANDROID_PACKAGE_NAME} = process.env
const options = {
  scheme: {
    protocol: 'bmining'
  },
  outChain: {
    protocol: 'bmining',
    path: 'innowealtha/main',
    key: 'bmining'
  },
  timeout:1000,
  intent: {
    package: VUE_APP_ANDROID_PACKAGE_NAME,
    scheme: 'bmining'
  },
  // fallback:'/download'
  // appstore: 'http://www.pgyer.com/zh1n',
  // yingyongbao: 'https://www.pgyer.com/nps2',
}
const {
  default: { ios, android ,safari},
} = $app
const { isWebview } = $app.default
// 下载安装页 唤醒app  ios直接跳testflight
export function openApp(param = {}){
  const callLib = new CallApp(options);
  console.log('intent',callLib.generateIntent({path: 'bmining'}))
  console.log(callLib.generateScheme({path: 'bmining'})); 
  // intent://profile#Intent;package=com.youku.shortvideo;scheme=ykshortvideo;S.browser_fallback_url=https%3A%2F%2Fdianliu.youku.com%2Fservice%2Fdownload;end;
  console.log(callLib.generateIntent({path: 'bmining'})); 
  // https://flash-link.youku.com?action=profile
  console.log(callLib.generateUniversalLink({path: 'bmining'}));

  if(ios){
    location.href = 'https://testflight.apple.com/join/bqvY3oro'
    return false
  }
  // 判断是否webview
  if (android && isWebview) {
    store.commit('common/updateMask',true)
    return false
  }
  callLib.open({callback:() => {
    if (android) {
      location.href =
        'https://bms3-public01.s3-ap-southeast-1.amazonaws.com/Application/download/android/Bmining.apk'
    }
  },...param});
}

// 安卓 ios直接先唤醒app
export function openAppOther(param = {}){
  // 判断是否webview
  console.log('$app',$app)
if (android && isWebview) {
  store.commit('common/updateMask',true)
  return false
}
if(isWebview || (ios && !safari) ){
  store.commit('common/updateMask',true)
  return false
}
  const callLib = new CallApp(options);
  console.log('intent',callLib.generateIntent({path: 'bmining'}))
  console.log(callLib.generateScheme({path: 'bmining'})); 
  // intent://profile#Intent;package=com.youku.shortvideo;scheme=ykshortvideo;S.browser_fallback_url=https%3A%2F%2Fdianliu.youku.com%2Fservice%2Fdownload;end;
  console.log(callLib.generateIntent({path: 'bmining'})); 
  // https://flash-link.youku.com?action=profile
  console.log(callLib.generateUniversalLink({path: 'bmining'}));
  callLib.open({callback:() => {
    if (ios) {
      // 判断是否是内置safari 如果不是弹出提示用原生浏览器打开
      if (safari) {
        router.push({name:'download'})
      } else {
        Toast(i18n.t('download.tip'))
      }
    }
    if (android) {
      location.href =
        'https://bms3-public01.s3-ap-southeast-1.amazonaws.com/Application/download/android/Bmining.apk'
    }
  },...param});
}

// 订单实际价格计算公式
export const getPayAmount = ({
  priceBase,
  discount,
  count = 1,
  period = 1,
}) => {
  if (!priceBase || !count) {
    return
  }
  //  金额=天数 * 算力 * priceBase * (1-discount)
  return new BigNumber(period)
    .multipliedBy(count)
    .multipliedBy(priceBase)
    .multipliedBy(1 - discount)
    .toNumber()
}
export const getMonth = (index) => {
  const beginCreatedTime = moment()
    .subtract(index, 'months')
    .valueOf()
  const endCreatedTime = new Date().getTime()
  return { beginCreatedTime, endCreatedTime }
}

/*空值验证*/
export const nullCheck = obj => {
  return (
    obj == null ||
    undefined == obj ||
    obj.length <= 0 ||
    typeof obj === 'undefined'
  );
};
