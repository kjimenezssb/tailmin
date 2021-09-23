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
        path: 'analytics/bigq',
        name: 'analytics-bigq',
        component: () => import('@/views/dashboard/analytics/bigq/BigQueryList.vue'),
      },
      {
        path: 'crm/dynamics',
        name: 'crm-dynamics',
        component: () => import('@/views/dashboard/crm/dynamics/CRMDynamics.vue'),
      },
      {
        path: 'crm/salesforce',
        name: 'crm-salesforce',
        component: () => import('@/views/dashboard/crm/salesforce/CRMSalesforceList.vue'),
      },
      {
        path: 'email/emma',
        name: 'email-emma',
        component: () => import('@/views/dashboard/email/emma/EmailEmmaList.vue'),
      },
      {
        path: 'email/salesforce',
        name: 'email-salesforce',
        component: () => import('@/views/dashboard/email/salesforce/EmailSalesforceList.vue'),
      },
      {
        path: '/ticketing/axs',
        name: 'axs',
        component: () => import('@/views/dashboard/axs/axs.vue'),
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
