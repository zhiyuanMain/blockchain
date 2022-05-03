export default {
  namespaced: true,
  state: {
    //  导航折叠面板当前展开菜单
    activeName: localStorage.getItem('activeName') || '',
    // 导航 - 首页 展开
    openHome: false,
    // 导航 - 账户中心
    openAccount: false,
    // 导航 - 新手引
    openFilm:false,
    // 是否展开title 的菜单
    down: false,
    // 当前title组件列表数据
    titleList: [],
    // 当前route 属于哪个模块
    nowRouteModel: null,
  },
  mutations: {
    updateActiveName(state, name) {
      state.activeName = name
      localStorage.setItem('activeName', name)
    },
    updateOpenHome(state, bool) {
      state.openHome = bool
    },
    updateOpenAccount(state, bool) {
      state.openAccount = bool
    },
    updateDown(state, bool) {
      state.down = bool
    },
    updateTitleList(state, list) {
      state.titleList = list
    },
    updateNowRouteModel(state, route) {
      state.nowRouteModel = route
    },
    updateOpenFilm(state,bool){
      state.openFilm = bool
    }
  },
  actions: {
    actionsActiveName({ commit }, name = '') {
      console.log('actionsActiveName', name)
      commit('updateActiveName', name)
    },
  },
}
