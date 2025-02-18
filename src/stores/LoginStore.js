import { defineStore } from "pinia";
import axios from "axios";
import { useCompanyStore } from "./companyStore"; // Import company store

export const useLoginStore = defineStore("Login", {
  state: () => ({
    username: "",
    password: "",
    error: null,
    loading: false,
    isAuthenticated: false,
    token: localStorage.getItem('Bearer') || null, // Retrieve token from localStorage
  }),

  actions: {
    async login() {
      if (!this.username || !this.password) {
        this.error = "ID and password are required";
        console.error(this.error);
        return;
      }

      this.loading = true;
      this.error = null;

      const companyStore = useCompanyStore();

      try {
        // 🔹 Step 1: Get Token from newToken API
        const AuthURL = `${companyStore.protocol}://appdemo.intelliob.com/webapi/api/newToken?Username=${this.username}&Password=${this.password}&Clientcode=${companyStore.companyCode}&Application=${companyStore.application}`;

        console.log("Fetching token from:", AuthURL);

        const authResponse = await axios.get(AuthURL);
        console.log("Auth response:", authResponse.data);

        if (!authResponse.data?.Item1) {
          throw new Error("Token not received");
        }

        this.token = authResponse.data.Item1; // Store token in Pinia store
        localStorage.setItem('authToken', this.token); // Persist token in localStorage
        console.log("Received Token:", this.token);

        // 🔹 Step 2: Use Token to Login
        const apiURL = `${companyStore.fullURL}/Login?Login=${this.username}&Password=${this.password}&Clientcode=${companyStore.companyCode}&Application=${companyStore.application}`;

        console.log("Logging in with Token:", apiURL);
        console.log("Origin Url is:" + "http://appdemo.intelliob.com/webapi/api/Login?Login=5000&Password=1MqM5jFel6OUVDeOiSBIQA%3D%3D&Clientcode=305&Application=1");

        const cookies = document.cookie;
        const loginResponse = await axios.get(apiURL, {
          headers: {
            Authorization: `Bearer ${this.token}`,
            // 'Access-Control-Allow-Origin': '*',
          },
        });

        console.log("Login response:", loginResponse.data);

        if (loginResponse.data?.success) {
          this.isAuthenticated = true;
          console.log("Login successful!", loginResponse.data);
        } else {
          this.error = loginResponse.data?.message || "Invalid credentials";
        }
      } catch (error) {
        this.error = error.response?.data || error.message;
        console.error("Error during login:", this.error);
      } finally {
        this.loading = false;
      }
    },

    // Optional: Logout and clear token from localStorage
    logout() {
      this.isAuthenticated = false;
      this.token = null;
      localStorage.removeItem('authToken'); // Clear token from localStorage
      console.log("Logged out successfully");
    },
  },
});
