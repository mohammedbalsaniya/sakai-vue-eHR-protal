import { defineStore } from 'pinia';
import axios from 'axios';

export const useCompanyStore = defineStore('company', {
  state: () => ({
    companyCode: '',           // The company code entered by the user
    responseData: null,        // API response data
    error: null,               // Error message if any occurs
    loading: false,            // Loading state
    companyLogo: null,         // Store the company logo URL
    companyName: '',           // Store the company name
    companyDetails: null,      // Store additional company details like DNS, SSL, etc.
    sslStatus: null,           // Store SSL status (1 or 0)
    protocol: 'http',          // Single variable to store http/https
    baseURL: 'appdemo.intelliob.com/webapi/api',  // Store base URL
    fullURL: '',                // Dynamically updated full URL
    application: ''
  }),

  actions: {
    async fetchData() {
      if (!this.companyCode) {
        this.error = "Company Code is required";
        console.error(this.error);
        return;
      }

      this.loading = true;
      this.error = null; // Reset error state

      try {
        const apiURL = `https://api.intelliob.com/webapi/api/index?Clientcode=${this.companyCode}`;
        const res = await axios.get(apiURL);

        // Extract the company data and logo
        const companyData = res.data?.MobileClientServer?.Table[0] || null;

        if (companyData) {
          this.companyLogo = companyData.CompanyWebLogo || null;
          this.companyName = companyData.CompanyName || 'Company Name Not Found';
          this.companyDetails = companyData;
          this.sslStatus = companyData.SSL; // Store SSL status (1 or 0)
          this.application = companyData.Application; // Store Application status
          this.responseData = res.data?.MobileClientServer?.Table || null;

          // ✅ Correct way to set protocol dynamically
          this.protocol = this.sslStatus === 1 ? 'https' : 'http';

          // ✅ Correct way to construct the full URL
          this.fullURL = `${this.protocol}://${this.baseURL}`;

          console.log(`SSL is ${this.sslStatus === 1 ? 'enabled' : 'not enabled'}`);
          console.log('Protocol:', this.protocol);
          console.log('Full API URL:', this.fullURL);
          console.log('Full applicationL:', this.application);
        } else {
          this.error = "No data found for this company code";
        }
      } catch (error) {
        this.error = error.response?.data || error.message;
        console.error('Error fetching data:', this.error);
      } finally {
        this.loading = false;
      }
    }
  }
});
