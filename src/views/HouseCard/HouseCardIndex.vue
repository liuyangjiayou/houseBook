<template>
  <div>
      <!-- 房本详情入口 -->
        <Header></Header>
        <div class="main">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="mian">
            <router-view></router-view>
        </div>
  </div>
</template>

<script>
import Header from '../../components/Header'
import Breadcrumb from '../../components/Breadcrumb'
  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {
        Header,
        Breadcrumb,
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