import Vue from 'vue'
import i18n from '@/langs'
import App from './App.vue'
import router from './router'

import store from './store'
import * as filters from '@/utils/filters'
import '@/fonts/iconfont.css'
import '@/utils/rem.js'
import '@/styles/index.less'
import '@/components/global-components'
import Vconsole from 'vconsole'
import { BigNumber } from 'bignumber.js'
import '@/styles/swiper-bundle.min.css';
import api from './utils/request';
Vue.prototype.$api = api;
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts
const { VUE_APP_NODE_ENV } = process.env

const isProd = VUE_APP_NODE_ENV === 'prod'

// 开发环境界面添加控制台
// if (!isProd) {
//   window.vconsole = new Vconsole()
// }



// import axios from 'axios';

// axios.defaults.baseURL = 'http://www.escook.cn:3000 '

// Vue.prototype.axios = axios
// 重写bigNumber的小数截取方法
BigNumber.prototype.decimal = function (len = 6) {
  const t = parseFloat(this.toNumber())
  if (t) {
    // 判断正负数
    const str = this.toNumber().toString()
    const sarr = str.split('')
    let numFlag = sarr[0] !== '-' // true：正数  false：负数
    let news = '' // 新字符串
    if (numFlag) {
      //正数
      return new BigNumber(
        this.toNumber()
          .toString()
          .match(eval('/^\\d+(?:\\.\\d{0,' + len + '})?/'))[0]
      )
    } else {
      //负数
      news = str.substr(1)
      return new BigNumber(
        '-' + news.match(eval('/^\\d+(?:\\.\\d{0,' + len + '})?/'))[0]
      )
    }
  }
  return new BigNumber(0)
}
Vue.prototype.$bigNumber = (v) => new BigNumber(v)
Vue.config.productionTip = false



new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app')
