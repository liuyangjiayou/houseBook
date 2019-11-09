<template>
    <div class="">
        <!-- 房本管理 -->
        <Header></Header>
        <div class="main">
            <Breadcrumb></Breadcrumb>
        </div>
        <div class="main">
            <TopNavList></TopNavList>
        </div>
        <div class="main">
            <ListTopArr></ListTopArr>
        </div>
        <div class="table-list-box main">
            <el-table :data="tableData" style="width:100%">
                <el-table-column label="序号" type="index" width="84" align="center" :index="index"></el-table-column>
                <el-table-column label="产权人" width="120">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                    </template>
                </el-table-column>
                <el-table-column label="房本类型" width="127">
                    <template slot-scope="scope">
                        {{scope.row.houseCardType}}
                    </template>
                </el-table-column>
                <el-table-column label="业务类型" width="150">
                    <template slot-scope="scope">
                        {{scope.row.type}}
                    </template>
                </el-table-column>
                <el-table-column label="房本地址" width="310">
                    <template slot-scope="scope">
                        {{scope.row.address}}
                    </template>
                </el-table-column>
                <el-table-column label="状态" width="126">
                    <template slot-scope="scope">
                        {{scope.row.status}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="text">详情</el-button>
                        <el-button type="text">编辑</el-button>
                        <el-button type="text">二维码</el-button>
                        <el-button type="text">添加流转记录</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-box">
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000">
                </el-pagination>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../components/Header'
import Breadcrumb from '../components/Breadcrumb'
import TopNavList from '../components/TopNavList'
import ListTopArr from '../components/ListTopArr'
import Footer from '../components/Footer'
export default {
    components: {
        Header,
        Breadcrumb,
        TopNavList,
        ListTopArr,
        Footer
    },
    data() {
        return {
            tableData : [{
                id : 1,
                houseCardType : '市证',
                name: '王新强',
                type : '业务类型',
                address : '上海市普陀区金沙江路 1518 弄',
                status : '录入'
            }, {
                id : 2,
                houseCardType : '市证',
                name: '王新强',
                type : '业务类型',
                address : '上海市普陀区金沙江路 1518 弄',
                status : '录入'
            }, {
                id : 3,
                houseCardType : '市证',
                name: '王新强',
                type : '业务类型',
                address : '上海市普陀区金沙江路 1518 弄',
                status : '录入'
            }, {
                id : 4,
                houseCardType : '市证',
                name: '王新强',
                type : '业务类型',
                address : '上海市普陀区金沙江路 1518 弄',
                status : '录入'
            },
            {
                id : 5,
                houseCardType : '市证',
                name: '王新强',
                type : '业务类型',
                address : '上海市普陀区金沙江路 1518 弄',
                status : '录入'
            },
            {
                id : 6,
                houseCardType : '市证',
                name: '王新强',
                type : '业务类型',
                address : '上海市普陀区金沙江路 1518 弄',
                status : '录入'
            },
            {
                id : 7,
                houseCardType : '市证',
                name: '王新强',
                type : '业务类型',
                address : '上海市普陀区金沙江路 1518 弄',
                status : '录入'
            },
            {
                id : 8,
                houseCardType : '市证',
                name: '王新强',
                type : '业务类型',
                address : '上海市普陀区金沙江路 1518 弄',
                status : '录入'
            }]
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
.table-list-box{.mgb(46px);.pdb(37px);.bgc(@white)}
.page-box{.pdt(37px);text-align: center;}

</style>