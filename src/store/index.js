import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        isDarkTheme: false,
        editPost: null,

    },
    mutations:{
        toggleEditPost(state, payload){
            state.editPost = payload; 
        },
        changeTheme(state, payload){
            state.isDarkTheme = payload;
        }
    },
    action:{},
    modules:{}, 
})

console.log("stoe" + store.state.isDarkTheme);
export default store;