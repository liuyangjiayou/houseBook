<template>
    <div>
        <!-- 待收单 -->
        <div class="main">
            <el-form class="sreach-box">
                <ul class="tag-list">
                    <router-link tag="li" to="/buyHouseLoan/wait" active-class="active">待收单</router-link>
                    <router-link tag="li" to="/buyHouseLoan/route" active-class="active">在途单</router-link>
                    <router-link tag="li" to="/buyHouseLoan/route" active-class="active">结件单</router-link>
                </ul>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="合同编号：" label-width="85px">
                            <el-input placeholder="输入合同编号" class="input1"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="小区名称：" label-width="100px">
                            <el-input placeholder="输入小区名称：" class="input1"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="买方姓名：" label-width="100px">
                            <el-input placeholder="输入买方姓名" class="input1"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="卖方姓名：" label-width="85px">
                            <el-input placeholder="输入卖方姓名" class="input1"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="报单人姓名：" label-width="100px">
                            <el-input placeholder="输入报单人姓名" class="input1"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="交易类型：" label-width="100px">
                            <el-input placeholder="输入交易类型" class="input1"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="报单日期：" label-width="85px">
                        <el-date-picker
                            class="input2"
                            v-model="value1"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                        <span class="lineStyle">-</span>
                        <el-date-picker
                            class="input2"
                            v-model="value1"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="" label-width="85px">
                        <span class="b-button">搜索</span>
                        <span class="b-button">重置</span>
                    </el-form-item>
                </el-row> 
            </el-form>
        </div>
        <div class="main">
            <ListTopArr title="待收单列表" num="25"></ListTopArr>
        </div>
        <div class="main table-list-box">
            <el-table width="100%" :data="tabelData.list">
                <el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
                <el-table-column label="合同编号" align="center" width="90">
                    <template slot-scope="scope">
                        {{scope.row.number}}
                    </template>
                </el-table-column>
                <el-table-column label="买方" align="left" width="130">
                    <template slot-scope="scope">
                        {{scope.row.agent1}}<br/>
                        {{scope.row.agent1_phone}}
                    </template>
                </el-table-column>
                <el-table-column label="卖方" align="left" width="130">
                    <template slot-scope="scope">
                        {{scope.row.agent2}}<br/>
                        {{scope.row.agent2_phone}}
                    </template>
                </el-table-column>
                <el-table-column label="报单人" align="left" width="160">
                    <template slot-scope="scope">
                        {{scope.row.agent3}}<br/>
                        {{scope.row.agent3_phone}}
                    </template>
                </el-table-column>
                <el-table-column label="小区名称" align="left" width="230">
                    <template slot-scope="scope">
                        {{scope.row.houseName}}
                    </template>
                </el-table-column>
                <el-table-column label="类型" align="left" width="110">
                    <template slot-scope="scope">
                        {{scope.row.type}}
                    </template>
                </el-table-column>
                <el-table-column label="报单日期" align="left" width="110">
                    <template slot-scope="scope">
                        {{scope.row.date}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" >
                    <template slot-scope="scope">
                        <div>
                            <p><span class="dib text-btn" @click="acceptFn">收件</span><span class="dib text-btn">拒件</span><span class="dib text-btn">转件</span></p>
                        </div>
                        <div>
                            <p><span class="dib text-btn text-dis">转移</span><span class="dib text-btn text-dis">楚力</span></p>
                            <p><span class="dib text-btn text-dis">2019-05-16 15:25</span></p>
                        </div>
                        <div>
                            <p>
                                <span class="dib text-btn text-dis">已据件</span>
                                 <el-popover
                                    placement="top-start"
                                    title="据件原因"
                                    width="200"
                                    trigger="hover"
                                    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                                    <span class="dib text-btn" slot="reference">原因</span>
                                </el-popover>
                            </p>
                        </div>
                    </template>
                </el-table-column>
                <div slot="empty">
                   <ListErrBox></ListErrBox>
                </div>
            </el-table>
            <div class="page-box">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :current-page.sync="page"
                    @current-change="changePage"
                    :page-size="2"
                    :total="tabelData.total">
                </el-pagination>
            </div>
        </div>
        <el-dialog class="dialog-footer-center" title="收件提醒" :visible.sync="visible1" width="430px">
            <div class="">
                <p>确认要接收此递件单吗？</p>
                <p>报单人：张斌</p>
                <p>小区：西里小区1-1-1-1</p>
            </div>
            <span slot="footer">
                <el-button type="primary">确定</el-button>
                <el-button>取消</el-button>
            </span>
        </el-dialog>
        <el-dialog class="dialog-footer-center" title="据件原因" :visible.sync="visible2" width="610px">
            <el-form>
                <el-form-item><el-input type="textarea" :rows="6" placeholder="输入据件原因"></el-input></el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary">确定</el-button>
                <el-button>取消</el-button>
            </span>
        </el-dialog>
         <el-dialog class="dialog-footer-center" title="请选择专员" :visible.sync="visible3" width="870px">
            <el-form>
                <div class="btn-title"><span class="dib active">公司专员</span><span class="dib">平台专员</span></div>
                <ul class="post-list">
                    <li class="dib">
                        <el-image class="dib img"></el-image>
                        <div class="dib">
                            <p class="name">张凯多</p>
                            <p class="post">贷款专员</p>
                            <p class="phone">173657729551</p>
                        </div>
                        <i class="icon"></i>
                    </li>
                    <li class="dib">
                        <el-image class="dib img"></el-image>
                        <div class="dib">
                            <p class="name">张凯多</p>
                            <p class="post">贷款专员</p>
                            <p class="phone">173657729551</p>
                        </div>
                        <i class="icon"></i>
                    </li>
                    <li class="dib active">
                        <el-image class="dib img"></el-image>
                        <div class="dib">
                            <p class="name">张凯多</p>
                            <p class="post">贷款专员</p>
                            <p class="phone">173657729551</p>
                        </div>
                        <i class="icon"></i>
                    </li>
                    <li class="dib">
                        <el-image class="dib img"></el-image>
                        <div class="dib">
                            <p class="name">张凯多</p>
                            <p class="post">贷款专员</p>
                            <p class="phone">173657729551</p>
                        </div>
                        <i class="icon"></i>
                    </li>
                </ul>
                <el-form-item class="dn"><el-input type="hidden" :rows="6" placeholder="输入据件原因"></el-input></el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary">确定</el-button>
                <el-button>取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import ListTopArr from '../../components/ListTopArr'
import ListErrBox from '../../components/ListErrBox'
export default {
    components: {
        ListTopArr,
        ListErrBox
    },
    data() {
        return {
            visible1: false,
            visible2: false,
            visible3: true,
            page : 2,
            tabelData : {
                total : 1000,
                list : [
                    {
                        number : 1805366,
                        agent1 : '刘涛',
                        agent1_phone : '17367729551',
                        agent2 : '王柯',
                        agent2_phone : '17367729551',
                        agent3 : '王名',
                        agent3_phone : '17367729551',
                        houseName : '西里小区1-1-1',
                        type : '购房贷款',
                        date : '2018-11-7',
                    },
                    {
                        number : 1805366,
                        agent1 : '刘涛',
                        agent1_phone : '17367729551',
                        agent2 : '王柯',
                        agent2_phone : '17367729551',
                        agent3 : '王名',
                        agent3_phone : '17367729551',
                        houseName : '西里小区1-1-1',
                        type : '购房贷款',
                        date : '2018-11-7',
                    },
                    {
                        number : 1805366,
                        agent1 : '刘涛',
                        agent1_phone : '17367729551',
                        agent2 : '王柯',
                        agent2_phone : '17367729551',
                        agent3 : '王名',
                        agent3_phone : '17367729551',
                        houseName : '西里小区1-1-1',
                        type : '购房贷款',
                        date : '2018-11-7',
                    },
                      {
                        number : 1805366,
                        agent1 : '刘涛',
                        agent1_phone : '17367729551',
                        agent2 : '王柯',
                        agent2_phone : '17367729551',
                        agent3 : '王名',
                        agent3_phone : '17367729551',
                        houseName : '西里小区1-1-1',
                        type : '购房贷款',
                        date : '2018-11-7',
                    }
                ]
            },
            value1 : ''
        };
    },
    computed: {},
    watch: {},
    methods: {
        changePage(){}
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
@import url('../../assets/css/list-top-style1.less');
.post-list{
     .mgl(-22px);
    .pd(20px 62px 0 58px);
    li{
        position: relative;
        box-sizing: border-box;
        .mg(0 0 20px 22px);
        .pd(10px);
        .w(222px);
        .h(108px);
        .bd(1px,solid,@b8);
        cursor: pointer;
        .img{
            .mgr(17px);
            .w(65px);
            .h(87px);
            .bd(1px,solid,@b8);
            .bgc(#F5F7FA);
        }
        .name{
            .height(22px);
            .c(@cblack);
            .ft(16px);
            .fw(900);
        }
        .post{
            .height(34px);
            .c(@c666);
        }
        .phone{
            .height(22px);
            .c(@c666);
        }
        .icon{
            display: none;
            position: absolute;
            right: 0;
            bottom: 0;
            .w(35px);
            .h(35px);
            .bgi(0 -54px);
        }
        &:hover{
            .bdc(@green);
        }
    }
    li.active{
        .bdc(@green);
        .icon{
            display: block;
        }
    }
}
.btn-title{
    span{
        .pdb(13px);
        .bdbx(2px,solid,transparent);
    }
    span+span{
        .mgl(12px);
       
        cursor: pointer;
    }
    span.active{
        .bdbx(2px,solid,@green);
        .c(@green);
    }
}

</style>