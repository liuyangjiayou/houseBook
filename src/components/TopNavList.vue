<template>
    <div class="wrap">
        <!-- table列表上面的Nav导航 -->
        <div>
            <input type="text" class="keyword-input" placeholder="输入产权人姓名">
            <span class="button dib2">搜索</span>
        </div>
        <div class="nav-box">
            <p class="dib2">房本类型：</p>
            <ul class="dib2">
                <li class="dib2">不限</li>
                <li class="dib2">市证</li>
                <li class="dib2">村证</li>
                <li class="dib2">其他</li>
            </ul>
        </div>
        <div class="nav-result-box">
            <p>已选：</p>
            <ul>
                <li class="dib2">录入<span><i></i></span></li>
                <li class="dib2 last-li"><i></i>清空已选</li>
            </ul>
        </div>
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
.nav-box{
    position: relative;
    .pdl(76px);
    p{
        position: absolute;
        top: 0;
        left: 0;
        .height(48px);
    }
    ul{
        
        .pd(14px 0 12px 0);
        .h(22px);
        li{
            .pd(0 12px);
            cursor: pointer;
        }
        li:hover{
            .c(@green);
        }
        li.active{
            .c(@green);
        };
    }
}
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