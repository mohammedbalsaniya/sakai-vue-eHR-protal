import { createRouter, createWebHistory } from 'vue-router'
import CompanyCodeView from '@/views/CompanyCodeView.vue'
import CompanyPage from '@/views/CompanyPage.vue'
import DashbordView from '@/views/DashbordView.vue'


const routes = [
  {
    path: '/',
    name: 'CompanyCodeView',
    component: CompanyCodeView, // company code view
  },
  { 
    path: '/company', 
    name: 'CompanyPage',
    component: CompanyPage, 
  },
  { 
    path: '/company/dashboard', 
    name: 'DashbordView',
    component: DashbordView, 
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
