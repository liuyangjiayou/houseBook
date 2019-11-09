<template>
  <div class="header">
      <!-- 头部组件 -->
      <div class="main main-box">
        <div class="l log-box">
            <i class="l"></i>
            <span class="l">签后系统</span>
        </div>
        <ul class="nav-list">
            <li class="l"> <router-link to="/home" tag="div">首页</router-link></li>
            <li class="l"><router-link to="/buyHouseLoan" tag="div">购房贷款</router-link></li>
            <li class="l"><router-link to="/houseCard" tag="div">房本管理</router-link></li>
        </ul>
        <div class="r right">
            <div class="l linkAS">
                <a href="">
                    <i class="dib2"></i>
                    <span class="dib2">切换至AS系统</span>
                </a>
            </div>
            <div class="l info-box">
                <p class="pos"><span>祝亚会</span> - <span>贷款专员</span> - <span>金融部</span><i class="dib2"></i></p>
                <div>

                </div>
            </div>            
        </div>
      </div>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='less' scoped>
    @import url(../assets/css/common.less);
    .header{
        .h(52px);
        .bgc(@green);
        .main-box{
            position: relative;
            box-sizing: border-box;
            .pd(0 322px 0 210px);
            .log-box{
                position: absolute;
                top: 0;
                left: 0;
                .pdt(9px);
                .h(43px);
                i{
                    .w(34px);
                    .h(34px);
                    background: url('../assets/images/logo.png') no-repeat;
                }
                span{
                    .mgl(10px);
                    .ft(32px);
                    .fw(900);
                    .h(32px);
                    .lh(32px);
                    .c(@white);
                }
            }
            .nav-list{
                .lh(52px);
                li{
                    .minw(80px);
                    .mgl(1px);
                    text-align: center;
                    .ft(14px);
                    .c(@white);
                    cursor: pointer;
                }
                li:hover{
                   .bgc(@yellow);
                }
            }
            .right{
                position: absolute;
                top: 0;
                right: 0;
                .linkAS{  
                    .mgr(33px);
                    a{
                        .c(@white);
                        .ft(14px);
                    }
                    .h(52px);
                    .lh(52px);
                    .c(@white);
                    a:hover{
                        .bdbx(1px,solid,@white);
                    }
                    i{
                        .mgr(6px);
                        .w(12px);
                        .h(12px);
                        .bgi(0 0);
                    }
                }
                .info-box{
                    .pos{
                        .height(52px);
                        .c(@white);
                        .ft(14px);
                        i{
                            .mgl(6px);
                            .w(8px);
                            .h(5px);
                            .bgi(-14px 0);
                            vertical-align: 2px;
                        }
                    }
                }
            }
        }
    }
    .router-link-exact-active{
        .bgc(@yellow);
    }
</style>