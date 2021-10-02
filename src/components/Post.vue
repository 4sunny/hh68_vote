<template>
<div class="pt-4">
        <v-card
            class="mx-auto"
            :color= "post.color"
            dark
            max-width="400"
            >
            <v-card-title>
                <v-icon
                v-show="isHot"
                large
                left
                >
                mdi-fire-alert
                </v-icon>
                <span class="text-h5 font-weight-bold"> {{ post.title }}</span>
            </v-card-title>
        
                <v-card-text v-if="!isTruncated" class="text-h6 font-weight-light">
                {{ post.content }} 
                </v-card-text>

                <v-card-text v-if="isTruncated" class="text-h6 font-weight-light">
                {{ trunkText }}  
                </v-card-text>
        
            <v-card-actions>
                <v-list-item class="grow">
                <v-list-item-avatar color="grey darken-3">
                    <v-img
                    class="elevation-6"
                    alt=""
                    src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                    ></v-img>
                </v-list-item-avatar>
        
                <v-list-item-content>
                    <v-list-item-title> {{ post.author }}</v-list-item-title>
                </v-list-item-content>
        
                <v-row
                    align="center"
                    justify="end"
                >
                     <span class="subheading mr-2">{{ post.totalVotes }} </span>
                    <v-btn
                        @click.prevent="increaseVotes"
                        icon 
                    >
                        <v-icon >mdi-arrow-up-box </v-icon>
                    </v-btn> 

                    <v-btn
                        @click.prevent="decreaseVotes"
                        icon 
                    >
                        <v-icon >mdi-arrow-down-box </v-icon>
                    </v-btn> 
                </v-row>
                </v-list-item>
            </v-card-actions>
        </v-card> 
    <v-snackbar
        v-model="snackbar"
      >
        You do not have any votes remaining! 
  
        <template v-slot:action="{ attrs }">
          <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/database"
import {db, auth} from "../firebase/firebaseInit";
import {ref, update,} from "firebase/database";

export default {
    name: 'Post',
    data(){
        return{
            isTruncated: null,
            trunkText: "",
            uid: auth.currentUser.uid,
            snackbar:false,
        }
    },
    props:{
        post: null,
        pKey: null, 
        userVotes:null,
    },
    methods: {
        // increaseVotes: function () {   
        //     update(child(ref(db),
        //     "posts/" + this.pKey + "/votes/"), {
        //         [this.uid]: this.post.votes[this.uid] + 1
        //     });
        //     update(child(ref(db), "posts/" + this.pKey + "/data/"), {
        //         totalVotes: this.post.data.totalVotes + 1
        //     });
        //     updat    methods: {
        // increaseVotes: function () {   
    

        increaseVotes: function () {
            if(this.userVotes > 0){
                const updates = {};
                updates[`posts/${this.pKey}/votes/${this.uid}`] = firebase.database.ServerValue.increment(1);
                updates[`posts/${this.pKey}/totalVotes`] = firebase.database.ServerValue.increment(1); 
                updates[`users/${this.uid}/votes`] = firebase.database.ServerValue.increment(-1);
                update(ref(db), updates);  
                console.log(this.userVotes);
            }
            else{
                this.snackbar = true;
            }
        },
        decreaseVotes: function () {
            if (this.uid in this.post.votes){ 
                if (this.post.votes[this.uid] > 0){
                    const updates = {};
                    updates[`posts/${this.pKey}/votes/${this.uid}`] = firebase.database.ServerValue.increment(-1);
                    updates[`posts/${this.pKey}/totalVotes`] = firebase.database.ServerValue.increment(-1);
                    updates[`users/${this.uid}/votes`] = firebase.database.ServerValue.increment(1);
                    update(ref(db), updates); 
                }  
            }
        }, 
        checkTruncated(){
            if(this.post.content.length > 60) 
            {   
                this.isTruncated = true;
                this.trunkText = this.post.content.slice(0,80) + "..."
                return;
            }
            else{
                this.isTruncated = false;
            }
        }
    },
    computed: {  
        isHot: function () {
            return this.post.totalVotes >= 20;
        },
    },
    created(){
        this.checkTruncated(); 
    }
}
</script>

