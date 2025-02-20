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
import CryptoJS from 'crypto-js'; // ✅ Import CryptoJS

const store = useLoginStore();
const storecompany = useCompanyStore();
const router = useRouter(); // ✅ Import Vue Router

// ✅ Use storeToRefs for reactivity
const { username, password } = storeToRefs(store);
const { companyLogo } = storeToRefs(storecompany);

// 🔹 AES Encryption Function (Same as your Node.js example)
const encryptPassword = (password) => {
  const key = CryptoJS.enc.Utf8.parse("9820058279992005"); // Secret Key
  const iv = CryptoJS.enc.Utf8.parse("9820058279992005"); // Initialization Vector (IV)

  const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key, {
    keySize: 128 / 8,
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return encrypted.ciphertext.toString(CryptoJS.enc.Base64); // Convert to Base64
};

const login = async () => {
  if (!username.value || !password.value) {
    alert("Please enter both username and password.");
    return;
  }

  // ✅ Encrypt the password using AES before sending
  const encryptedPassword = encryptPassword(password.value);

  // ✅ Set the encrypted password in the store
  store.password = encryptedPassword;

  await store.login(); // Await login

  if (store.loginData) {
    router.push('/company/dashboard'); // ✅ Redirect if login is successful
  } else {
    alert('Invalid Login');
  }
};
</script>
