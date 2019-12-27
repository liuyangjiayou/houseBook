/* 这是所有的form的公共JS目前包括 重置表单 为了避免冲突 这里的方法一律已yj开通*/
import { post } from '../api/api'


let fromFn = {
    /* 重置表单  formName表单的ref  数组形式*/
    yjResetForm(formName) {
        formName.forEach(item => {
            this.$refs[item].resetFields();
        });
    },
    /* 清除上传图片  upload图片的upload的ref 数组形式*/
    yjResetUpload(upload){
        upload.forEach(item => {
            this.$refs[item] && this.$refs[item].clearFn();
        });
    },
    /* 提交表单表单验证  formName 需要提交的表单名称 sub验证成功后的回调  err失败后的回调函数*/
    yjSubmitForm(formName,sub,err) {
        this.$refs[formName].validate((valid) => {
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
    /* 提交后台的时候需要洗数据  arr需要传给后台的字段数组 oldData需要拿到的数据对象  会返回一个新的数据对象给后台*/
    yjAddDataFn(arr,oldData) {
        let newData = {};
        arr.forEach(item=>newData[item] = oldData[item]);
        return newData;
    },
}
export default{
    install(Vue){
        Vue.prototype.yjResetForm = fromFn.yjResetForm,
        Vue.prototype.yjResetUpload = fromFn.yjResetUpload,
        Vue.prototype.yjSubmitForm = fromFn.yjSubmitForm,
        Vue.prototype.yjAddDataFn = fromFn.yjAddDataFn
    }
}