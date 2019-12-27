<template>
    <div class="ovh">
        <!-- 这是封装的多图上传的功能（样式是全局的样式 避免以后被覆盖 以liu开头的都是我后加的）-->
        <!-- 
            参数说明 uploadErrFn 类型 function 上传图片失败后的回调函数 需要父级传入
                    limit 类型number 最多可以上传的数量  默认是 10 张
                    multiple 类型boolean 是否可以多选 默认是 true
                    fileList 类型 []  这是图片展示的数组
         -->
        <!-- 预览的 -->
        <!-- <div class="view-img-list">
            <el-image fit="cover" style="width: 170px; height: 130px" :src="v.url"></el-image>
        </div> -->
        <div class="view-img-list" v-for="(v,i) in fileList" :key="i">
            <el-image fit="cover" style="width: 170px; height: 130px" :src="v.url"></el-image>
            <div :class="['progress-box-container',{'show' : v.percentage > 0}]">
                <div class="progress-box-wrap"></div>
                <el-progress v-if="v.status=='success'" :width="100" type="circle" status="success" :stroke-width="8" :show-text="false" class="progress-box" :percentage="v.percentage"></el-progress>
                <el-progress v-if="v.status=='exception'" :width="100" type="circle" status="exception" :stroke-width="8" :show-text="false" class="progress-box" :percentage="v.percentage"></el-progress>
                <el-progress v-if="v.status=='uploading'" :width="100" type="circle" :stroke-width="8" :show-text="false" class="progress-box" :percentage="v.percentage"></el-progress>
                <span v-if="v.status=='success'" class="text">上传成功 </span>
                <span v-if="v.status=='exception'" class="text cred">上传失败</span>
                <span v-if="v.status=='uploading'" class="text">上传中</span>
            </div>
            <div class="operation-box" @click="handleRemove(v)">删除</div>
        </div>
        <!-- 选取文件 -->
        <el-upload
            class="liu-uploader-button"
            action="/api/Upload/uploader"
            accept="image/jpeg,image/gif,image/png"
            :multiple="multiple"
            ref="updata"
            list-type="picture-card"
            :limit="limit"
            :file-list="updataFileList"
            :show-file-list="false"
            :with-credentials="true"
            :on-exceed="handleExceed"
            :on-change="addFile"
            :on-success="successFn"
            :on-remove="removeFn"
            :on-error="errorFn"
            :auto-upload="false">
            <!-- 按钮的背景图 -->
            <i slot="default" class="liu-icon"></i>
            <!-- 按钮的文字表述 -->
            <p slot="default" class="liu-text">上传证据照片</p>
        </el-upload>
        <!-- <el-button @click="clearFn">清除</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
         <!-- :http-request="uploadSubmit" -->
    </div>
</template>

