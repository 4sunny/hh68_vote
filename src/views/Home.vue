<template>            
<v-container>
    <v-row dense>
        <v-col cols="12">
            <Post v-for="a in posts" :post="a" :key="a.id"></Post>
        </v-col>
    </v-row>
    <h1>______</h1>
</v-container> 
</template>

<script>
import Post from '@/components/Post'

export default {
    components: {
        Post,
    },
    data: function () {
        return {
        }
    },
    computed: {
        posts() {
            return this.$store.state.posts 
        }, 
    },
    methods: {
        createPost: function (post) {
            post.votes = 0;
            post.id = this.numSubmissions + 1;
            this.submissions.push(post);
        }
    }
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

