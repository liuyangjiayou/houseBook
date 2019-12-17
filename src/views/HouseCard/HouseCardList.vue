<template>
    <div class="">
        <!-- 房本管理 -->
        <div class="main">
             <div class="nav-wrap">
                <!-- table列表上面的Nav导航 -->
                <div>
                    <input type="text" v-model="keyword" class="keyword-input" placeholder="输入产权人姓名">
                    <span class="button dib2" @click="sreachFn">搜索</span>
                </div>
                <div class="nav-box" v-for="(v1,i1) in navList" :key="i1">
                    <p class="dib2">{{v1.title}}：</p>
                    <ul class="dib2">
                        <li v-for="(v2,i2) in v1.list" :key="i2" :id="v2.id" :class="['dib2','nav_'+v2.id,{'active' : navResultList.some(item=>item.id == v2.id)}]" @click="navChangeRadioFn($event,v2,i2)">{{v2.title}}</li>
                    </ul>
                </div>
                <div v-show="navResultList.length > 0" class="nav-result-box">
                    <p>已选：</p>
                    <ul>
                        <li v-for="(item,index) in navResultList" :key="index" class="dib2">{{item.title || item.owner_name}}<span :class="[item.owner_name ? 'keyAction' : '']" @click="removeNavFn($event,item)"><i></i></span></li>
                        <li class="dib2 last-li" @click="clearNavFn"><i></i>清空已选</li>
                    </ul>
                    <ul>
                        <!-- <li v-for="(item,index) in navResultIdList" :key="index">{{item}}</li> -->
                    </ul>
                </div>
            </div>
        </div>
        <div class="main">
            <ListTopArr title="房本列表" :num="tabelData.total"></ListTopArr>
        </div>
        <div class="table-list-box main">
            <el-table :data="tabelData.list" style="width:100%">
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
                        <div class="dib text-btn popover-warp" @mouseover="setQRcode($event,scope.row.id)">
                            二维码
                            <div class="popover-box">
                                <div class="qrcode-box"></div>
                                <div class="text-box">
                                    <div>
                                        <p>房本地址：</p>
                                        <p> {{scope.row.address}}</p>
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
            <div class="page-box" v-show="tabelData.list && tabelData.list.length > 0">
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
        <!-- 添加流转记录弹窗 -->
        <el-dialog class="dialog-footer-center" title="添加流转记录" :visible.sync="dialogAddTurn" width="720px">
            <el-form label-width="108px" ref="dialogAddTurn" :model="formData">
                <el-form-item label="流转类型" prop="status" :rules="formDataRules.status">
                    <el-select style="width: 418px" v-model="formData.status" placeholder="选择流转类型">
                        <el-option v-for="(v,i) in formData.status_list" :key="i" :label="v.label" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收本原因" prop="reason" :rules="formDataRules.reason">
                    <el-select style="width: 418px" v-model="formData.reason" placeholder="选择收本原因">
                        <el-option v-for="(v,i) in formData.reason_list" :key="i" :label="v.label" :value="v.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="系统号" prop="user_id" :rules="formDataRules.user_id">
                    <el-select
                        style="width: 418px" 
                        v-model="formData.user_id"
                        filterable
                        remote
                        placeholder="请输入关键词"
                        :remote-method="remoteMethod"
                        :loading="loading">
                        <el-option
                            v-for="(item,index) in user_list"
                            :key="index"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remarks" :rules="formDataRules.remarks">
                    <el-input
                        style="width: 418px"
                        type="textarea"
                        :rows="3"
                        placeholder="请输备注"
                        v-model="formData.remarks">
                    </el-input>
                </el-form-item>
                <el-form-item label="收本凭证">
                    <uploadMultiple ref="aaa"></uploadMultiple>
                    <el-input type="hidden" v-model="formData.fileList"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="">
                <el-button type="primary" @click="submit('dialogAddTurn')">保存</el-button>
                <el-button @click="()=>{this.dialogAddTurn = false;this.resetForm('dialogAddTurn')}">取消</el-button>
            </span>
        </el-dialog>
        <!-- 编辑房本 -->
        <el-dialog class="dialog-footer-center" title="编辑房本" :visible.sync="dialogEdit" width="874px">
            <el-form ref="dialogAddEdit" :model="editFormData">
                <el-row>
                    <el-col :span="8">
                        <el-form-item :show-message="false" label="房产证号" label-width="106px" prop="number" :rules="editFormDataRules.number">
                            <el-input placeholder="输入房产证编号" v-model="editFormData.number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="房产证类型" label-width="106px" prop="property_cert" :rules="editFormDataRules.property_cert">
                            <el-select v-model="editFormData.property_cert">
                                <el-option v-for="(v,i) in editFormData.property_cert_list" :key="i" :label="v.label" :value="v.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="产权人" label-width="106px" prop="owner_name" :rules="editFormDataRules.owner_name">
                            <el-input placeholder="输入产权人姓名" v-model="editFormData.owner_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="有无公证书" label-width="106px" prop="has_auth" :rules="editFormDataRules.has_auth">
                            <el-radio v-model="editFormData.has_auth" v-for="(v,i) in editFormData.has_auth_list" :key="i" :label="v.id">{{v.label}}</el-radio>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="是否共有" label-width="106px" prop="is_common" :rules="editFormDataRules.is_common">
                        <el-radio v-model="editFormData.is_common" v-for="(v,i) in editFormData.is_common_list" :key="i" :label="v.id" @change="isCommonFn">{{v.label}}</el-radio>
                    </el-form-item>
                </el-row>
                <el-row v-show="editFormData.is_common == 1" v-for="(v,i) in editFormData.commonlist" :key="i">
                    <el-col :span="8">
                        <el-form-item label="共有人姓名" label-width="106px" :prop="'commonlist.'+i+'.common_name'" :rules="editFormDataRules.common_name">
                            <el-input v-model="v.common_name" placeholder="输入共有人姓名"></el-input>
                        </el-form-item>
                    </el-col >
                    <el-col :span="8">
                        <el-form-item label="房产证号" label-width="106px">
                            <el-input v-model="v.common_number" placeholder="输入房产证号"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item v-show="editFormData.is_common == 1" label="" label-width="106px"><el-button type="text" @click="addCommonFn">+添加共有人</el-button></el-form-item>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="房本地址" label-width="106px" prop="address" :rules="editFormDataRules.address">
                            <el-input v-model="editFormData.address" placeholder="输入房本地址"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <el-form-item label="备注" label-width="106px" prop="remarks" :rules="editFormDataRules.remarks">
                            <el-input
                                type="textarea"
                                :rows="4"
                                v-model="editFormData.remarks"
                                placeholder="输入备注内容">
                            </el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="">
                <el-button type="primary" @click="editHouseCartSub('dialogAddEdit')">保存</el-button>
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
import { nextTick, Promise } from 'q'
import QRCode from 'qrcodejs2'
import { get, post } from '../../api/api.js'
export default {
    components: {
        ListTopArr,
        Footer,
        ListErrBox,
        uploadMultiple
    },
    data() {
        return {
            //这是真正的数据table数据
            tabelData : '',
            //这是navList导航数据
            navList : [],
            //这是搜索条见选中的数组列表
            navResultList : [],
            navResultIdList : [],
            //这是关键字查询的值
            keyword : '',
            owner_name : '',//搜索的产权人条件
            //页码
            page : 1,
            dialogAddTurn : false,
            dialogEdit : false, //控制编辑房本弹窗

            //添加流转记录
            formData: {
                cert_id : '', //房本id
                status : '', //流转类型
                status_list : '', //流转类型列表
                reason : '', //收本原因
                reason_list : '', //收本原因列表
                user_id : '' , //系统号/用户id
                dept_id	: '', //用户id所属部门id
                remarks	: '', //备注
                image	: '' , //收本凭证，多张图片用,隔开
            },
            formDataRules : {
                status: [
                    { required: true, message: '请选择流转类型', trigger: 'change' }
                ],
                reason: [
                    { required: true, message: '请选择收本原因', trigger: 'change' }
                ],
                user_id :[
                    {required : true, message : '请选择系统号', trigger: 'change'}
                ],
                remarks: [
                    {required : true, message : '请填写备注信息', trigger: 'blur'}
                ],
            },
            user_list: [],
            loading : false,
            //编辑房本
            editFormData :{
                cert_id : "", 
                number : "", //房产证号
                owner_name : "", //产权人
                address : "", //房本地址
                property_cert : "",//房产证类型
                has_auth : "", //有无公证书
                is_common : "", //是否共有
                common_name : "", //共有人姓名
                remarks : "",//备注
                property_cert_list : "",//房产证类型列表
                has_auth_list : "",//有无公证书列表
                is_common_list : "",//是否共有列表
            },
            editFormDataRules : {
                cert_id : [
                    {required : true,message : '缺失房本ID',trigger : 'blur'}
                ],
                number : [
                    {required : true,message : '请填写房产证号',trigger : 'blur'}
                ],
                owner_name : [
                    {required : true,message : '请填写产权人',trigger : 'blur'}
                ],
                address  : [
                    {required : true,message : '请填写房本地址',trigger : 'blur'}
                ],
                property_cert : [
                    {required : true,message : '请选择房产证类型',trigger : 'change'}
                ],
                has_auth : [
                    {required : true,message : '请填写选择有无公证书',trigger : 'blur'}
                ],
                is_common : [
                    {required : true,message : '请选择是否共有',trigger : 'change'}
                ],
                common_name  : [
                    {required : true,message : '请填写共有人姓名',trigger : 'blur'}
                ],
                remarks : [
                    {required : true,message : '请填写备注',trigger : 'change'}
                ]
            },
        };
    },
    computed: {},
    watch: {},
    methods: {
        goDetails(id){
            this.$router.push({ path: '/houseCard/details',query : {cid : id}});
        },
        /* 添加流转记录 */
        addTurn(id){
            post('/Index/formNav',{cert_id : id,type : 'transfer'}).then(res=>{
                this.formData = res.data
                this.dialogAddTurn = true;
            });         
        },
        /* 系统号搜索 */
        remoteMethod(query) {
            if (query !== '') {
            this.loading = true;
                post('/User/getAgentInfo',{val : query}).then(res=>{
                    this.loading = false;
                    this.user_list = res.data.list;
                })
            } else {
                this.user_list = [];
            }
        },
        /* 编辑房本获取数据弹窗 */
        editHouseCart(id){
            post('/Index/formNav',{cert_id : id,type : 'housecert'}).then(res=>{
                this.editFormData = res.data;
                this.dialogEdit = true;
                console.log(res.data);
            });
        },
        /* 是否有共有人 */
        isCommonFn(val){
            if(val == 0){
                this.editFormData.commonlist = this.editFormData.commonlist.filter(item => !item.key);
            }
        },
        /* 添加共有人 */
        addCommonFn(){
            this.editFormData.commonlist.push({common_name : '',common_number : '',key: true})
        },
        addDataFn(arr,oldData) {
            let newData = {};
            arr.forEach(item=>newData[item] = oldData[item]);
            return newData;
        },
        /* 提交编辑房本 */
        editHouseCartSub(formName){
            let that = this;
            that.submitForm(formName,function(){
            let data = that.addDataFn(['cert_id','number','owner_name','address','property_cert','has_auth','is_common','common_name','remarks'],that.editFormData);
                post('/Index/editHouseCert',data).then(res=>{
                    if(res.errcode == 0){
                        that.$message({
                            message : res.msg,
                            type : 'success'
                        });
                        that.dialogEdit = false;
                    }
                    
                });
            },function(errArr){
                console.log(errArr[0].validateMessage);
            })
        },
        submitForm(formName,sub,err) {
            this.$refs[formName].validate((valid) => {
                console.log(valid);
               if (valid) {
                    sub()
                } else {
                    let errArr = this.$refs[formName].fields.filter((item)=>{
                        return item.validateState != 'success'
                    })
                    err(errArr)
                    return false;
                }
            });
        },
        /* 重置表单 */
        resetForm(formName) {
            this.$refs[formName].resetFields();
            // this.$refs.aaa.updata.clearFiles();
        },
        /* 当点击Nav导航单选的时候 */
        navChangeRadioFn(e,v,i){
            let that = this;
            let ele = e.currentTarget;
            let sbi = that.$siblings(ele);
            if(that.$hasClass(ele,'active') && i == 0){return false};
            sbi.forEach(item1 => {
                let id = item1.getAttribute('id');
                that.navResultList = that.navResultList.filter(item2 => item2.id != id);
                that.navResultIdList = that.navResultIdList.filter(item2 => item2 != id);
            });
            if(i != 0 && that.$hasClass(ele,'active')){
                that.navResultList = that.navResultList.filter(item2 => item2.id != v.id);
                that.navResultIdList = that.navResultIdList.filter(item2 => item2 != v.id);
            }else{
                i != 0 ? that.navResultList.push(v) : null;
                i != 0 ? that.navResultIdList.push(v.id) : null;
            }
            this.page = 1;
            this.getListAjax();
        },
        /* 删除某一项数据 */
        removeNavFn(e,v){
            if(this.$hasClass(e.currentTarget,'keyAction')){
                this.owner_name = '';
                this.keyword = '';
            }
            this.navResultList = this.navResultList.filter(item => item.id != v.id);
            this.navResultIdList = this.navResultIdList.filter(item => item != v.id);
            this.page = 1;
            this.getListAjax();
        },
        /* 清除数据 */
        clearNavFn(){
            this.navResultList = [];
            this.navResultIdList = [];
            this.owner_name = '';
            this.keyword = '';
            this.getListAjax();
            this.page = 1;
        },
        /* 点击搜索功能 */
        sreachFn(){
            if(this.keyword == ""){return false;}
            let ownerData = {};
            ownerData.flag = 'key';
            ownerData.id = 'id'+this.keyword;
            ownerData.owner_name = this.keyword;
            this.owner_name = this.keyword;
            if(this.navResultList.length > 0 && this.navResultList[0].flag){
                this.navResultList[0] = ownerData
            }else{
                this.navResultList.unshift(ownerData);
            }
            this.page = 1;
            this.getListAjax();
        },
         /* 页码改变的时候 */
        changePage(curPage){
            this.page = curPage;
            this.getListAjax()
        },
        /* 设置二维码 */
        setQRcode(e,id){
            let codeEle = e.currentTarget.querySelector('.qrcode-box');
            codeEle.innerHTML = "";
            new QRCode(codeEle,{
                text : '你好啊' + id,
                width : 100,
                height : 100,
                colorDark : '#000',
                colorLight : '#fff',
                correctLevel: QRCode.CorrectLevel.H
            });
        },
        /* 请求列表 */
        getListAjax(){
            get('/Index/lists',{owner_name : this.owner_name,type : this.navResultIdList,page : this.page}).then(res=>{
                this.tabelData = res.data;
            });
        },
        /* 上传图片 */
        submit(formName){
            let that = this;
            that.submitForm(formName,function(){
            let data = that.addDataFn(['cert_id','status','reason','user_id','dept_id','remarks','image'],that.formData);
                post('/Index/editHouseCert',data).then(res=>{
                    if(res.errcode == 0){
                        that.$message({
                            message : res.msg,
                            type : 'success'
                        });
                        that.dialogEdit = false;
                    }
                    
                });
            },function(errArr){
                console.log(errArr[0].validateMessage);
            })
        }
    },
    created() {
        get('/Index/searchNav').then(res=>{
            this.navList = res.data.navlist;
        });
        this.getListAjax()
    },
    mounted() {    
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

.nav-wrap{
    box-sizing: border-box;
    .pd(20px);
    .w(100%);
    .bd(1px,solid,@e6);
    .bgc(@white);
    .minh(270px);
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