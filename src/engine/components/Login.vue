<script>
export default {
  name: 'login',
  render (h) {
    return h(
      'div',
      {
        class: 'login-wrap'
      },
      [
        this.$slots.defaut
      ]
    )
  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  height: 100%;
}
</style>
