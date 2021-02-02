import Vue from 'vue'
import App from './App'
import store from './vuex/index'
import '@/common/common'

import publicFn from './common/util.js'

Vue.config.productionTip = false

Vue.prototype.$publicFn= publicFn

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

const app = new Vue({
	...App,
	store
})
app.$mount()
export default app
