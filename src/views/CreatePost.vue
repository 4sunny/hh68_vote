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
import { ref, set, push } from "firebase/database";

export default {
    name:"CreatePost",
    data(){
        return{
            title: "",
            content: "",
            error: null,
            errorMsg: ""
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
            console.log(user.currentUser.displayName)
            set(push(ref(db, "posts")), {
                    title: this.title,
                    content: this.content,
                    author: user.currentUser.displayName,
                    votes: 0
                }
            ); 
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