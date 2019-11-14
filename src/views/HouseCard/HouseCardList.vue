<template>
    <div class="">


        <div class="main">
            <!-- 测试封装上传图片 -->
                <!-- <uploadMultiple></uploadMultiple> -->
            <!-- end -->
        </div>

        <!-- 房本管理 -->
        <div class="main">
            <TopNavList :listData="navList"></TopNavList>
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
            <el-form label-width="108px" :rules="rules" ref="dialogAddTurn" :model="formData">
                <el-form-item label="流转类型" prop="turnID">
                    <el-select style="width: 418px" v-model="formData.turnID" placeholder="选择流转类型">
                        <el-option v-for="(item,index) in formData.turnOption" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收本原因" prop="cause">
                    <el-select style="width: 418px" v-model="formData.cause" placeholder="选择收本原因">
                        <el-option v-for="(item,index) in formData.causeList" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="系统号" prop="value9">
                    <el-select
                        style="width: 418px" 
                        v-model="formData.value9"
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
                <el-form-item label="备注" prop="textarea">
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
                <el-button @click="()=>{this.dialogAddTurn = false;this.resetForm('dialogAddTurn')}">取消</el-button>
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
            navList : [
                {title : '房本类型',list : [{title : '不限',id : 'a0'},{title : '市证',id : 'a1'},{title : '村证',id : 'a2'},{title : '其他',id : 'a3'}]},
                {title : '业务类型',list : [{title : '不限',id : 'b0'},{title : '买卖成交',id : 'b1'},{title : 'VIP',id : 'b2'},{title : '二手房新出本',id : 'b3'},{title : '抵押贷款',id : 'b4'}]},
                {title : '房本状态',list : [{title : '不限',id : 'c0'},{title : '录入',id : 'c1'},{title : '收本',id : 'c2'},{title : '业主取走',id : 'c3'}]},
            ],
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
                turnID : '',
                turnOption : [
                    {value : 1 ,label : '流转类型一'},
                    {value : 2 ,label : '流转类型二'},
                    {value : 3 ,label : '流转类型三'},
                    {value : 4 ,label : '流转类型四'},
                    {value : 5 ,label : '流转类型五'},
                ],
                cause : '',
                causeList : [
                    {value : 1 ,label : '收本原因一'},
                    {value : 2 ,label : '收本原因二'},
                    {value : 3 ,label : '收本原因三'},
                    {value : 4 ,label : '收本原因四'},
                    {value : 5 ,label : '收本原因五'},
                ],
                region: '',
                region2: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: '',
                textarea : "",
                value9 : []
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

            rules : {
                turnID: [
                    { required: true, message: '请选择流转类型', trigger: 'change' }
                ],
                cause: [
                    { required: true, message: '请选择收本原因', trigger: 'change' }
                ],
                value9 :[
                    {required : true, message : '请选择系统号', trigger: 'blur'}
                ],
                textarea: [
                    {required : true, message : '请填写备注信息', trigger: 'blur'}
                ],
            }
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
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
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