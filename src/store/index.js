import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        isDarkTheme: false,
        editPost: null,
        posts: [
        {
        "id": 1,
        "title": "Yellow Pail",
        "content": "On-demand sand castle construction exfldskfjlalksdfhdl dsafhsjdhfkjasdhfk sdafsa ",
        "url": "#",
        "votes": 20,
        "avatar": "./images/avatars/daniel.jpg",
        "submissionImage": "./images/submissions/image-yellow.png",
        "author":"Jimmy locos"
        },
        {
        "id": 2,
        "title": "Supermajority: The Fantasy Congress League",
        "content": "Earn points when your favorite politicians pass legislation.",
        "url": "#",
        "votes": 11,
        "avatar": "./images/avatars/kristy.png",
        "submissionImage": "./images/submissions/image-rose.png",
        "author":"Jimmy yee"
        },
        {
        "id": 3,
        "title": "Tinfoild: Tailored tinfoil hats",
        "content": "We have your measurements and shipping address.",
        "url": "#",
        "votes": 17,
        "avatar": "./images/avatars/veronika.jpg",
        "submissionImage": "./images/submissions/image-steel.png",
        "author":"Simmy Fang"
        },
        {
        "id": 4,
        "title": "Haught or Naught",
        "content": "High-minded or absent-minded? You decide.",
        "url": "#",
        "votes": 9,
        "avatar": "./images/avatars/molly.png",
        "submissionImage": "./images/submissions/image-aqua.png",
        "author":"Jimmy sdf"
        }
    ]
 

    },
    mutations:{
        toggleEditPost(state, payload){
            state.editPost = payload; 
        },
        changeTheme(state, payload){
            state.isDarkTheme = payload;
        }
    },
    action:{},
    modules:{}, 
})

