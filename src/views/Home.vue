<template>            
<v-container>
    <v-row dense>
        <v-col cols="12">
            <Post v-for="(a,k) in sortedPosts" :post="a" :key="a.key" :pKey="k" :userVotes="userVotes"></Post>
        </v-col> 
    </v-row> 
        <v-btn
            class="mb-14 ml-3"
            fixed  
            :color="this.userColor"
            dark 
            bottom 
            left
            fab
            to="/createpost" 
        >
        <v-icon>mdi-plus</v-icon>
        </v-btn>
</v-container> 
</template>

<script>
import Post from '@/components/Post';
import {db, auth} from "../firebase/firebaseInit";
import { ref, child, orderByChild, query, onValue} from "firebase/database";

export default {
    components: {
        Post,
    },
    data: function () {
        return {
            sortedPosts: {},
            userVotes: null,
            userColor: null,  
        }
    }, 
    mounted: function() { 
        this.sortedSubmissions();
        this.userVoteCount();
    }, 
    methods: {
        sortedSubmissions: function () { 
            onValue(query(ref(db, "posts"), orderByChild('rank')), (snapshot) => {  
                const sortedsnaps = {}
                snapshot.forEach((childSnap) => {    
                    sortedsnaps[childSnap.key] = childSnap.val();
                });
                this.sortedPosts = sortedsnaps; 
            });  
        }, 
        userVoteCount: function() {
            onValue(child(ref(db), `users/${auth.currentUser.uid}`), (snapshot) => {
               this.userColor = snapshot.val().userColor;
               this.userVotes = snapshot.val().votes; 
            });
        },
    }, 
}
</script>


// STYLE
<style scoped>

.header {
    padding: 3rem 1rem 1.5rem;
}

.footer {
    padding: 1rem;
}
</style>

