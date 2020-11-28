import Vue from 'vue';
import Vuex from 'vuex';
import users from './modules/user.modue';

Vue.use(Vuex);

export default new Vuex.Store({

    modules: {
        users
    }
});
