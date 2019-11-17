<template>
    <div class="">
        <!-- 这是封装的多图上传的功能（样式是全局的样式 避免以后被覆盖 以liu开头的都是我后加的）-->
        <!-- 预览的 -->

        <!-- 选取文件 -->
        <el-upload
            class="liu-uploader-button"
            action="#"
            accept="image/jpeg,image/gif,image/png"
            multiple
            ref="updata"
            list-type="picture-card"
            :limit="limit"
            :file-list="fileList"
            :on-exceed="handleExceed"
            :on-change="addFile"	
         
            :auto-upload="false">
            <!-- 按钮的背景图 -->
            <i slot="default" class="liu-icon"></i>
            <!-- 按钮的文字表述 -->
            <p slot="default" class="liu-text">上传证据照片</p>
            <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                <el-image class="" :src="file.url" alt="" fit="scale-down"></el-image>
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                        <i class="el-icon-zoom-in"></i>
                    </span>
                    <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)">
                        <i class="el-icon-download"></i>
                    </span>
                    <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)">
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div>
        </el-upload>
    </div>
</template>

<script>

export default {
    components: {},
    props : {
        
    },
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            limit : 3,
            fileList : [],
            updata : '',
        };
    },
    computed: {},
    watch: {},
    methods: {
        handleRemove(file) {
            /* 删除图片 */
            this.$confirm(`确定要删除这张图片吗`, '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(()=>{
                this.fileList = this.fileList.filter((item)=>item.uid !== file.uid)
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
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload(file) {
            
        },
        addFile(file,fileList){
            this.fileList =fileList
        },
        /* 删除文件之后的钩子函数 */
        // removeTest(file,fileList){
        //     console.log(123123);
        // }

    },
    created() {},
    mounted() {
        console.log(this.$refs.updata);
        this.updata = this.$refs.updata
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
<style lang='less'>
@import url('../assets/css/common.less');
.liu-uploader-button .el-upload {
    position: relative;
    .w(170px);
    .h(130px);
    .bd(1px,dashed,@b8);
    .bdr(0);
    .bgc(@fc);
    cursor: pointer;
    overflow: hidden;

}
.liu-icon{
    position: absolute;
    top: 50%;
    left: 50%;
    .mgt(-34px);
    .mgl(-18px);
    .w(36px);
    .h(36px);
    .bgi(0 -16px);
}
.liu-text{
    position: absolute;
    top: 50%;
    left: 0;
    .mgt(14px);
    .w(100%);
    .height(22px);
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