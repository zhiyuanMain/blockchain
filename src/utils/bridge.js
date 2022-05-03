import { Dialog, Locale } from 'vant'
import cookie from 'js-cookie'

//setupWebViewJavascriptBridge执行的时候传入的参数，这是一个方法。
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(window.WebViewJavascriptBridge)
  } else {
    document.addEventListener(
      'WebViewJavascriptBridgeReady',
      function() {
        callback(window.WebViewJavascriptBridge)
      },
      false
    )
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
    const WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'https://__bridge_loaded__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function() {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  }
}

export function call(name, data, callback) {
  console.warn('bridge-call', { name, data, callback })
  if (typeof callback === 'function') register(`bridge_${name}_callback`, data, callback)
  try {
    window.ReactNativeWebView.postMessage(JSON.stringify({name,params:data}))
  } catch (error) {
    console.log('WKWebView post message')
  }
}

// 注册回调
export function register(name, sendData, callback) {
  console.warn('bridge--register', { name, sendData, callback })
  if ($app.default.ios) {
    window[name] = function(data, responseCallback) {
      setTimeout(() => {
        console.warn('register data >', data)
        callback ? callback(data) : ''
        responseCallback(sendData)
      }, 0)
    }
  } else {
    setupWebViewJavascriptBridge(function(bridge) {
      //此处try catch注意  android 有init初始化方法，必须调用 不调用后续注册的事件将无效 而IOS却没有init方法 调用会报错 所以得捕获异常
      try {
        bridge.init(function(data, responseCallback) {
          responseCallback(sendData)
          callback ? callback(data) : ''
        })
      } catch (err) {
        console.warn(err)
      }
      bridge.registerHandler(name, function(data, responseCallback) {
        responseCallback(sendData)
        callback ? callback(data) : ''
      })
    })
  }
}

/**
 * 返回上一页
 */
export function back() {
  if ($app.default.pc) {
    history.back()
  } else {
    call('back')
  }
}

// 购买
export function goPurchase(params = {}){
    call('goPurchase',params)
}

// 下载图片链接
export function getSharePicture(params = {}){
  call('getSharePicture',params)
}

// 去登陆
export function goLogin(params = {}){
  call('goLogin', params)
}
// 去注册
export function goRegister(params = {}){
  call('goRegister', params)
}
export function goBalance(params = {}){
  call('goBalance',params)
}
export function goSelect(params = {}){
  call('goSelect',params)
}
export function goSpeedCardst(params = {}){
  call('goSpeedCardst',params)
}
export function goSettingInfo(params = {}){
  call('goSettingInfo',params)
}
export function goSettingGoogle(params = {}){
  call('goSettingGoogle',params)
}
