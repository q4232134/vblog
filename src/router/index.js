import Vue from 'vue'
import VueRouter from 'vue-router'
import Edit from "@/views/Edit";

Vue.use(VueRouter)

const routes = [
  {
    path: '/Edit/:id',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/Edit',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/',
    name: 'Blog',
    component: () => import('../views/Blog.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
