<template>
  <v-app dark="dark">
    <v-main>
      <v-container >
        <v-layout align-center="align-center" justify-center="justify-center">
          <v-flex class="login-form text-xs-center">  
            <v-layout align-center="align-center" justify-center="justify-center">   
                <v-list-item-avatar @click.stop="dialog=true" size="100" color="grey darken-3">     
                    <v-img 
                    :src="userValues.avatar"
                    ></v-img>  
                </v-list-item-avatar>            
            </v-layout>
            <v-dialog
            v-model="dialog"
            max-width="290"
        >
            <v-card>
            <v-card-title class="text-h5">
                Choose Profile Avatar 
            </v-card-title>
    
            <v-card-text>
                To change your avatar, go to <a href="https://getavataaars.com" target="_blank">getavaaatars.com</a>, select the transparent option, and create your avatar. 
                Afterwards, select the "Show img" option, copy the code, and paste it into the avatar text field.
            </v-card-text>
    
            <v-card-actions>
                <v-spacer></v-spacer>
    
                <v-btn
                color="green darken-1"
                text
                @click="dialog = false"
                >
                okay 
                </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <v-layout align-center="align-center" justify-center="justify-center">
                <v-subheader class="mr-5"><a @click.stop="dialog=true">Click to change</a></v-subheader> 
              </v-layout>

            <v-layout class="mr-2" align-center="align-center" justify-center="justify-center"> 
                <v-form>  
                    <v-text-field
                        label="First Name"
                        v-model="userValues.firstName"
                    ></v-text-field>

                    <v-text-field
                        label="Last Name"
                        v-model="userValues.lastName"
                    ></v-text-field>
                                        
                        <v-color-picker v-model="userValues.userColor" ></v-color-picker> 
                        <v-col
                        cols="12"
                        md="4"
                        >
                        </v-col>         
                    <v-text-field
                        label="avatar"
                        v-model="userValues.avatar"
                    ></v-text-field>
                    <v-btn class="mt-6 mb-10" @click.prevent="setNames" block="block" type="submit">Save Changes</v-btn> 
                  <div v-show="error" class="error">{{ this.errorMsg }}</div>
                </v-form> 
            </v-layout>
            </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app> 
</template>

<script>
import {db, auth} from "../firebase/firebaseInit.js";
import {update, ref, get, child} from "firebase/database";

export default {
    name: 'Login',
    data() {
        return{
            email: "",
            password: "",
            error: null,
            errorMsg: "", 
            userValues: {}, 
            dialog:false
            
        }
    },
    mounted(){ 
        this.getNames();
    },
    methods:{ 
      getNames(){
          get(child(ref(db), `users/${auth.currentUser.uid}`)).then((snapshot) => { 
              this.userValues = snapshot.val(); 
          });
      },
      setNames(){
        if(this.userValues.avatar.slice(0,4) === "<img"){
          this.userValues.avatar = this.userValues.avatar.match(/(?<=(["']))(?:(?=(\\?))\2.)*?(?=\1)/g).join("")
        }
          update(child(ref(db), `users/${auth.currentUser.uid}`), this.userValues).then(() => {
          this.$router.push({ name: "home" });
          this.error = false;
          this.errorMsg = "";
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
