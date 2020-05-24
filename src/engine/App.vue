<template>
  <div id="app" class="app">
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import router from './router'
import renderComponent from './utils/renderComponent'

const CacheView = {}
const routeMap = {}

export default {
  name: 'App',
  computed: {
    ...mapState('app', ['appMeta'])
  },
  watch: {
    appMeta: {
      immediate: true,
      handler (val) {
        if (Object.keys(val).length) {
          const routes = this.parseView(val)
          router.addRoutes(routes)
        }
      }
    }
  },
  methods: {
    checkAuth () {},
    parseView (rootMeta) {
      const { views } = rootMeta
      const routes = []
      views.forEach((view) => {
        const { name } = view
        let newRoute = null
        if (!CacheView[name]) {
          CacheView[name] = newRoute
          newRoute = this.getView(view, rootMeta)
        } else {
          newRoute = CacheView[name]
        }

        if (!routeMap[name]) {
          routes.push(newRoute)
          routeMap[name] = name
        }
      })
      return routes
    },
    getView (view, rootMeta) {
      const { path, name, alias, beforeEnter, meta } = view
      return {
        path,
        name,
        props: function () {
          return {
            view: CacheView[name]
          }
        },
        component: {
          props: {
            view: Object
          },
          render (h) {
            return renderComponent(h, this.props, view, rootMeta)
          }
        },
        alias,
        beforeEnter,
        meta
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="less">
html, body {
  background-color: #f1f1f1;
  height: 100%;
  width: 100%;
}

.app {
  height: 100%;
}

.route-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
