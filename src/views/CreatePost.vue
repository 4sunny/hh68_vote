<template>
  <v-app dark="dark">
    <v-main>
      <v-container>
        <v-layout align-center="align-center" justify-center="justify-center">
          <v-flex class="text-xs-center"> 
            <div class="display-1 mb-3">
            </div>
            <v-card light="light">
              <v-card-text>
                <div class="subheading">
                  <template>Create your post</template>
                </div>
                <v-form> 
                  <v-checkbox
                    v-model="anonymous"
                    :label="`Post anonymously`"
                  ></v-checkbox>
                    Title
                  <v-text-field v-model="title" placeholder="Title"></v-text-field>
                    Description
                  <v-textarea v-model="content" placeholder="Description"/>
                  <v-btn @click.prevent="uploadPost" block="block" type="submit">Add Post</v-btn> 
                  <div v-show="error" class="error">{{ this.errorMsg }}</div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>  
</template>

<script>
import { db } from "../firebase/firebaseInit";
import { getAuth } from "firebase/auth";
import { ref, set, push, child, get } from "firebase/database";

export default {
    name:"CreatePost",
    data(){
        return{
            title: "",
            content: "",
            error: null,
            errorMsg: "",
            anonymous:false
        }
    },
    methods:{
        async uploadPost() {
        if (
            this.title !== "" &&
            this.description !== "" 
        )
            {
            this.error = false;
            this.errorMsg = "";
            const user = getAuth(); 
            if (this.anonymous === true){ 
                set(push(ref(db, "posts")), { 
                      title: this.title,
                      content: this.content,
                      author: "Anonymous",
                      uid: user.currentUser.uid, 
                      color: '#808080', 
                      rank: 1000,
                      totalVotes: 0, 
                      avatar: '',
                      votes: {
                        [user.currentUser.uid]: 0,
                      }
                    }
                ); 
            }
            else{
              get(child(ref(db, "users/"), user.currentUser.uid)).then((snapshot) =>
              {  
                const value = snapshot.val()
                set(push(ref(db, "posts")), { 
                      title: this.title,
                      content: this.content,
                      author: value.displayName, 
                      uid: user.currentUser.uid, 
                      color: value.userColor, 
                      rank: 1000,
                      totalVotes: 0,
                      avatar: value.avatar,
                      votes: {
                        [user.currentUser.uid]: 0,
                      }
                    }
                );
              }); 
            }
                        this.$router.push({ name: "home" });
            return;
        }
        this.error = true;
        this.errorMsg = "Please fill out all the fields!";
        return;
        },
    },
}
</script>

<style>

</style>