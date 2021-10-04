import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        isDarkTheme: false,  
    },
    mutations:{
        toggleEditPost(state, payload){
            state.editPost = payload; 
        },
        changeTheme(state, payload){
            state.isDarkTheme = payload;
        }
    },
    action:{
        // getPost({state}){
            

        // }
    },
    modules:{}, 
})