<script>
import {post2} from '../api/api.js'
import axios from 'axios'
export default {
    components: {},
    props : {
        limit : {
            type : Number,
            default : 10
        },
        multiple : {
            type : Boolean,
            default : true,
        },
        imgList : {
            type : Array,
            default : function(){
                return []
            },
        }
    },
    data() {
        return {
            imgIdList : [], //这是放置图片标识的数组是用来传递给后台的
            disabled: false, //这是是否禁用（以后完善这个功能目前没有）
            fileList : [],
            updataFileList : [],
            imgArr : [],
            updata : '',
            progressDate : [], //进度条的数据
            flag : false,
        };
    },
    computed: {},
    methods: {
        handleRemove(file) {
            /* 删除图片 */
            this.$confirm(`确定要删除这张图片吗`, '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.fileList = this.fileList.filter((item)=>item.uid !== file.uid);
                this.updataFileList = this.updataFileList.filter(item => item.uid !== file.uid);
            }).catch(()=>{
               
            })
        },
        handleExceed(files, fileList){ 
            /* 文件超出个数限制时的时候 */
            this.$confirm(`你好，最多可以上传${this.limit}张图片`, '信息', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            });
        },
        addFile(file,fileList){
            this.updataFileList = fileList;
            if(file.status == 'ready'){this.fileList.push(file)};
            if(file.status == 'exception'){
                this.fileList.find(item=>{
                    if(item.uid = file.uid){
                        item == file
                    }
                })
            };
        },
        removeFn(file,fileList){
            //删除图片
            console.log(file.fileList);
        },
        successFn(res, file, fileList){ //文件上传成功后的函数
            // console.log(res,file,fileList);\
            if(res.errcode == 0){
               this.imgArr.push(res.data);
               if(this.imgArr.length == this.fileList.length){
                    this.$emit('update:imageId',this.imgArr.join(','));
                    this.$emit('uploadSucFn',this.imgArr);
               }
            }else{
                this.$refs.updata.abort();
                this.fileList.find(item => {
                    if(item.uid == file.uid){
                        item.status = 'exception'
                    }
                });
                this.$confirm(res.msg ? res.msg : '上传图片失败','提示',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {
                    this.$emit('uploadErrFn');
                });
            }
        },
        errorFn(err,file){
            /* 上传失败 服务器段的错误 */
            this.$refs.updata.abort();
            this.fileList.find(item => {
                if(item.uid == file.uid){
                    item.status = 'exception'
                }
            });
            this.$confirm('服务器错误或未找到上传地址','提示',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'error'
            });
        },
        submitUpload(){
            let fileList = this.fileList.filter(item=>!item.response)
            if(fileList.length > 0){
                this.$refs.updata.submit();
            }else{
                this.$emit('update:imageId',this.imgArr.join(','));
                this.$emit('uploadSucFn',this.imgArr);
            }
        },
        clearFn(){
            this.$refs.updata.clearFiles();
            this.fileList = [];
            this.imgArr = [];
        },
        /* 自定义上传 */
        uploadSubmit(files){ 
            let form = new FormData();
            let file = files.file;
            console.log(files);
            form.append('file',file);
            post2(files.action,form,{ 
                headers : {'Content-Type': 'multipart/form-data'},
                onUploadProgress: progressEvent => {
                    let percent=(progressEvent.loaded / progressEvent.total * 100) | 0
                    //调用onProgress方法来显示进度条，需要传递个对象 percent为进度值
                    this.fileList.find(item => {
                        if(item.uid == file.uid){
                          item.percentage = percent
                        }
                    })
                }
            }).then(res=>{
                this.fileList.find(item => {
                    if(item.uid == file.uid){
                        item.status = 'success'
                    }
                });
                this.$refs.updata.onSuccess(res,file)
            });
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
@import url('../assets/css/common.less');
/* 展示的列表 */
.view-img-list{
    position: relative;
    .ibvt();
    .mg(0 8px 8px 0);
    .w(168px);
    .h(128px);
    overflow: hidden;
    .bd();
    /* 操作区 */
    .operation-box{
        position: absolute;
        left: 0;
        bottom: 0;
    }
    /* 进度条 */
    .progress-box-container{
        position: absolute;
        top: 0;
        left : 0;
        .w(100%);
        .height(130px);
        z-index: -1;
        text-align: center;
        .text{
            position: relative;
            .c(@white);
            .ft(14px);
            .fw(900);
            z-index: 3;
        }
        .text.cred{
            .c(@red);
        }
    }
    .progress-box-container.show{
        z-index: 0;
    }
    .progress-box-wrap{
        position: absolute;
        top: 0;
        left : 0;
        .w(100%);
        .h(100%);
        .bgc(@wblack);
        opacity: 0.6;
    }
    .progress-box{
        position: absolute;
        top: 50%;
        left : 50%;
        .mg(-50px 0 0 -50px);
        z-index: 1;
        div {
            .c(@white);
            .ft(20px);
        };
    }
}

.el-upload--picture-card:hover, .el-upload:focus{
    .c(@green);
}
.el-upload-list--picture-card .el-upload-list__item{
    .w(170px);
    .h(130px);
    .bdr(0);
    .mgb(0);
}
</style>