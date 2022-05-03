import cookie from 'js-cookie'
// export default {
//   namespaced: true,
//   state: {
//     lang: cookie.get('language') || getLanguage(),
//     token: cookie.get('token'),
//     channel:cookie.get('channel') || 'web',
//       // 用户信息
//     userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
//     // 遮罩层
//     mask:false
//   },

//   mutations: {
//     updateLang(state, lang) {
//       state.lang = lang
//     },
//     updateToken(state,token){
//       state.token = token
//       cookie.set('token',token)
//     },
//     updateChannel(state,v){
//       state.channel = v
//       cookie.set('channel',v)
//     },
//     updateUserInfo(state, info = nul) {
//       state.userInfo = info
//       localStorage.setItem('userInfo', JSON.stringify(info))
//     },
//     updateMask(state,bool){
//       state.mask = bool
//     }
// console.log('$utils',$utils)
// import utils from '@/utils/index'
// console.log('utils',utils)
const state = () => ({
  // 语言
  lang: cookie.get('language') || getLanguage(),
  // lang
  // I18N 内当前加载语言
  langs:[],
  // 滚动距离顶部距离
  scrollTop: 0,
  token:cookie.get('token') || false,
  lastTop: 0,
  // 控制导航随左右滚动而滚动
  scrollLeft:0,
  // 防抖 scrollTop
  delayScrollTop:0,
  scrollDire: null,
  route: {},
  // 用户信息
  userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
  // 是否绑定GA
  isbinded: false, 
  // 账户左边导航默认选中 menuRouteName
  menuRouteName: localStorage.getItem('menuRouteName') || 'ac-index', 
  // 消息通知总条数
  messageNum:{}, 
  // 币价涨跌数据
  coinExchangeInfoList:[],
  // BTC实时币价 兑换USDT
  transferBtcToUsdt:0,
  // 根据query的channel当前是否为app
  channel:'pc',
  // 是否滚动到底部
  isBottom:false,
  // 可视区域高度
  viewHeight:0,
  // 滚动条高度
  scrollHeight:0,
  // 销售渠道查询
  saleChanTree:{},
  // 全局 骨架屏加载loading
  loading:true
})
const getters = {
  userInfo: state => {
    return state.userInfo
  }
}
const mutations = {
  updateLang(state, lang) {
    state.lang = lang
  },
  updateLangs(state,lang) {
    state.langs.push(lang)
  },
  updateToken(state,token){
    state.token = token
    cookie.set('token', token)
  },
  updateScrollTop(state, top) {
    state.scrollTop = top
  },
  updateScrollLeft(state, left){
    state.scrollLeft = left
  },
  updateDelayScrollTop(state,top){
    state.delayScrollTop = top
  },
  updateIsBottom(state,bool){
    state.isBottom = bool
  },
  updateViewHeight(state,h){
    state.viewHeight = h
  },
  updateScrollHeight(state,h){
    state.scrollHeight = h
  },
  updateLastTop(state, top) {
    state.lastTop = top
  },
  updateScrollDire(state, str){
    state.scrollDire = str
  },
  updateRoute(state, to) {
    state.route = to
  },
  updateUserInfo(state, info = nul) {
    state.userInfo = info
    localStorage.setItem('userInfo', JSON.stringify(info))
  },
  updateIsbinded(state, bool){
    state.isbinded = bool
  },
  updateMenuRouteName(state, key){
    state.menuRouteName = key
    localStorage.setItem('menuRouteName', key)
  },
  updateMessageNum(state,num){
    state.messageNum = num
  },
  updatesaleChanTree(state,data){
    // console.log('updatesaleChanTree',num)
    state.saleChanTree = data
  },
  updateCoinExchangeInfoList(state,list){
    state.coinExchangeInfoList = list
    list.forEach(item => {
      if(item.symbol === 'BTC'){
        state.transferBtcToUsdt = item.priceUsd
      }
    })
  },
  updateChannel(state,channel){
    state.channel = channel
  },
  updateLoading(state,bool){
    state.loading = bool
  }
}
const actions = {
  // 更新未读消息数
  actionsMessageNum({commit}, params = {msgType:null}){
    // return window.$api.fns.Message.countUnreadType(params).then(res => {
    //   commit('updateMessageNum',res)
    //   return Promise.resolve(res)
    // })
  },
   // 更新币种
   actionssaleChanTree({commit}, params = {channelCode:null}){
    return window.$api.fns.Shelves.saleChanTree(params).then(res => {
      commit('updatesaleChanTree',res)
      return Promise.resolve(res)
    })
  },
  // 更新用户信息
  actionsUserInfo({commit}, params = {}) {
    return window.$api.fns.Account.getCustomerProfile().then(res=> {
      commit('updateUserInfo',res)
      return Promise.resolve(res)
    }).catch(res => {
      return Promise.reject(res)
    })
  },
  // 更新 二次认证
  actionsIsbinded({commit},params = {}){
    return window.$api.fns.Ga.isbinded().then(res => {
      commit('updateIsbinded', res)
      return Promise.resolve(res)
    })
  },
  // 更新语言
  actionsLang({commit},params = {}){
    return window.$api.fns.Account.customerLanguage().then(res => {
      commit('updateLang',res.prefValue)
      return Promise.resolve(res)
    })
  },
  // 更新币价涨跌幅数据
  actionsCoinExchangeInfoList({commit}, params = {}){
    return window.$api.fns.CoinExchange.queryCoinExchangeInfoList(params).then(res => {
      commit('updateCoinExchangeInfoList',res)
      return Promise.resolve(res)
    })
  }
}

export default {
  namespaced:true,
  state,
  getters,
  mutations,
  actions
}

function getLanguage () {
  let lang = navigator.language.toLowerCase()
  lang = lang.substr(0, 2) //截取lang前2位字符
  console.log('lang-->', lang)
  if (lang.indexOf('zh') >  -1) {
    return 'zh_CN'
  } else if (lang === 'en') {
    return 'en'
  } else {
    return 'en'
  }
}