<template>
    <div v-show="resultList.length > 0" class="nav-result-box">
        <p>已选：</p>
        <ul>
            <li v-for="(item,index) in resultList" :key="index" class="dib2">{{item.title}}<span><i></i></span></li>
            <li class="dib2 last-li" @click="clearFn"><i></i>清空已选</li>
        </ul>
    </div>
</template>

<script>

export default {
    components: {},
    props : {
        resultList : {
            type : Array,
            default : [],
        }
    },
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {
        clearFn(){
            this.$emit('updata:resultList',[]);
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
.nav-result-box{
    position: relative;
    .pdl(68px);
    .minh(48px);
    p{
        position: absolute;
        top: 0;
        left: 0;
        .height(48px);
    }
    ul{
        .pd(10px 0 12px 0);
        .lh(22px);
        li{
            position: relative;
            cursor: pointer;
            .mgr(10px);
            .mgb(2px);
            .pd(0 38px 0 8px);
            .height(26px);
            .bd(1px,solid,@green);
            span{
                position: absolute;
                top: 0;
                right: 0;
                .w(30px);
                .h(26px);
                .bgc(@green);
                i{
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    .w(10px);
                    .h(9px);
                    .bgi(-42px 0);

                }
            }
        }
        li.last-li{
            .mg(0 0 0 19px);
            .pdl(22px);
            .bdn();
            i{
                position: absolute;
                top: 6px;
                left: 0;
                .w(14px);
                .h(14px);
                .bgi(-55px 0);
            }
        }
        li:hover{
            .c(@green);
        }
        li.active{
            .c(@green);
        };
    }
}
</style>