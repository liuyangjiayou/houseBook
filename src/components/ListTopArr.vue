<template>
    <div class="box">
        <!-- 这是table列表上面的计数条 -->
        <p class="l title">{{title}}</p>
        <p class="l num">共计<strong>{{num}}</strong>条</p>       
    </div>
</template>

<script>

export default {
    components: {},
    props : {
        num : '',
        title : '',
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
@import url('../assets/css/common.less');
.box{
    .height(56px);
    .title{
        .mgr(20px);
        .ft(16px);
    }
    .num{
        .ft(14px);
        strong{
            .c(@blue);
        }
    }
    
}

</style>