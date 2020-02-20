//全局变量存储管理
import Vue from 'vue'
import Vuex from 'vuex'
import Menus from './menu.js';

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
        username: window.localStorage.getItem('username') == null ? '' : JSON.parse(window.localStorage.getItem('username')),
        menu:Menus
    },
    getters: {
        curusername:state=>{
            const name=state.username;
            return name;
        }
    },
    mutations: {
        login(state,username){
            state.username=username;
            window.localStorage.setItem('username', JSON.stringify(username));
        },
        logout(state){
          state.username='未登录';
        },
    },
    actions: {
        
    }
});