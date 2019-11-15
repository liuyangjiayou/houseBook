<template>
    <div class="wrap">
        <!-- table列表上面的Nav导航 -->
        <div>
            <input type="text" class="keyword-input" placeholder="输入产权人姓名">
            <span class="button dib2">搜索</span>
        </div>
        <TopNavArr v-for="(item,index) in listData" :key="index" :title="item.title" :activeList="activeList" :listData="item.list"></TopNavArr>
        <NavResultBox :resultList.sync="activeList"></NavResultBox>
    </div>
</template>

<script>
import TopNavArr from '../components/TopNavArr';
import NavResultBox from '../components/NavResultBox';
export default {
    components: {
        TopNavArr,
        NavResultBox,
    },
    props : {
        listData : {
            type : Array,
            default : [],
        }
    },
    data() {
        return {
            activeList : [],
            activeIdList : [],
        };
    },
    computed: {},
    watch: {},
    methods: {
        navChange(arr){
            console.log(arr);
        }
    },
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
@import url('../assets/css/common.less');
.wrap{
    box-sizing: border-box;
    .pd(20px);
    .w(100%);
    .bd(1px,solid,@e6);
    .bgc(@white);
    .button{
        .w(90px);
        .height(40px);
        text-align: center;
        .c(@white);
        .bdr(3px);
        .bgc(@green);
        .bdn();
        cursor: pointer;
    }
    .keyword-input{
        box-sizing: border-box;
        .mgr(20px);
        .pd(0 10px);
        .w(300px);
        .bdr(3px);
        .height(40px);
    }
    .button:hover{
        opacity: .9;
    }
}



</style>