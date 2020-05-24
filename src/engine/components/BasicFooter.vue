<script>
export default {
  name: 'basicFooter',
  props: {
    tabs: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      activeIndex: 0
    }
  },
  methods: {
    goTo (name) {
      this.$router.push(name)
    }
  },
  render (h) {
    const vm = this
    return h(
      'div',
      {
        class: [
          'footer-wrap'
        ],
        style: {}
      },
      vm.tabs.map((tab, index) => {
        return h(
          'span',
          {
            class: [
              'footer-item',
              vm.activeIndex === index ? tab.activeIcon : tab.icon
            ],
            on: {
              click () {
                vm.goTo(tab.href.name)
              }
            }
          },
          [
            tab.text
          ]
        )
      })
    )
  }
}
</script>

<style lang="less" scoped>
.footer-wrap {
  display: flex;
  align-items: center;
  height: 44px;
  .footer-item {
    flex: 1;
    text-align: center;
  }
}
</style>
