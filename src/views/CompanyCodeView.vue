<template>
  <div>
    <!-- Input for entering the company code -->
    <input type="number" placeholder="Enter Company Code" v-model="companyCode" />

    <!-- Loading message -->
    <div v-if="store.loading">Loading...</div>

    <!-- Error message -->
    <div v-if="store.error" style="color: red;">{{ store.error }}</div>
    <RouterLink to="/company"  @click="store.fetchData">Enter</RouterLink>
  </div>
</template>

<script setup>
import { useCompanyStore } from '@/stores/companyStore';
import { storeToRefs } from 'pinia';

const store = useCompanyStore();
const { companyCode } = storeToRefs(store);
</script>
