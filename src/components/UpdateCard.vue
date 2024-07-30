<template>
  <div class="update-card">
    <form @submit.prevent="handleSubmit">
      <label>Family name</label>
      <input type="text" placeholder="Enter family name" v-model="formData.familyName">
      <label>Family address</label>
      <div>
        <input type="text" placeholder="Enter street name" v-model="formData.familyAddress.street">
        <input type="text" placeholder="Enter house number" v-model="formData.familyAddress.number">
        <input type="text" placeholder="Enter zipcode" v-model="formData.familyAddress.zipcode">
        <input type="text" placeholder="Enter country" v-model="formData.familyAddress.country">
      </div>
      <label>Phone number</label>
      <input type="text" placeholder="Enter phone number" v-model="formData.phoneNumber">
      <label>Email</label>
      <input type="text" placeholder="Enter email" v-model="formData.email">
      <div class="button-container">
        <button type="submit">Update info</button>
        <button type="button" class="cancel-update" @click="handleToggle">Cancel</button>
      </div>
      <div v-if="updateError" class="error">{{ updateError }}</div>
    </form>
  </div>
</template>

<script>
import { reactive, toRefs, watch } from 'vue'

export default {
  props: {
    userData: Object,
    updateError: String
  },
  setup(props, { emit }) {
    const originalData = JSON.parse(JSON.stringify(props.userData))
    const formData = reactive(JSON.parse(JSON.stringify(props.userData)))

    const handleSubmit = () => {
      emit('handleSubmit', formData)
    }

    const handleToggle = () => {
      // Reset formData back to original state
      Object.assign(formData, originalData)
      emit('cancel')
    }

    watch(() => props.userData, (newValue) => {
      Object.assign(formData, JSON.parse(JSON.stringify(newValue)))
      Object.assign(originalData, JSON.parse(JSON.stringify(newValue)))
    }, { immediate: true })

    return { formData, handleSubmit, handleToggle, ...toRefs(props) }
  }
}
</script>

<style scoped>
.detail-card, .update-card {
  width: 100%;
}
form, .card {
  display: flex;
  flex-direction: column;
}
.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.cancel-update {
  margin-left: auto;
}
</style>
