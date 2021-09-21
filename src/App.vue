<template>
  <v-app>
    <v-app-bar
      v-show="!navigation"
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
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
          <v-switch :color="background" class="switch-center" v-model="isDarkTheme"> 
            <template v-slot:label>
              <v-icon v-show="!isDarkTheme">mdi-moon-full</v-icon>
              <v-icon v-show="isDarkTheme">mdi-moon-new</v-icon>
            </template>
          </v-switch>
        </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
   <v-bottom-navigation v-show="!navigation" :value="value" color="primary" grow fixed>
    <v-btn value="Home" to='/'>
      <span>Home</span>

      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn value="stats" to='/stats'>
      <span>Stats</span>

      <v-icon>mdi-poll</v-icon>
    </v-btn>

    <v-btn value="account" to="account">
      <span>Account</span>

      <v-icon>mdi-account</v-icon>
    </v-btn>

    <v-btn value="blog" to='/blog'>
      <span>Blog</span>

      <v-icon>mdi-newspaper-variant</v-icon>
    </v-btn>

    <v-btn value="guide" to='guide'>
      <span>Guide</span>

      <v-icon>mdi-help-circle</v-icon>
    </v-btn>
  </v-bottom-navigation>
  </v-app>

</template>

<script>
// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
export default {
  name: 'App',
  components: {
  },

  data: () => ({ 
    value: 0,
    navigation: null,
    background: "", 
  }),
  methods:{ 
      checkRoute(){
        if(
          this.$route.name == "login" ||
          this.$route.name == "resetpassword"
        ){
          this.navigation = true;
        }
        else{
          this.navigation = false;
        }
      },
      checkBackground(){
        if(
          this.$vuetify.theme.dark
        )
        {
          console.log(this.$vuetify.theme.themes.dark.background)
          this.background = this.$vuetify.theme.themes.light.background;
        }
        else{
          this.background = this.$vuetify.theme.themes.dark.background;
        }
      } 
  }, 
  computed:{
    isDarkTheme:{
      get(){
        return this.$vuetify.theme.dark;
      },
      set(payload){
        this.$vuetify.theme.dark = payload;
        this.checkBackground();
      }
    },
  },
  created(){
    // firebase.auth().onAuthStateChanged((user) => {
    //   this.$store.commit("updateUser", user);
    // });
    this.checkRoute();
  },
  watch:{
    $route(){
      this.checkRoute();
    }

  } 
};
</script>

