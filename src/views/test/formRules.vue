<template>
<div>
   <el-dialog class="dialog-footer-center" title="编辑房本" :visible.sync="dialogEdit" width="874px">
        <el-form ref="dialogAddEdit" :model="editFormData">
            <el-row>
                <el-col :span="8">
                    <el-form-item label="房产证号" label-width="106px" prop="number" :rules="editFormDataRules.number">
                        <el-input placeholder="输入房产证编号" v-model="editFormData.number"></el-input>
                    </el-form-item>
                </el-col >
            </el-row>
        </el-form>
        <div v-for="(item,index) in test" :key="index">{{item}}</div>
        <el-button @click="addTest">确定</el-button>
        <span slot="footer" class="">
            <el-button type="primary" @click="editHouseCartSub('dialogAddEdit')">保存</el-button>
            <el-button @click="()=>{this.dialogEdit = false;this.resetForm('dialogAddEdit')}">取消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    name:'',
    props:[''],
    data () {
      return {
          aaa : '',
          test : [{
              value : "",
          }],
        dialogEdit : true,
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

    components: {},

    computed: {},

    beforeMount() {},

    mounted() {
      
    },

    methods: {
        addTest(){
            this.test.push({
                value : "",
                key : Date.now()
            })
        },
        addCommonFn(){},
        editHouseCartSub(){},
        resetForm(formName) {
        this.$refs[formName].resetFields();
        }
    },

    watch: {}

  }

</script>
<style lang='less' scoped>

</style>