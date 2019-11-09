<template>
  <div>
    <Header></Header>
    <Breadcrumb></Breadcrumb>
    我是第二个页
     <router-link to="/">我是首页</router-link>
     <router-link to="/about">我是第二个页</router-link>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import Breadcrumb from '../components/Breadcrumb'
  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {
      Header,
      Breadcrumb
    },

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='less' scoped>

</style>