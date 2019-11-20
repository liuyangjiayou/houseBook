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
import { post } from '../api/api.js'
import { mapState } from 'vuex'
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
    computed: {
       
    },
    watch: {},
    methods: {},
    created() {
         post('/User/getUserInfo').then((res)=>{
            this.$store.dispatch('setUserInfo',res.data.list[0]);
        });
    },
    mounted() {
       
    },
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