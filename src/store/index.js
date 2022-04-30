import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const modulesSource = require.context('./modules', true, /\.js$/)
const modules = {}
modulesSource.keys().forEach(item => {
  const key = $utils.toCamel(item.replace(/^\.\/(.*)\.js$/, '$1'))
  modules[key] = modulesSource(item).default
})
console.log('modules',modules)

const store = new Vuex.Store({
  modules,
  state: {
		account: "連接錢包"
  },
  mutations: {
	setAccount(state, account) {
		state.account = account;
	},
	resetAccount(state) {
		state.account = "連接錢包";
	}
  },
  actions: {},

})
console.log('store', store)
export default store

