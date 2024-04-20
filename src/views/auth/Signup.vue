<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3> <br>
    <label>Family name</label>
    <input type="text" required v-model="familyName" placeholder="Enter family name">

    <label>Street</label>
    <input type="text" required v-model="familyAddress.street" placeholder="Enter name of street">
    <label>House number</label>
    <input type="text" required v-model="familyAddress.number" placeholder="Enter house number">
    <label>Zipcode</label>
    <input type="text" required v-model="familyAddress.zipcode" placeholder="Enter zipcode">
    <label>Country</label>
    <input type="text" required v-model="familyAddress.country" placeholder="Enter country">

    <label>Family phone number</label>
    <input type="text" required v-model="phoneNumber" placeholder="Enter phone number">
    <label>Email</label>
    <input type="text" required v-model="email" placeholder="Enter email">
    <label>Password</label>
    <input type="password" required v-model="password" placeholder="Enter password">
    <div class="error" v-if="error">{{ error }}</div>
    <button v-if="!isPending" :disabled="!isFormValid">Sign up</button>
    <button v-else disabled>Signing up...</button>
  </form>
</template>

<script>
import { computed, ref } from 'vue'
import useSignup from '@/composables/useSignup'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const { error, isPending, signup } = useSignup()

    const familyName = ref('')
    const familyAddress = ref({
      street: '',
      number: '',
      zipcode: '',
      country: ''
    })
    const phoneNumber = ref('')
    const email = ref('')
    const password = ref('')

    const router = useRouter()

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, familyName.value, familyAddress.value, phoneNumber.value)
      console.log(res)
      if (!error.value) {
        router.push({ name: 'Home'})
      }
    }

    const isFormValid = computed(() => {
      return (
        familyName.value.trim() !== '' &&
        familyAddress.value &&
        familyAddress.value.street.trim() !== '' &&
        familyAddress.value.number.trim() !== '' &&
        familyAddress.value.zipcode.trim() !== '' &&
        familyAddress.value.country.trim() !== '' &&
        phoneNumber.value.trim() !== '' &&
        email.value.trim() !== '' &&
        password.value.trim() !== ''
      );
    });

    return {
      familyName, familyAddress, phoneNumber, email, password,
      error, isPending,
      isFormValid,
      handleSubmit,
    }
  }
}
</script>

<style>

</style>