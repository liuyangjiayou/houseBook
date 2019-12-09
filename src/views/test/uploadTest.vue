<template>
  <div class="content-box">
    <ul class="view-list">
      <li v-for="(item,index) in fileLists" :key="index">
        <el-progress v-show="item.isPrs" :width="100" class="progress" type="circle" :status="item.isPrsType" :percentage="item.prsNum"></el-progress>
        <el-image :src="item.url" style="width:100px;height:100px"></el-image>
        <span @click="delFileFn(item)">删除</span>
      </li>
    </ul>
    <el-upload
      class="upload-demo"
      ref="upload"
      list-type="picture-card"
      action="http://localhost:4000/api/uploader"
      :limit="100000"
      :multiple="true"
      :disabled="false"
      :on-change="addFileFn"
      :on-success="successFn"
      :on-error="errFn"
      :on-progress="progressFn"
      :on-exceed="exceedFn"
      :show-file-list="false"
      :file-list="fileLists"
      name="aaa"
      :auto-upload="false">
    </el-upload>
    <p><el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button></p>
     
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
        prsNum:0,
        percentage: 10,
        username : '',
        passwrod : '',
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false,
        fileLists: [],
        valueList : [],
      };
    },

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {},

    methods: {
      /* 上传成功 */  
      successFn(res,file,fileList){
         let fileItem = this.fileLists.find(item=>item == file);
         if(res.errcode != 0){
            fileItem.isPrsType = "exception";
         }else{
            fileItem.isPrsType = "success";
            this.valueList.push(res.name);
         }
         console.log(this.valueList.length);
         console.log(this.fileLists.length);
        if(this.valueList.length !== this.fileLists.length){
          this.$refs.upload.submit();
        }else{
        }
         
      },
      delFileFn(file){
        this.fileLists = this.fileLists.filter(item=>item != file);
      },
      addFileFn(file, fileList){
        this.fileLists = fileList;
        console.log(this.fileLists);
      },
      progressFn(event, file, fileList){
        let fileItem = this.fileLists.find(item=>item == file);
        fileItem.isPrs = true;
        let percent=(event.loaded / event.total * 100) | 0
        fileItem.prsNum = percent;
      },
      errFn(){

      },
      exceedFn(){//文件超出最大数
        console.log('最多可上传5张文件')
      },
      submitUpload(){//开始上传文件
        this.$refs.upload.submit();
      }
      
    },

    watch: {

    }

  }

</script>
<style lang='less' scoped>
.content-box{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  background: #2d3a4b;
  form{
    padding: 160px 35px 0;
    width: 450px;
    .title{
      display: flex;
      justify-content: center;
      margin-bottom: 40px;
      font-size: 26px;
      color: #fff;
      font-weight: 900;
    }
    .info-box{
      display: flex;
      align-items: center;
     justify-content: space-between;
     div:nth-child(1) p{
       color: #fff;
       margin-bottom: 10px;
     }
    }
  }
}
.view-list{
  overflow: hidden;
  li{
    position: relative;
    float: left;
    .progress{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      background: rgba(0,0,0,.5);
    }
  }
}
</style>