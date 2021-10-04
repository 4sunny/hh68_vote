<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div @click.stop="toHome" class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/University_of_St._Michael%27s_College_coat_of_arms.svg/1200px-University_of_St._Michael%27s_College_coat_of_arms.svg.png"
          transition="scale-transition"
          width="40"
        />

        <!-- <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        /> -->
        <h1>HH6&8</h1>
      </div>

      <v-spacer></v-spacer>
        <div class="d-flex"> 
          <v-switch class="switch-center" v-model="isDarkTheme" @change="toggleDarkTheme"> 
            <template v-slot:label>
              <v-icon v-show="!isDarkTheme">mdi-moon-full</v-icon>
              <v-icon v-show="isDarkTheme">mdi-moon-new</v-icon>
            </template>
          </v-switch>
        </div>
    </v-app-bar>

    <v-main>
      <router-view /> 
    </v-main>

   <v-bottom-navigation v-show="!navigation" color="primary" height="56px" grow fixed>
    <v-btn to='/' height="56px">
      <span>Home</span>

      <v-icon>mdi-home</v-icon>
    </v-btn>

    <!-- <v-btn to='/stats'>
      <span>Stats</span>

      <v-icon>mdi-poll</v-icon>
    </v-btn>
 -->
    <v-btn to="account" height="56px">
      <span>Account</span>

      <v-icon>mdi-account</v-icon>
    </v-btn>

    <!-- <v-btn to='/blog'>
      <span>Blog</span>

      <v-icon>mdi-newspaper-variant</v-icon>
    </v-btn> -->

  </v-bottom-navigation>
  </v-app>

</template>

<script>
import {db, auth} from "./firebase/firebaseInit";
import {get, ref, child, update} from "firebase/database";
export default {
  name: 'App',
  components: {
  },

  data: () => ({ 
    value: 0,
    navigation: null,
    isDarkTheme: null,
  }),
  methods:{ 
      toHome(){
        this.$router.push({ name: "home" });
      },
      checkRoute(){
        if(
          this.$route.name == "login" ||
          this.$route.name == "resetpassword"
        ){ 
          this.navigation = true;
        }
        else{ 
          get(child(ref(db), `users/${auth.currentUser.uid}`)).then((snapshot) => {
              this.$vuetify.theme.themes.light.primary = snapshot.val().userColor;
              this.$vuetify.theme.themes.dark.primary = snapshot.val().userColor;
              this.isDarkTheme = snapshot.val().isDarkTheme; 
              this.$vuetify.theme.dark = this.isDarkTheme
            });
          this.navigation = false;
        }
      },  
      toggleDarkTheme(){
        update(ref(db), {
          [`users/${auth.currentUser.uid}/isDarkTheme`]: this.isDarkTheme
        });
          this.$vuetify.theme.dark = this.isDarkTheme 
      }
  }, 
  
  created(){
    this.checkRoute();
  },
  watch:{
    $route(){
      this.checkRoute();
    }

  } 
};
</script>