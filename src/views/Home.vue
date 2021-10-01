<template>            
<v-container>
    <v-row dense>
        <v-col cols="12">
            <Post v-for="a in sortedPosts" :post="a" :key="a.key"></Post>
        </v-col> 
    </v-row> 
        <v-btn
            class="mb-14 mr-3"
            fixed 
            color="pink"
            dark 
            bottom 
            right
            fab
            @click.prevent="yeet" 
        >
        <v-icon>mdi-plus</v-icon>
        </v-btn>
</v-container> 
</template>

<script>
import Post from '@/components/Post';
import {db} from "../firebase/firebaseInit";
import { get, ref, orderByChild, query} from "firebase/database";

export default {
    components: {
        Post,
    },
    data: function () {
        return {
            sortedPosts: {} 
        }
    }, 
    mounted: function() {  
        this.yeet();
    }, 
    methods: {
        sortedSubmissions: function () {
            const sortedRef = query(ref(db, "posts/"), orderByChild('votes'))
            get(sortedRef).then((snapshot) => {
            const data = snapshot.val();   
            this.sortedPosts = data; 
            });  
        },
        yeet: function () {
            console.log(this.sortedPosts);
            console.log(this.sortedSubmissions());
        }

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

