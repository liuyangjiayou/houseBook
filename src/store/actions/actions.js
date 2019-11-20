export default {
    setUserInfo(context,userInfo){
        context.commit('SET_USER_INFO',userInfo);
    },
    changeUserInfo(context){
        context.commit('CHANGE_INFO')
    }
}