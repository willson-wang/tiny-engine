import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules: {
    app
  }
})

export default Store
