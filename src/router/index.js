import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/views/auth/Login.vue'
import Signup from '@/views/auth/Signup.vue'
import DetailView from '@/views/DetailView'
import FamilyMembers from '@/views//FamilyMembersView'
import CreatePost from '@/views/blog/CreatePostView'

import { projectAuth } from '@/firebase/config'

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = projectAuth.onAuthStateChanged(user => {
      removeListener()
      resolve(user)
    }, reject)
  })
}

const requireAuth = async (to, from, next) => {
 try {
  const user = await getCurrentUser()
  if (user) {
    next()
  } else {
    next({ name: 'Login' })
  }
 } catch (err) {
   console.log('Error checking authentication status: ', err)
   next({ name: 'Login' })
 }
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: DetailView,
    beforeEnter: requireAuth,
    props: true
  },
  {
    path: '/family-members',
    name: 'FamilyMembers',
    component: FamilyMembers,
    beforeEnter: requireAuth,
  },
  {
    path: '/create-post',
    name: 'CreatePost',
    component: CreatePost,
    beforeEnter: requireAuth,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
