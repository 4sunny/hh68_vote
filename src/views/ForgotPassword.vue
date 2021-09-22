<template>
     <v-container fill-height="fill-height">
        <v-dialog
                v-model="modalActive"
                width="500"
            >  
                <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                {{ this.modalMessage }} 
                </v-card-title>
        
        
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                    color="primary"
                    text
                    @click="closeModal"
                    >
                    Okay 
                    </v-btn>
                </v-card-actions>
                </v-card>
            </v-dialog>
            <v-progress-circular indeterminate size="64" v-if="loading" /> 
        <v-layout align-center="align-center" justify-center="justify-center">
          <v-flex class="login-form text-xs-center"> 
            <div class="display-1 mb-3">
              <v-icon class="mr-3" large="large">mdi-work</v-icon> Historic House 6 & 8 
            </div>
            <v-card light="light">
              <v-card-text>
                <div class="subheading">
                  <template>Forgot your password?</template>
                </div>
                <v-form> 
                  <v-text-field v-model="email" light="light" prepend-icon="mdi-email" label="Email" type="email"></v-text-field> 
                  <v-btn @click.prevent="resetPassword" block="block" type="submit">Reset</v-btn> 
                </v-form>
              </v-card-text>
            </v-card>
            <v-layout align-center='align-center' justify-center="justify-center">
              <div class="d-flex flex-column pt-6">
                <template> Don't have an account? </template> 
                <v-btn light="light" to="/guide">Pay Your Due</v-btn>
              </div>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
</template> 

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
export default {
  name: "ForgotPassword",
  data() {
    return {
      email: "",
      modalActive: false,
      modalMessage: "",
      loading: null,
    };
  },
  components: {
  },
  methods: {
    resetPassword() {
      this.loading = true;
      firebase
        .auth()
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.modalMessage = "If your account exists, you will receive a email";
          this.loading = false;
          this.modalActive = true;
        })
        .catch((err) => {
          this.modalMessage = err.message;
          this.loading = false;
          this.modalActive = true;
        });
    },
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
    },
  },
};
</script>
