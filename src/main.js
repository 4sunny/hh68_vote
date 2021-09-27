import Vue from 'vue';
import router from './router';
import App from './App.vue';
import { store } from './store'
import vuetify from './plugins/vuetify';
import "./firebase/firebaseInit";
import { getAuth } from "firebase/auth";

Vue.config.productionTip = false

//https://getavataaars.com/

let app 
getAuth().onAuthStateChanged(() => {
  if (!app){
    new Vue({
      vuetify,
      router,
      store,
      render: h => h(App)
    }).$mount('#app') 
  } 
});
