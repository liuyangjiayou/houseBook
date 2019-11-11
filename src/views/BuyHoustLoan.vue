<template>
    <div>
        <!-- 购房贷款 -->
        <Header></Header>
        <div class="main">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="main">
            购房贷款页面
        </div>
    </div>
</template>

<script>
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
export default {
    components: {
        Header,
        Breadcrumb
    },
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {},
    created() {},
    mounted() {},
    beforeCreate() {},
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeDestroy() {},
    destroyed() {},
    activated() {},
    }
</script>
<style lang='less' scoped>
@import url(../assets/css/common.less);
.wrap{
    .w(100%);
    .h(223px);
    .bgc(#fff);
    .bd(1px,solid,@e6)
}
</style>