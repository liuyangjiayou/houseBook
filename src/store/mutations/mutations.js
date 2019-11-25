import { 
    CHANGE_USER_INFO,
    SET_USER_INFO
 } from '../mutationTypes/mutationType';
export default {
    [SET_USER_INFO](state,userInfo){
        state.userInfo = userInfo;
    }
}
