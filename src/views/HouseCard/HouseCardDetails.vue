<template>
<div>
    <div class="main">
        <!-- 房本管理详情 -->
        <div class="house-card-info">
            <h6><span class="l title">房本信息</span></h6>
            <div class="house-card-wrap">
                <ul class="ul1 ovh">
                    <li class="l li1">
                        <strong>房产证号：</strong>
                        <span class="cblue">{{commonData.number}}</span>
                    </li>
                    <li class="l li1">
                        <strong>产权人：</strong>
                        <span class="cblue">{{commonData.owner_name}}</span>
                    </li>
                    <li class="l">
                        <strong>房产证类型：</strong>
                        <span class="cblue">{{commonData.property_cert}}</span>
                    </li>
                </ul>
                <ul class="ul1">
                    <li class="l li1">
                        <strong>是否共有：</strong>
                        <span class="cblue">{{commonData.is_common}}</span>
                    </li>
                    <li class="l li1">
                        <strong>有无公证书：</strong>
                        <span class="cblue">{{commonData.has_auth}}</span>
                    </li>
                    <li class="l">
                        <strong>房产证地址：</strong>
                        <span class="cblue">{{commonData.address}}</span>
                    </li>
                </ul>
                <ul>
                    <li>
                        <strong>备注：</strong>
                        <span class="cblue">{{commonData.remarks}}</span>
                    </li>
                </ul>
            </div>
        </div>
            <!-- 房本流传信息 -->
        <div class="house-card-turn ovh">
            <h6>
                <span class="l title">房本流转信息</span>
                <ul class="l">
                <li class="l">
                    时间<i></i>
                </li>
                </ul>
            </h6>
            <div class="house-turn-wrap">
                <!-- <el-timeline :reverse="reverse">
                        <el-timeline-item
                        v-for="(v,i) in commonData.transinfo" :key="i"
                        :timestamp="activity.timestamp">
                        {{activity.content}}
                        </el-timeline-item>
                    </el-timeline> -->
                <ul>
                    <li v-for="(v,i) in commonData.transinfo" :key="i">
                        <div class="cicon"></div>
                        <div class="dib2 vtat img-box"><el-avatar :size="50" :src="v.avatar"></el-avatar></div>
                        <div class="dib2 vtat">
                        <p>
                            <span class="mg10px">{{v.username}}</span>
                            <span class="mg10px">{{v.department_name}}</span>
                            <span>2019.09.26 12:25</span>
                        </p>
                        <p>
                            <strong class="cblue mg10px">{{v.status}}</strong>
                            <span>收本原因：<span class="cblue">网签</span></span>
                        </p>
                        <p>
                            <span class="c6">持本时长：</span><span>{{v.collect_time}}</span>
                        </p>
                        <p>备注：{{v.remarks}}</p>
                        <p>
                            <span class="dib2">收本凭证</span>
                            <img class="dib2" :src="v.image" alt="">
                        </p>
                        </div>
                    </li>
                    <!-- <li>
                        <div class="cicon"></div>
                        <div class="dib2 vtat img-box"><el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></div>
                        <div class="dib2 vtat">
                        <p>
                            <span class="mg10px">刘明玉</span>
                            <span class="mg10px">永佳西里A店</span>
                            <span>2019.09.26 12:25</span>
                        </p>
                        <p>
                            <strong class="cblue mg10px">录入</strong>
                            <span>收本原因：<span class="cblue">网签</span></span>
                        </p>
                        <p>
                            <span class="c6">持本时长：</span><span>4小时</span>
                        </p>
                        <p>备注：这里是备注内容</p>
                        <p>
                            <span class="dib2">收本凭证</span>
                            <img class="dib2" src="" alt="">
                        </p>
                        </div>
                    </li>
                    <li>
                        <div class="cicon"></div>
                        <div class="dib2 vtat img-box"><el-avatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar></div>
                        <div class="dib2 vtat">
                        <p>
                            <span class="mg10px">刘明玉</span>
                            <span class="mg10px">永佳西里A店</span>
                            <span>2019.09.26 12:25</span>
                        </p>
                        <p>
                            <strong class="cblue mg10px">录入</strong>
                            <span>收本原因：<span class="cblue">网签</span></span>
                        </p>
                        <p>
                            <span class="c6">持本时长：</span><span>4小时</span>
                        </p>
                        <p>备注：这里是备注内容</p>
                        <p>
                            <span class="dib2">收本凭证</span>
                            <img class="dib2" src="" alt="">
                        </p>
                        </div>
                    </li> -->
                </ul>
            </div>
            <ListErrBox v-if="commonData.transinfo && commonData.transinfo.length > 0"></ListErrBox>
        </div>
    </div>
    <Footer></Footer>
</div>
</template>

<script>
import Footer from '../../components/Footer'
import ListErrBox from '../../components/ListErrBox'
import { post } from '../../api/api'
  export default {
    name:'',
    props:[''],
    data () {
      return {
          commonData : '',
      };
    },

    components: {
        Footer,
        ListErrBox
    },
    computed: {},
   
    beforeMount() {},
    created(){
        let houseId = this.$route.query.cid;
        post('/Index/detailInfo',{cid : houseId}).then(res => {
            this.commonData = res.data;
            console.log(this.commonData);
        });
    },
    mounted() {
        
    },

    methods: {},

    watch: {}

  }

</script>
<style lang='less' scoped>
@import url('../../assets/css/common.less');
.house-card-info{
  .pd(0 20px);
  .bgc(@white);
  .bd(1px,solid,@e6);
  .house-card-wrap{
    .pd(12px 0 13px 0);
    .minh(75px);
    .ul1{
      .height(28px);
      .li1{.w(214px)};
    }
  }
}
.house-card-turn{
  .mg(10px 0 60px 0);
  .pd(0 20px 20px);
  .bgc(@white);
  .bd(1px,solid,@e6);
  .minh(600px);
  .house-turn-wrap{
    .pd(20px 20px 0);
    li{
      position: relative;
      .bdlx(1px,solid,@c999);
      .cicon{
        position: absolute;
        top: 16px;
        left: -10px;
        .w(12px);
        .h(12px);
        .bdr(50%);
        .bgc(@c999);
        .bd(4px,solid,@white);
      }
      .img-box{
        .mg(0 15px 0 25px);
        .w(50px);
        .h(50px);
        .bdr(50%);
      }
      .mg10px{
        .mgr(10px);
      }
      p{
        .lh(24px);
      }
      strong{
        .mgr(15px);
      }
    }
  }
  li:first-child .cicon::before{
    position: absolute;
    top: -20px;
    left: 2px;
    .bgc(@white);
    content: "";
    .w(10px);
    .h(20px);
  }
   li:last-child .cicon::before{
    position: absolute;
    bottom: -100px;
    left: 2px;
    .bgc(@white);
    content: "";
    .w(10px);
    .h(100px);
  }
}
h6{
  .height(60px);
  .bdbx(1px,solid,@e6);
  .fw(400);
  .c(@cblack);
  .title{
    .ft(16px);
  }
  ul{
    .mgl(20px);
    .ft(14px);
    .c(@cblack);
  }
}
</style>