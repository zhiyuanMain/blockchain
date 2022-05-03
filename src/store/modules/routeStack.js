export default {
  namespaced: true,
  state: {
    history: new Map(),
    isBack: false, // 当前路由是否是返回状态
    index: 0, // 当前路由 index
    orderList: 0, //订单列表当前Index
    isOrderDetailBack: false,
    orderListScrollPosition: 0,
  },

  mutations: {
    PUSH(state, { key, route }) {
      state.history.set(
        key,
        Object.assign({}, route, { index: state.history.size })
      )
    },

    DELETE(state, key) {
      state.history.delete(key)
    },

    SWITCH(state, { index }) {
      state.index = index
    },

    SET_BACK(state, bool) {
      state.isBack = bool
    },
  },

  actions: {
    // 更新路由栈
    update({ commit, state }, { to, from }) {
      const nextKey = to.fullPath
      const fromKey = from.fullPath
      if (state.history.has(nextKey)) {
        const current = state.history.get(fromKey)
        const next = state.history.get(nextKey)
        const isBack = current.index > next.index
        commit('SWITCH', current)
        commit('SET_BACK', isBack)
        if (isBack) commit('DELETE', fromKey)
      } else {
        commit('PUSH', { key: nextKey, route: to })
        commit('SET_BACK', false)
      }
      return state.isBack
    },
  },
}
