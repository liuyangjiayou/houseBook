<template>
    <div class="">
        <!-- 在途单详情 -->
        <div class="main">
            <div class="info-box">
                <h6><strong>西里小区&nbsp;6-5-102</strong><span class="cgreen text-btn_hover">查看合同</span></h6>
                <el-row class="info-wrap">
                    <el-col :span="10">
                        <ul class="info-ul">
                            <li class="ell">
                                <strong>买方姓名：</strong>
                                <span class="cblue">张艺兴</span>
                                <span class="cgreen text-btn_hover">变更记录</span>
                            </li>
                            <li class="ell">
                                <strong>身份证号：</strong>
                                <span class="cblue">22018119910623061x</span>
                                <span class="cgreen text-btn_hover">查看身份证</span>
                            </li>
                            <li class="ell">
                                <strong>联系电话：</strong>
                                <span class="cblue">17367729551</span>
                                <span class="icon-phone"></span>
                            </li>
                            <li class="ell">
                                <strong>贷款金额：</strong>
                                <span class="cblue">11万</span>
                            </li>
                            <li class="ell">
                                <strong>报单人：</strong>
                                <span class="cblue">刘杨&nbsp;永佳&nbsp;技术部</span>
                            </li>
                             <li class="ell">
                                <strong>报单日期：</strong>
                                <span class="cblue">2019-10-25&nbsp;10：25</span>
                            </li>
                        </ul>
                    </el-col>
                     <el-col :span="14">
                         <ul class="info-ul">
                            <li class="ell">
                                <strong>卖方姓名：</strong>
                                <span class="cblue">易烊千玺</span>
                            </li>
                            <li class="ell">
                                <strong>身份证号：</strong>
                                <span class="cblue">22018119910623061x</span>
                                <span class="cgreen text-btn_hover">查看身份证</span>
                            </li>
                            <li class="ell">
                                <strong>联系电话：</strong>
                                <span class="cblue">17367729551</span>
                                <span class="icon-phone"></span>
                            </li>
                            <li class="ell">
                                <strong>房源编号：</strong>
                                <span class="cblue">NO.2569856589 </span>
                                <span class="cgreen text-btn_hover">查看房产证</span>
                            </li>
                            <li class="ell">
                                <strong>小区名称：</strong>
                                <span class="cblue">西里小区&nbsp;1-6-51</span>
                            </li>
                        </ul>
                    </el-col>
                </el-row>
                <div class="btn-list">
                    <p>
                        <strong>资料信息：</strong>
                    </p>
                    <ul>
                        <li class="dib cgreen text-btn_hover">
                            备件信息
                        </li>
                        <li class="dib cgreen text-btn_hover">
                            贷款传递单
                        </li>
                          <li class="dib cgreen text-btn_hover">
                            垫资申请表
                        </li>
                        <li class="dib text-dis">
                            过户申请单
                        </li>
                        <li class="dib text-dis">
                            档案及落宗凭证
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="arr-box"></div>
        <div class="main">
            <div class="info-box">
                <h6><span>走件进度</span></h6>
                <el-row class="list-wrap">
                    <el-col class="list list1 pass" :span="4" @click.native="aaaaa(1)">1、买卖双方资料确认</el-col>
                    <el-col class="list list1 pass" :span="4" @click.native="aaaaa(2)">2、收款确认</el-col>
                    <el-col class="list list1" :span="4">3、备件通知</el-col>
                    <el-col class="list list1" :span="4">4、组卷评估</el-col>
                    <el-col class="list list1" :span="4">5、面签通知</el-col>
                    <el-col class="list list1" :span="4">6、面签完成</el-col>
                    <el-col class="list list1" :span="4">7、银行审批结果</el-col>
                    <el-col class="list list1" :span="4">8、垫资解压待反馈</el-col>
                    <el-col class="list list1" :span="4">9、网签通知</el-col>
                    <el-col class="list list1" :span="4">10、网签完成</el-col>
                    <el-col class="list list1" :span="4">11、网签合同盖章</el-col>
                    <el-col class="list list1" :span="4">12、银行配额通知</el-col>
                    <el-col class="list list1" :span="4">13、服务费确认</el-col>
                    <el-col class="list list1" :span="4">14、过户对接</el-col>
                    <el-col class="list list2 pass" :span="4">15、过户通知</el-col>
                    <el-col class="list list2" :span="4">16、过户结果</el-col>
                    <el-col class="list list2" :span="4">17、过户录入新房本</el-col>
                    <el-col class="list list2" :span="4">18、抵押对接</el-col>
                    <el-col class="list list3 pass" :span="4">19、银行办理抵押</el-col>
                    <el-col class="list list3" :span="4">20、取他项</el-col>
                    <el-col class="list list3" :span="4">21、银行划款至业主账号</el-col>
                    <el-col class="list list3" :span="4">22、抵押专员交本</el-col>
                    <el-col class="list" :span="4">23、完成</el-col>
                </el-row>
                <div>
                    <component :is="components"></component>
                    <!-- <Progress1></Progress1> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Progress1 from '../../pageComponents/BuyHouseLoanList/Progress1';
import Progress2 from '../../pageComponents/BuyHouseLoanList/Progress2';
export default {
    components: {
        'Progress1' : Progress1,
        'Progress2' : Progress2,
    },
    data() {
        return {
            components : 'Progress1',
        };
    },
    computed: {},
    watch: {},
    methods: {
        aaaaa(num){
            this.components = 'Progress'+num;
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
@import url('../../assets/css/list-top-style2.less');
@import url('../../assets/css/list-body.less');
.list-wrap{
    .pdt(20px);
    .list{
        position: relative;
        .mgb(10px);
        .height(36px);
        text-align: center;
        cursor: pointer;
        &:hover{
            opacity: .8;
        }
        &::before{
            position: absolute;
            top: 0;
            left: 0;
            content: " ";
            .bdtx(18px,solid,transparent);
            .bdbx(18px,solid,transparent);
            .bdlx(12px,solid,@white);
            .bdrx(12px,solid,transparent);
        }
        &::after{
            position: absolute;
            top: 0;
            right: -12px;
            content: " ";
            .bdtx(18px,solid,@white);
            .bdbx(18px,solid,@white);
            .bdrx(12px,solid,@white);
        }
    }
    .list.list1{
        .bgc(@green2);
        .c(@green);
         &::after{
           .bdlx(12px,solid,@green2);
        }
        
    }
    .list1.pass{
        .bgc(@green);
        .c(@white);
        &::after{
            .bdlx(12px,solid,@green);
        }
    }
    .list.list2{
        .bgc(@pink2);
        .c(@pink);
         &::after{
           .bdlx(12px,solid,@pink2);
        }
        
    }
    .list2.pass{
        .bgc(@pink);
        .c(@white);
        &::after{
            .bdlx(12px,solid,@pink);
        }
    }
    .list.list3{
        .bgc(@blue2);
        .c(@blue);
         &::after{
           .bdlx(12px,solid,@blue2);
        }
        
    }
    .list:first-child{
         &::before{
            display: none;
        }
    }
    .list:last-child{
        .bgc(@green2);
        .c(@green);
         &::after{
           .bdlx(12px,solid,@green2);
        }
         &::after{
            display: none;
        }
    }
}
.arr-box{
    .h(10px)
}
</style>