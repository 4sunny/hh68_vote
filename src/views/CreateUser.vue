<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
      </p>
      <h2>Create Your FireBlog Account</h2>
      <div class="inputs">
        <div class="input">
          <input type="text" placeholder="First Name" v-model="firstName" />
        </div>
        <div class="input">
          <input type="text" placeholder="Last Name" v-model="lastName" />
        </div>
        <div class="input">
          <input type="text" placeholder="Email" v-model="email" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
        </div>
        <div v-show="error" class="error">{{ this.errorMsg }}</div>
      </div>
      <button @click.prevent="register">Sign Up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import { db } from "../firebase/firebaseInit";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";

export default {
  name: "CreateUser",
  components: {
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      error: null,
      errorMsg: "",
    };
  },
  methods: {
    async register() {
      if (
        this.email !== "" &&
        this.email.split('@')[1] === 'mail.utoronto.ca' &&
        this.password !== "" &&
        this.firstName !== "" &&
        this.lastName !== "" 
      )
        {
        this.error = false;
        this.errorMsg = "";
        const firebaseAuth = await getAuth(); 
        const createUser = await createUserWithEmailAndPassword(firebaseAuth, this.email, this.password);
        const result = await createUser;
        await set(ref(db, 'users/' + result.user.uid), {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          votes: 20,
          displayName: result.user.displayName
        });
        this.$router.push({ name: "home" });
        return;
      }
      this.error = true;
      this.errorMsg = "Please fill out all the fields!";
      return;
    },
  },
};
</script>
