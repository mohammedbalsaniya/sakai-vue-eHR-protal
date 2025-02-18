<template>
  <div>
    <!-- Displaying login data -->
    <h2>Dashboard</h2>
    
    <div v-if="loginStore.isAuthenticated">
      <p><strong>Logged in as:</strong> {{ loginStore.res }}</p>
      <p><strong>Status:</strong> Authenticated</p>
    </div>

    <div v-if="loginStore.error" style="color: red;">
      <p>Error: {{ loginStore.error }}</p>
    </div>
  </div>
  <p>Error: {{ loginStore.loginResponse }}</p>
</template>

<script setup>
import { useLoginStore } from '@/stores/LoginStore';
import { storeToRefs } from 'pinia';

// Accessing the Login store

const loginStore = useLoginStore();
const { username, isAuthenticated, error } = storeToRefs(loginStore);

</script>
