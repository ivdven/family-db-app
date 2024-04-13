<template>
  <form @submit.prevent="handleSubmit">
    <label>Username</label>
    <input type="text" placeholder="Enter your e-mail" v-model="email">
    <label>Password</label>
    <input type="password" placeholder="Enter your password" v-model="password">
    <div v-if="error">{{ error }}</div>
    <button v-if="!isPending">Log in</button>
    <button v-else disabled>Logging in...</button>
  </form>
</template>

<script>
import useLogin from '@/composables/useLogin'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  setup(){
    const email = ref('')
    const password = ref('')
    const { error, login, isPending } = useLogin()
    const router = useRouter()
    const handleSubmit = async () => {
      const res = await login(email.value, password.value)
      if (!error.value) {
        console.log('Logged in')
      }
      router.push({ name: 'Home' })
    }
    return {
      email, password, error, isPending,
      handleSubmit
    }
  }
}
</script>