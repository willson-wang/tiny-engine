import axios from 'axios'

import TYPES from './types'

export default {
  namespaced: true,
  state: {
    plateform: 'wechat',
    appMeta: {}
  },
  mutations: {
    [TYPES.SET_APP_META] (state, meta) {
      state.appMeta = meta
    },
    [TYPES.CLEAR_APP_META] (state) {
      state.appMeta = {}
    }
  },
  actions: {
    async [TYPES.GET_APP_META] ({ commit, state }, params) {
      const result = await axios.get('https://b2c-test.mypaas.com.cn/api/v1/client/proxy/meta?env=test&app_id=yk_qmyx&role_id=&app_assets_version=1.0.46&tenant_code=hzzhongxadmin@cdkqqf1407307954')
      if (result.data.code === 0) {
        commit(TYPES.SET_APP_META, JSON.parse(result.data.data.meta))
      }
    }
  }
}
