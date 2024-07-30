<template>
  <div class="navbar">
    <nav>
      <h1>Home</h1>
      <div class="links" v-if="user">
        <span>Hello, {{ user.displayName }}</span>
        <router-link class="btn" :to="{ name: 'Detail', params: { id: user.uid } }">My family data</router-link>
        <button @click="handleSubmit">Log out</button>
      </div>
      <div class="links" v-else>
        <router-link class="btn" :to="{ name: 'Login' }">Log in</router-link>
        <router-link class="btn" :to="{ name: 'Signup' }">Sign up</router-link>
      </div>
    </nav>
  </div>
</template>

<script>
import getUser from '@/composables/getUser'
import useLogout from '@/composables/useLogout'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const { user } = getUser()
    const { error, isPending, logout } = useLogout()

    const router = useRouter()

    const handleSubmit = async () => {
      await logout()
      if (!error.value) {
        console.log('User logged out')
      }
      router.push({ name: 'Login' })
    }

    return { user, handleSubmit, error }
  }
}
</script>

<style scoped>
  .navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    margin-top: 10px;
    border-radius: 10px;
  }
  nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  nav h1 {
    margin-left: 10px;
  }
  nav .links {
    margin-left: auto;
  }
  nav .links .btn {
    margin-left: 1px;
    margin-right: 10px;
  }
  nav .links span {
    margin-right: 15px;
  }
</style>