import Vue from 'vue'
import VueRouter from 'vue-router'

/**
 * 解决push时，路由为当前页面路由抛出异常的问题！
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  const toPath = location.path
  const { path } = this.currentRoute
  if (toPath === path) {
    return false
  }
  return originalPush.call(this, location).catch((err) => err)
}

import store from '@/store'
import i18n from '@/langs'

const views = require.context('./../views', true, /routes\.js$/)
let routes = []
console.log('views', views)
views.keys().map((path) => {
  const conf = views(path).default
  if (Array.isArray(conf)) {
    const pathGroup = path.replace(/^\.\/(.+)\/routes\.js$/, '$1')
    const pathGroupArray = pathGroup.split('/')
    routes = routes.concat(
      conf.map((v) => {
        if (v.path) return v
        if (pathGroupArray[pathGroupArray.length - 1] === v.name) {
          v.path = `/${pathGroup}`
        } else {
          v.path = `/${pathGroup}/${v.name}`
        }
        return v
      })
    )
  } else {
    routes.push(conf)
  }
})
console.log('routes', routes)

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { selector: to.hash }
    } else {
      return { x: 0, y: 0 }
    }
  },
})
router.beforeEach(async (to, from, next) => {
  {
    // 动态更新页面title
    // const {name} = to
    // const title = i18n.t(`title.${name}`) || 'Bmining'
    // document.title = title || 'null'
    // document.title = i18n.t('common.page-title')
    document.title="MetaSwap"
    sessionStorage.setItem('routeParams', JSON.stringify(to.query))
  }
  // {
  //   // 更新路由栈
  //   // await store.dispatch('routeStack/update', { to, from })
  // }
  next()
})
router.afterEach((to, form) => {
  {
    // 进入新页面关闭菜单
    store.commit('header/updateOpenHome', false)
    store.commit('header/updateOpenAccount', false)
    store.commit('header/updateDown', false)
    store.commit('header/updateOpenFilm', false)
  }
  {
    const { hash } = to
    if (hash) {
      return
    }
  }
  {
    // 解决 keep-alive 造成的路由跳转滚动条回到顶部失效的问题
    let bodySrcollTop = document.body.scrollTop
    if (bodySrcollTop !== 0) {
      document.body.scrollTop = 0
      return
    }
    let docSrcollTop = document.documentElement.scrollTop
    if (docSrcollTop !== 0) {
      document.documentElement.scrollTop = 0
    }
  }
})
export default router
