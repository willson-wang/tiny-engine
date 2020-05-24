<script>
export default {
  name: 'basicContent',
  render (h) {
    return h(
      'div',
      {
        class: [
          'content-wrap'
        ],
        style: {}
      },
      this.$slots.default
    )
  }
}
</script>

<style lang="less" scoped>
.content-wrap {
  flex: 1;
}
</style>
