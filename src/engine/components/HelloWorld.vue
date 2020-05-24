<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links xxxx {{plateform}}</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const a = {
  age: 18
}

const b = {...a}
console.log('b', b)

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapState('app', ['plateform'])
  },
  methods: {},
  mounted () {
    console.log('this', this)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
