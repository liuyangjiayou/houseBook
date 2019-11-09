<template>
    <div class="box">
        <!-- 这是table列表上面的计数条 -->
        <p class="l title">房本列表</p>
        <p class="l num">共计<strong>5</strong>条</p>       
    </div>
</template>

<script>

export default {
    components: {},
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