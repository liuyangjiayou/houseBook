
<template>
    <el-breadcrumb separator-class="el-icon-arrow-right"  class="breadcrumb-box">
        <!-- 分页器组件 -->
        <el-breadcrumb-item v-for="(item,index) in breadList" :to="item.path" :key="index">{{item.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
        breadList: [] // 路由集合
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {
        this.getBreadcrumb()
    },

    methods: {
        isHome(route) {
            return route.name === "home";
        },
        getBreadcrumb() {
            let matched = this.$route.matched;
            //如果不是首页
            if (!this.isHome(matched[0])) {
                matched = [{ path: "/", meta: { title: "首页" } }].concat(matched);
            }
            this.breadList = matched;
        }
    },
    watch: {
        $route() {
            this.getBreadcrumb();
        }
    }

  }

</script>
<style lang='less' scoped>
@import url('../assets/css/common.less');
.breadcrumb-box{
    .height(50px);

}
</style>