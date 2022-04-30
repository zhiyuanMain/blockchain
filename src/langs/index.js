import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store'
import cookie from 'js-cookie'


Vue.use(VueI18n)

const cns = require.context('./zh_CN', true, /\.json$/) // 中文
const ens = require.context('./en', true, /\.json$/) // 英文
// const kos = require.context('./ko', true, /\.json$/) // 韩文
const langs = [{ name: 'zh_CN', data: cns },  { name: 'en', data: ens }]
let messages = {}

langs.forEach(({ name, data }) => {
  const obj = {}
  data.keys().forEach(item => {
    const key = $utils.toCamel(item.replace(/^\.\/(.*)\.json$/, '$1'))
    obj[key] = data(item)
  })
  messages[name] = obj
})
// 从url获取语言
console.log('$utils.getQuery()',$utils.getQuery())
const {language} = $utils.getQuery()
let localLang = language || store.state.common.lang
if (!language) {
  localLang = cookie.get('language') || setLanguage()
  cookie.set('language', localLang)
} else {
  cookie.set('language', language)
}
console.log('lang.....',localLang)
// 获取浏览器当前语言环境

function setLanguage() {
  let lang = navigator.language.toLowerCase()
  lang = lang.substr(0, 2) //截取lang前2位字符
  if (lang.indexOf('zh') > -1) {
    return 'zh_CN'
  } else if(lang === 'en') {
    return 'en'
  }
}

store.commit('common/updateLang',language || localLang)
console.log('messages',messages)
const i18n = new VueI18n({
  locale: localLang,
  messages,
  silentTranslationWarn: true, //禁用警告
})

export default i18n
