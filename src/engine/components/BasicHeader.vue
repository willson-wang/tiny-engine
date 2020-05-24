<script>
export default {
  name: 'basicHeader',
  props: {
    header: {
      type: Object
    }
  },
  methods: {
    back () {
      this.$router.back()
    }
  },
  render (h) {
    return h(
      'div',
      {
        class: [
          'header-wrap'
        ],
        style: {}
      },
      [
        h(
          'span',
          {
            on: {
              click: this.back
            },
            class: 'header-back'
          },
          [
            '&lt;'
          ]
        ),
        h(
          'h4',
          {
            class: 'header-title'
          },
          [
            this.header.title
          ]
        )
      ]
    )
  }
}
</script>

<style lang="less" scoped>
.header-wrap {
  display: flex;
  align-items: center;
  height: 44px;
  .header-back {
    flex: 0 0 100px;
  }
  .header-title {
    flex: 1;
    text-align: center;
    text-indent: -100px;
  }
}
</style>
