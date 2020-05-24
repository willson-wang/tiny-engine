import Vue from 'vue'
import Store from '../store/index'

const modules = []

function registerGloabalComponent (id, component) {
  Vue.component(id, component)
}

function addRouteComponent (id, routes) {
  if (!Array.isArray(routes)) throw new Error('routes 必须是数组')
  routes.forEach((route, index) => {
    if (!route.body || !route.body.component) throw new Error(`${id}内的${route.name}内页路由，component必须定义在body内`)
    registerGloabalComponent(`parse-body-${id}-${route.name}-${index}`)
  })
}

function registerStore (id, storeModule) {
  const hasDefine = storeModule && Store && Store._modules
  if (hasDefine && Store._modules.get && !Store._modules.get([id])) {
    Store.registerModule(id, storeModule)
  }
}

export function registerModule (id, component) {
  if (id) {
    modules.push(component)
  }
}

export function registerComponent (id, { component, storeModule, routes }) {
  if (id) {
    registerGloabalComponent(id, component)
  }

  if (storeModule) {
    registerStore(id, storeModule)
  }

  if (routes) {
    addRouteComponent(id, routes)
  }
}

export default modules

/**
 * 使用loader将业务方开发的组件，注册进来，module下的组件当成插件注册，packages下的组件当成普通全局组件注册
 * registerModule(id, require('tiny-engine-demo/src/modules/xxx/index.js'))
 * registerComponent(id, require('tiny-engine-demo/src/packages/xxx/src/index.js'))
 * */
