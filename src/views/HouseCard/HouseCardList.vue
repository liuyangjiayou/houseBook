<template>
    <div class="">


        <div class="main">
            <!-- 测试封装上传图片 -->
                <uploadMultiple></uploadMultiple>
            <!-- end -->
        </div>

        <!-- 房本管理 -->
        <div class="main">
            <TopNavList></TopNavList>
        </div>
        <div class="main">
            <ListTopArr></ListTopArr>
        </div>
        <div class="table-list-box main">
            <el-table :data="tableData" style="width:100%">
                <el-table-column label="序号" type="index" width="84" align="center"></el-table-column>
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
                        <el-button type="text" @click="goDetails(scope.row.id)">详情</el-button>
                        <el-button type="text">编辑</el-button>
                        <el-button type="text">二维码</el-button>
                        <el-button type="text" @click="addTurn(scope.row.id)">添加流转记录</el-button>
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
                    :total="1000">
                </el-pagination>
            </div>
        </div>
        <!-- 添加流转记录弹窗 -->
        <el-dialog class="dialog-footer-center" title="添加流转记录" :visible.sync="dialogAddTurn" width="720px">
            <el-form label-width="108px" :model="formData">
                <el-form-item label="流转类型">
                    <el-select style="width: 418px" v-model="formData.region" placeholder="选择流转类型">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收本原因">
                    <el-select style="width: 418px" v-model="formData.region2" placeholder="选择收本原因">
                        <el-option label="我是收本原因" value="123"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="系统号">
                    <el-select
                        style="width: 418px" 
                        v-model="value9"
                        filterable
                        remote
                        placeholder="请输入关键词"
                        :remote-method="remoteMethod"
                        :loading="loading">
                        <el-option
                            v-for="item in options4"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input
                        style="width: 418px"
                        type="textarea"
                        :rows="3"
                        placeholder="请输备注"
                        v-model="formData.textarea">
                    </el-input>
                </el-form-item>
                <el-form-item label="收本凭证">
                    <uploadMultiple></uploadMultiple>
                </el-form-item>
            </el-form>
            <span slot="footer" class="">
                <el-button type="primary" @click="dialogAddTurn = false">保存</el-button>
                <el-button @click="dialogAddTurn = false">取消</el-button>
            </span>
        </el-dialog>
        <Footer></Footer>
    </div>
</template>

<script>
import TopNavList from '../../components/TopNavList'
import ListTopArr from '../../components/ListTopArr'
import ListErrBox from '../../components/ListErrBox'
import Footer from '../../components/Footer'
import uploadMultiple from '../../components/upLoadMultiple'
export default {
    components: {
        TopNavList,
        ListTopArr,
        Footer,
        ListErrBox,
        uploadMultiple
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
            }, {
                id : 5,
                houseCardType : '市证',
                name: '王新强',
                type : '业务类型',
                address : '上海市普陀区金沙江路 1518 弄',
                status : '录入'
            }, {
                id : 6,
                houseCardType : '市证',
                name: '王新强',
                type : '业务类型',
                address : '上海市普陀区金沙江路 1518 弄',
                status : '录入'
            }, {
                id : 7,
                houseCardType : '市证',
                name: '王新强',
                type : '业务类型',
                address : '上海市普陀区金沙江路 1518 弄',
                status : '录入'
            }, {
                id : 8,
                houseCardType : '市证',
                name: '王新强',
                type : '业务类型',
                address : '上海市普陀区金沙江路 1518 弄',
                status : '录入'
            }],
            dialogAddTurn : false,
            formData: {
                name: '',
                region: '',
                region2: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                textarea : "填写备注"
            },
            options4: [],
            value9: [],
            list: [],
            loading: false,
            states: ["Alabama", "Alaska", "Arizona",
            "Arkansas", "California", "Colorado",
            "Connecticut", "Delaware", "Florida",
            "Georgia", "Hawaii", "Idaho", "Illinois",
            "Indiana", "Iowa", "Kansas", "Kentucky",
            "Louisiana", "Maine", "Maryland",
            "Massachusetts", "Michigan", "Minnesota",
            "Mississippi", "Missouri", "Montana",
            "Nebraska", "Nevada", "New Hampshire",
            "New Jersey", "New Mexico", "New York",
            "North Carolina", "North Dakota", "Ohio",
            "Oklahoma", "Oregon", "Pennsylvania",
            "Rhode Island", "South Carolina",
            "South Dakota", "Tennessee", "Texas",
            "Utah", "Vermont", "Virginia",
            "Washington", "West Virginia", "Wisconsin",
            "Wyoming"],
        };
    },
    computed: {},
    watch: {},
    methods: {
        goDetails(id){
            this.$router.push({ path: '/houseCard/details'});
        },
        addTurn(id){
            this.dialogAddTurn = true;
        },
        remoteMethod(query) {
            if (query !== '') {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                this.options4 = this.list.filter(item => {
                return item.label.toLowerCase()
                    .indexOf(query.toLowerCase()) > -1;
                });
            }, 200);
            } else {
            this.options4 = [];
            }
        },
        
    },
    created() {},
    mounted() {
        this.list = this.states.map(item => {
            return { value: item, label: item };
        });
    },
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
@import url('../../assets/css/common.less');
.table-list-box{.mgb(46px);.pdb(37px);.bgc(@white)}
.page-box{.pdt(37px);text-align: center;}

</style>