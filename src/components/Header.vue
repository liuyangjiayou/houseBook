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
                <a :href="getUserInfo.asurl">
                    <i class="dib2"></i>
                    <span class="dib2">切换至AS系统</span>
                </a>
            </div>
            <div class="l info-box">
                <p class="pos"><span>{{getUserInfo.username}}</span> - <span>{{getUserInfo.position_name}}</span> - <span>{{getUserInfo.dept_name}}</span><i class="dib2"></i></p>
                <div class="store-box">
                    <div class="agent-box">
                        <div class="img-box">
                            <el-avatar :size="52" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
                        </div>
                        <div class="name-box">
                            <p><span>{{getUserInfo.username}}</span><span>{{getUserInfo.position_name}}</span></p>
                            <p>系统号: {{getUserInfo.account}}</p>
                        </div>
                    </div>
                    <p class="btn-box">
                        <a href=""><i></i><span>个人信息</span></a>
                        <a href=""><i></i><span>退出系统</span></a>
                    </p>
                </div>
            </div>            
        </div>
      </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { post } from './../api/api'
  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {},

    computed: {
        ...mapGetters([
            'getUserInfo'
        ]),
    },
    created(){
        post('/User/getUserInfo').then((res)=>{
            this.$store.dispatch('setUserInfo',res.data);
        });
    },
    beforeMount() {},

    mounted() {
       
    },

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
                    position: relative;
                    .pos{
                        .height(52px);
                        .c(@white);
                        .ft(14px);
                        cursor: pointer;
                        i{
                            .mgl(6px);
                            .w(8px);
                            .h(5px);
                            .bgi(-14px 0);
                            vertical-align: 2px;
                        }
                    }
                    &:hover .store-box{
                        display: block;
                    }
                    .store-box{
                        display: none;
                        position: absolute;
                        top: 52px;
                        right: 0;
                        .pd(14px 15px);
                        .w(245px);
                        .minh(112px);
                        .bgc(@white);
                        box-shadow: -1px 2px 10px 1px #f2f2f2;
                        z-index: 10;
                        .agent-box{
                            display: flex;
                            flex-direction: row;
                            .name-box{
                                .mgl(10px);
                                display: flex;
                                flex-direction: column;
                                justify-content: center;
                                p:first-child{
                                    display: flex;
                                    flex-direction: row;
                                    justify-content: space-between;
                                }
                                p:last-child{
                                    .mgt(4px);
                                    .c(grey);
                                }
                            }
                        }
                        .btn-box{
                            display: flex;
                            flex-direction: row;
                            justify-content: space-between;
                            .mgt(30px);
                            a:first-child,a:last-child{
                                display: flex;
                                flex-direction: row;
                                align-items: center;
                                cursor: pointer;
                                .c(@c333);
                                i{
                                    display: flex;
                                    .mgr(8px);
                                    .w(16px);
                                    .h(16px);
                                    .bgc(red);
                                }
                                &:hover{
                                    text-decoration: underline;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    // .router-link-exact-active{.bgc(@yellow);} 精准匹配
    .router-link-active{
        .bgc(@yellow);
    }
</style>