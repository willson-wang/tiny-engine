// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import modules from './utils/register'
import store from './store'
import TYPES from './store/types'
import './assets/css/normalize.css'

Vue.config.productionTip = false
modules.forEach((install) => {
  Vue.use(install)
})

/* eslint-disable no-new */
const instance = new Vue({
  router,
  store,
  components: { App },
  template: '<App/>'
})

store.dispatch(`app/${TYPES.GET_APP_META}`)

instance.$mount('#app')
