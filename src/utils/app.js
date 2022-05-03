import cookie from 'js-cookie'

const ua = window.navigator.userAgent.toLowerCase()
const { userAgent, platform } = navigator

const isMac = ['Mac68K', 'MacPPC', 'Macintosh', 'MacIntel'].includes(platform)
const isWin = ['Win32', 'Windows'].includes(platform)
function isWebview() {
  var useragent = navigator.userAgent
  var rules = [
    'WebView',
    '(iPhone|iPod|iPad)(?!.*Safari/)',
    'Android.*(wv|.0.0.0)',
  ]
  var regex = new RegExp(`(${rules.join('|')})`, 'ig')
  return Boolean(useragent.match(regex))
}

let safari = null
//判断是不是在iPhone的Safair浏览器打开的本页面
if (
  ua.indexOf('applewebkit') > -1 &&
  ua.indexOf('mobile') > -1 &&
  ua.indexOf('safari') > -1 &&
  ua.indexOf('linux') === -1 &&
  ua.indexOf('android') === -1 &&
  ua.indexOf('chrome') === -1 &&
  ua.indexOf('ios') === -1 &&
  ua.indexOf('browser') === -1
) {
  safari = true
} else {
  //alert("请使用iPhone中的Safari浏览器打开本页面！");
  safari = false
}

const systemInfo = {
  platform,
  styleType: cookie.get('styleType') || 'light',
  language: cookie.get('language') || 'en',
  getLanguage: () => cookie.get('language') || 'en',
  isMac,
  isWin,
  isWX: ua.match(/MicroMessenger/i) == 'micromessenger' ? true : false,
  pc: isMac || isWin,
  ios: !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
  android: userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1, //android终端
  ipad: userAgent.indexOf('iPad') > -1, //是否iPad
  iphone: userAgent.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
  iphoneX:
    /iphone/gi.test(window.navigator.userAgent) &&
    window.devicePixelRatio !== 0 &&
    window.devicePixelRatio === 3 &&
    window.screen.width === 375 &&
    window.screen.height === 812,
  safari, // 判断是否为iphone 内置 safari
  isWebview: isWebview(),
}

export default systemInfo
