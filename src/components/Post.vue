<template>
<div class="pt-4">
        <v-card
            class="mx-auto"
            color="#26c6da"
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
                     <span class="subheading mr-2">{{ post.votes }} </span>
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
    </div>
</template>

<script>
export default {
    name: 'Post',
    data(){
        return{
            isTruncated: null,
            trunkText: "",
        }
    },
    props:{
        post: null,
    },
    methods: {
        increaseVotes: function () {
            this.post.votes++;
        },
        decreaseVotes: function () {
            this.post.votes--;
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
            return this.post.votes >= 20;
        },       
    },
    created(){
        this.checkTruncated(); 
    }
}
</script>

