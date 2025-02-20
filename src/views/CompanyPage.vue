<template>
  <div>
    <div class="logo">
      <img :src="companyLogo" alt="Company Logo" />
    </div>
    <h2>Company Page</h2>

    <label for="Login">Login ID</label>
    <input type="text" id="Login" v-model="username" />

    <label for="Password">Password</label>
    <input type="password" id="Password" v-model="password" />

    <button @click="login">Login</button>
  </div>
</template>

<script setup>
import { useLoginStore } from '@/stores/LoginStore';
import { useCompanyStore } from '@/stores/companyStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

// Initialize stores
const store = useLoginStore();
const storecompany = useCompanyStore();
const router = useRouter(); // ✅ Import Vue Router

// ✅ Use storeToRefs to ensure reactivity
const { username, password } = storeToRefs(store);
const { companyLogo } = storeToRefs(storecompany);

const login = async () => {
  await store.login(); // Await login completion

  if (store.loginData) {
    router.push('/company/dashbrod'); // ✅ Now router should work
  } else {
    alert('Invalid Login');
  }
};
</script>
