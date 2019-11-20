<template>
    <div class="">
        <!-- 房本管理 -->
        <div class="main">
             <div class="nav-wrap">
                <!-- table列表上面的Nav导航 -->
                <div>
                    <input type="text" class="keyword-input" placeholder="输入产权人姓名">
                    <span class="button dib2">搜索</span>
                </div>
                <div class="nav-box" v-for="(v1,i1) in commonData.navlist" :key="i1">
                    <p class="dib2">{{v1.title}}：</p>
                    <ul class="dib2">
                        <li v-for="(v2,i2) in v1.item" :key="i2" :id="v2.id" class="dib2" @click="navChangeRadioFn($event,v2,i2)">{{v2.label}}</li>
                    </ul>
                </div>
                <div v-show="navResultList.length > 0" class="nav-result-box">
                    <p>已选：</p>
                    <ul>
                        <li v-for="(item,index) in navResultList" :key="index" class="dib2">{{item.label}}<span @click="removeNavFn(item)"><i></i></span></li>
                        <li class="dib2 last-li" @click="clearNavFn"><i></i>清空已选</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="main">
            <ListTopArr :num="commonData.total"></ListTopArr>
        </div>
        <div class="table-list-box main">
            <el-table :data="commonData.list" style="width:100%">
                <el-table-column label="序号" type="index" width="84" align="center"></el-table-column>
                <el-table-column label="产权人" width="120">
                    <template slot-scope="scope">
                        {{scope.row.owner_name}}
                    </template>
                </el-table-column>
                <el-table-column label="房本类型" width="127">
                    <template slot-scope="scope">
                        {{scope.row.property_cert}}
                    </template>
                </el-table-column>
                <el-table-column label="业务类型" width="150">
                    <template slot-scope="scope">
                        {{scope.row.business_type}}
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
                        <div class="dib text-btn" @click="goDetails(scope.row.id)">详情</div>
                        <div class="dib text-btn" @click="editHouseCart(scope.row.id)">编辑</div>
                        <div class="dib text-btn popover-warp" @mouseout="delQRcode($event)" @mouseover="setQRcode($event,scope.row.id)">
                            二维码
                            <div class="popover-box">
                                <div class="qrcode-box"></div>
                                <div class="text-box">
                                    <div>
                                        <p>房本地址：</p>
                                        <p>新华区新华路239号5-5-102</p>
                                    </div>
                                    <div class="text-btn text-underline">
                                        打印此房本
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dib text-btn" @click="addTurn(scope.row.id)">添加流转记录</div>
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
                    :page-size="10"
                    :total="commonData.total">
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
                    <uploadMultiple ref="aaa"></uploadMultiple>
                    <el-input type="hidden" v-model="formData.fileList"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="">
                <el-button type="primary" @click="dialogAddTurn = false">保存</el-button>
                <el-button @click="()=>{this.dialogAddTurn = false;this.resetForm('dialogAddTurn')}">取消</el-button>
            </span>
        </el-dialog>
        <!-- 编辑房本 -->
        <el-dialog class="dialog-footer-center" title="编辑房本" :visible.sync="dialogEdit" width="874px">
                <el-form ref="dialogAddEdit" v-model="formData2">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="房产证号" label-width="106px">
                                <el-input placeholder="输入房产证编号" v-model="formData2.houseCard"></el-input>
                            </el-form-item>
                        </el-col >
                        <el-col :span="8">
                            <el-form-item label="房产证类型" label-width="106px">
                                <el-select v-model="formData2.houseTypeAction">
                                    <el-option v-for="(v,i) in formData2.houseType" :key="i" :label="v.label" :value="v.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="产权人" label-width="106px">
                                <el-input placeholder="输入产权人姓名" v-model="formData2.name"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="有无公证书" label-width="106px">
                                <el-radio v-model="formData2.houseNotariza" v-for="(v,i) in formData2.houseNotarizaList" :key="i" :label="v.value">{{v.label}}</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="是否共有" label-width="106px">
                            <el-radio v-model="formData2.isCommon" v-for="(v,i) in formData2.isCommonList" :key="i" :label="v.value">{{v.label}}</el-radio>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="共有人姓名" label-width="106px">
                                <el-input v-model="formData2.commonName" placeholder="输入共有人姓名"></el-input>
                            </el-form-item>
                        </el-col >
                        <el-col :span="8">
                            <el-form-item label="房产证号" label-width="106px">
                                <el-input v-model="formData2.houseNum" placeholder="输入房产证号"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-form-item label="" label-width="106px"><el-button type="text">+添加共有人</el-button></el-form-item>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="房本地址" label-width="106px">
                                <el-input v-model="formData2.houseAddress" placeholder="输入房本地址"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="16">
                            <el-form-item label="备注" label-width="106px">
                                <el-input
                                    type="textarea"
                                    :rows="4"
                                    v-model="formData2.beizhu"
                                    placeholder="输入备注内容">
                                </el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <span slot="footer" class="">
                    <el-button type="primary" @click="dialogEdit = false">保存</el-button>
                    <el-button @click="()=>{this.dialogEdit = false;this.resetForm('dialogAddEdit')}">取消</el-button>
                </span>
        </el-dialog>
        <Footer></Footer>
    </div>
