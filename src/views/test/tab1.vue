<template>
    <div class="">
        我是tab，父级给我传了一个{{title}}

    </div>
</template>

<script>

export default {
    components: {},
    props : {
        title : {
            type : String,
            default : "嘻嘻嘻哈哈"
        },
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
//@import url(); 引入公共css类

</style>