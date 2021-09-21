import Vue from 'vue';
import router from './router';
import App from './App.vue';
import store from './store'
import vuetify from './plugins/vuetify';
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "./firebase/firebaseInit";

Vue.config.productionTip = false


let app = firebase.fire
firebase.auth().onAuthStateChanged(() => {
  if (!app){
    new Vue({
      vuetify,
      router,
      store,
      render: h => h(App)
    }).$mount('#app') 
  } 
});
