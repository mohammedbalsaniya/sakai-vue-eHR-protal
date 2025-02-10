<template>
  <div>
    <label for="Login">Login ID</label>
    <input type="text" id="Login" v-model="username" />

    <label for="Password">Password</label>
    <input type="password" id="Password" v-model="password" />

    <!-- <button @click="store.login()">Login</button> -->
    <RouterLink to="/company/dashbrod"  @click="store.login()">Login</RouterLink>
  </div>
</template>

<script setup>
import { useLoginStore } from '@/stores/LoginStore';
import { storeToRefs } from 'pinia';

const store = useLoginStore();
// const redirectToExternalUrl = () => {
//   window.location.href = 'http://appdemo.intelliob.com/webapi/api/Login'; // External redirect
// };

// ✅ Use storeToRefs to ensure reactivity
const { username, password } = storeToRefs(store);
</script>
