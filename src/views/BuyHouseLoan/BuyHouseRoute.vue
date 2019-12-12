<template>
    <div>
        <div class="main">
            <el-form class="sreach-box">
                <ul class="tag-list">
                    <li>待收单</li>
                    <li>在途单</li>
                    <li>结件单</li>
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
                     <el-form-item label="交易状态" label-width="85px">
                        <el-checkbox>买卖双方资料确认</el-checkbox>
                        <el-checkbox>收款确认</el-checkbox>
                        <el-checkbox>备件通知</el-checkbox>
                        <el-checkbox>组卷评估</el-checkbox>
                        <el-checkbox>面签通知</el-checkbox>
                        <el-checkbox>面签完成</el-checkbox>
                        <el-checkbox>银行待审核</el-checkbox>
                        <el-checkbox>垫资解压待反馈</el-checkbox>
                        <el-checkbox>网签通知</el-checkbox>
                        <el-checkbox>网签完成</el-checkbox>
                        <el-checkbox>网签合同盖章</el-checkbox>
                        <el-checkbox>银行配额通知</el-checkbox>
                        <el-checkbox>服务费确认</el-checkbox>
                        <el-checkbox>过户对接</el-checkbox>
                        <el-checkbox>过户通知</el-checkbox>
                        <el-checkbox>过户结果</el-checkbox>
                        <el-checkbox>过户录入新房本</el-checkbox>
                        <el-checkbox>抵押交接</el-checkbox>
                        <el-checkbox>银行办理抵押</el-checkbox>
                        <el-checkbox>取他项</el-checkbox>
                        <el-checkbox>银行划款至业主账号</el-checkbox>
                        <el-checkbox>抵押专员交本</el-checkbox>
                        <el-checkbox>确认收本</el-checkbox>
                        <el-checkbox>完成</el-checkbox>
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
            <el-table width="100%">
                <el-table-column label="序号" type="index" align="center" width="60"></el-table-column>
                <el-table-column label="合同编号" align="center" width="90"></el-table-column>
                <el-table-column label="买方" align="left" width="130"></el-table-column>
                <el-table-column label="卖方" align="left" width="130"></el-table-column>
                <el-table-column label="报单人" align="left" width="160"></el-table-column>
                <el-table-column label="小区名称" align="left" width="230"></el-table-column>
                <el-table-column label="类型" align="left" width="110"></el-table-column>
                <el-table-column label="报单日期" align="left" width="110"></el-table-column>
                <el-table-column label="操作" align="center" ></el-table-column>
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
            page : 2,
            tabelData : {
                total : 1000
            }
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


</style>