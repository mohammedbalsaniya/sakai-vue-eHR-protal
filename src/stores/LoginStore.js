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
    token: localStorage.getItem("authToken") || null, // Consistent token key
    loginData: null,
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
        localStorage.setItem("authToken", this.token); // Persist token in localStorage
        console.log("Received Token:", this.token);

        // 🔹 Step 2: Use Token to Login
        const apiURL = `${companyStore.fullURL}/Login?Login=${this.username}&Password=${this.password}&Clientcode=${companyStore.companyCode}&Application=${companyStore.application}`;

        console.log("Logging in with Token:", apiURL);

        const loginResponse = await axios.get(apiURL, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.loginData = loginResponse.data;
        console.log("Login response:", loginResponse.data);

        if (this.loginData) {
          this.isAuthenticated = true; // 🔥 Mark as authenticated
        }

      } catch (error) {
        this.error = error.response?.data?.message || error.message || "An unknown error occurred.";
        console.error("Error during login:", this.error);
      } finally {
        this.loading = false;
      }
    },

    logout() {
      this.isAuthenticated = false;
      this.token = null;
      localStorage.removeItem("authToken"); // Clear token from localStorage
      console.log("Logged out successfully");
    },
  },
});
