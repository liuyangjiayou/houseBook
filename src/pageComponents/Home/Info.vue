<template>
    <div class="wrap">
        <!-- 人员信息面板 -->
        <h6>
            <span>祝亚会</span>&emsp;
            <span>贷款专员</span>
        </h6>
        <ul class="inner-box">
            <li>
                 <el-image
                    style="width: 94px; height: 126px;"
                    :src="url"
                    fit="cover">
                </el-image>
            </li>
            <li>
                <h6>66000</h6>
                <p>购房贷款</p>
            </li>
            <li>
                <h6>4600</h6>
                <p>过户服务</p>
            </li>
            <li>
                 <h6>3800</h6>
                <p>抵押贷款</p>
            </li> 
            <li>
                <h6>125</h6>
                <p>垫资服务</p>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
    components: {},
    data() {
        return {
            url: require('../../assets/images/headPort.jpg'),
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
@import url(../../assets/css/common);
.wrap{
    box-sizing: border-box;
    .w(100%);
    .pd(0 20px 20px 20px);
    .bd(1px,solid,@e6);
    .bgc(@white);
    h6{
        .height(52px);
        .ft(16px);
    }
    .inner-box{
        .pd(22px 0);
        .ft(0);
        li{
            display: inline-block;
            vertical-align: middle;
            .ft(14px);
            .c(@a3);
            text-align: center;
            h6{
                .ft(40px);
                .c(#323942);
            }
        }
        li:nth-child(1){
            .w(94px);
            .h(126px);
            .bd(1px,solid,@e6);
        }
        li:nth-child(2){
            .mgl(50px);
        }
        li:nth-child(3){
            .mgl(116px);
        }
        li:nth-child(4){
            .mgl(100px);
        }
        li:nth-child(5){
            .mgl(120px);
        }
    }
}

</style>