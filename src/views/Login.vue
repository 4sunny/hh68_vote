<template>
  <v-app dark="dark">
    <v-main>
      <v-container fill-height="fill-height">
        <v-layout align-center="align-center" justify-center="justify-center">
          <v-flex class="login-form text-xs-center"> 
            <div class="display-1 mb-3">
              <v-icon class="mr-3" large="large">mdi-work</v-icon> Historic House 6 & 8 
            </div>
            <v-card light="light">
              <v-card-text>
                <div class="subheading">
                  <template>Log in to your account</template>
                </div>
                <v-form> 
                  <v-text-field v-model="email" light="light" prepend-icon="mdi-email" label="Email" type="email"></v-text-field>
                  <v-text-field v-model="password" light="light" prepend-icon="mdi-lock" label="Password" type="password"></v-text-field>
                  <v-btn @click.prevent="signIn" block="block" type="submit">Sign in</v-btn> 
                  <div v-show="error" class="error">{{ this.errorMsg }}</div>
                </v-form>
              </v-card-text>
            </v-card>
            <v-layout align-center='align-center' justify-center="justify-center">
              <div class="d-flex flex-column pt-6">
                <template> Don't have an account? </template> 
                <v-btn light="light" to="stats">Pay Your Due</v-btn>
              </div>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app> 
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "../firebase/firebaseInit.js";
export default {
    name: 'Login',
    data() {
        return{
            email: "",
            password: "",
            error: null,
            errorMsg: "",
        }
    },
    methods:{
      signIn(){
        firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push({ name: "home" });
          this.error = false;
          this.errorMsg = "";
          console.log(firebase.auth().currentUser.uid);
        })
        .catch((err) => {
          this.error = true;
          this.errorMsg = "Login Failed!"; 
          console.log(err);
        });
      }
    }
}
</script>
