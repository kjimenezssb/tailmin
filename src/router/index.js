import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/dashboard/Home.vue'),
      },
      {
        path: 'users',
        name: 'user-list',
        component: () => import('@/views/dashboard/users/UserList.vue'),
      },
      {
        path: 'analyticsBigQ',
        name: 'analytics-bigq',
        component: () => import('@/views/dashboard/analytics/bigq/List.vue'),
      },        
      {
        path: 'crmEmma',
        name: 'crm-emma',
        component: () => import('@/views/dashboard/crm/emma/List.vue'),
      },   
      {
        path: 'crmSalesforce',
        name: 'crm-salesforce',
        component: () => import('@/views/dashboard/crm/salesforce/List.vue'),
      },       
      {
        path: 'emailEmma',
        name: 'email-emma',
        component: () => import('@/views/dashboard/email/emma2/List.vue'),
      },   
      {
        path: 'emailSalesforce',
        name: 'email-salesforce',
        component: () => import('@/views/dashboard/email/salesforce/List.vue'),
      },      
      {
        path: '/card',
        name: 'card',
        component: () => import('@/views/Card.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes,
})

export default router
