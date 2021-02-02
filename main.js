import Vue from 'vue'
import App from './App'
import store from './vuex/store.js'
import util from './common/js/util.js'
import filter from './common/filter/filter'
import mixin from './common/mixin/mixin'
import uView from 'uview-ui'


Vue.prototype.$store = store
Vue.prototype.$util= util

Vue.mixin(mixin)
Vue.use(uView)

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()