<template>
    <div class="">
        <!-- 首页 -->
        <Header></Header>
        <div class="main">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="main">
            <Info></Info>
        </div>
        <Footer class="footer"></Footer>
    </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import Breadcrumb from '../components/Breadcrumb'
import Info from '../pageComponents/Home/Info'
export default {
    components: {
        Header,
        Footer,
        Breadcrumb,
        Info,
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
.footer{
    position: absolute;
    left: 0;
    bottom: 0;
}

</style>