</template>

<script>
import ListTopArr from '../../components/ListTopArr'
import ListErrBox from '../../components/ListErrBox'
import Footer from '../../components/Footer'
import uploadMultiple from '../../components/upLoadMultiple'
import { nextTick } from 'q'
import QRCode from 'qrcodejs2'
import { post } from '../../api/api.js'
export default {
    components: {
        ListTopArr,
        Footer,
        ListErrBox,
        uploadMultiple
    },
    data() {
        return {
            commonData : '',
            navResultList : [],
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
            dialogEdit : false,
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
                value9 : [],
                fileList : "",
            },
            formData2 :{
                houseCard : 123456456,
                houseType : [
                    {value : 1, label : '市证'},
                    {value : 2, label : '村证'},
                ],
                houseTypeAction : 2,
                name : "刘杨",
                isCommonList : [
                    {value : 1,label : "独有"},
                    {value : 2,label : "共有"},
                ],
                isCommon : 2,
                houseNotarizaList : [
                    {value : 1,label : "有"},
                    {value : 2,label : "无"},
                ],
                houseNotariza : 2,
                commonName : "刘杨共有人",
                houseNum : 123123,
                houseAddress : "石家庄市平安公园",
                beizhu : "我是备注信息"
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
        /* 编辑房本 */
        editHouseCart(id){
            this.dialogEdit = true;
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$refs.aaa.updata.clearFiles();
        },
        /* 当点击Nav导航单选的时候 */
        navChangeRadioFn(e,v,i){
            let that = this;
            let ele = e.currentTarget;
            let sbi = that.$siblings(ele);
            if(that.$hasClass(ele,'active') && i == 0){return false};
            sbi.forEach(item1 => {
                let id = item1.getAttribute('id');
                item1.className = 'dib2';
                that.navResultList = that.navResultList.filter(item2 => item2.id != id);
            });
            if(i != 0 && that.$hasClass(ele,'active')){
                that.navResultList = that.navResultList.filter(item2 => item2.id != v.id);
            }else{
                i != 0 ? that.navResultList.push(v) : null;
            }
            ele.className = that.$hasClass(ele,'active') ? 'dib2' : 'dib2 active';
        },
        /* 删除某一项数据 */
        removeNavFn(v){
            this.navResultList = this.navResultList.filter(item => item.id != v.id);
        },
        /* 清除数据 */
        clearNavFn(){
            this.navResultList = [];
        },
        /* 设置二维码 */
        setQRcode(e,id){
            let codeEle = e.currentTarget.querySelector('.qrcode-box');
            new QRCode(codeEle,{
                text : '你好啊' + id,
                width : 100,
                height : 100,
                colorDark : '#000',
                colorLight : '#fff',
                correctLevel: QRCode.CorrectLevel.H
            });
        },
        /* 移除二维码 */
        delQRcode(e){
            e.currentTarget.querySelector('.qrcode-box').innerHTML = "";
        }
    },
    created() {
        post('/Index/lists/').then(res=>{
            this.commonData = res.data;
            console.log(this.commonData);
            this.navList = res.data.navlist
        })
    },
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
.nav-wrap{
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
.popover-warp{
    position: relative;
    .mg(0 10px);
    .popover-box{
        display: none;
        justify-content: flex-start;
        position: absolute;
        top: 30px;
        left: -130px;
        z-index: 1;
        .pd(20px);
        .bd(1px,solid,@blue);
        .bgc(@white);
        text-align: left;
        .qrcode-box{
            .mgr(12px);
            .w(100px);
            .h(100px);
        }
        .text-box{
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            .w(190px);
            p{
                .c(@wblack);
            }
        }
        &:before{
            content : "";
            position: absolute;
            top: -8px;
            left: 148px;
            .w(14px);
            .h(14px);
            .bd(1px,solid,@blue);
            border-bottom: transparent;
            border-right: transparent;
            .bgc(@white);
            transform: rotate(45deg);
        }
    }
    &:hover{
        .popover-box{
            display: flex;
        }
    }
}
</style>