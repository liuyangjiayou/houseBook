import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import state from './state/state'
import mutations from './mutations/mutations'
import actions from './actions/actions'
import getters from './getters/getters'

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
});
