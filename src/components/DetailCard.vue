<template>
  <div class="detail-card">
    <div class="card">
      <label>Family name</label>
      <p class="styled-text">{{ userData.familyName }}</p>
      <label>Family Address</label>
      <div>
        <p class="styled-text">{{ userData.familyAddress.street }} {{ userData.familyAddress.number }}</p>
        <p class="styled-text">{{ userData.familyAddress.zipcode }}</p>
        <p class="styled-text">{{ userData.familyAddress.country }}</p>
      </div>
      <label>Phone number</label>
      <p class="styled-text">{{ userData.phoneNumber }}</p>
      <label>Email</label>
      <p class="styled-text">{{ userData.email }}</p>
      <div class="button-container">
        <button @click="edit">Edit info</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  setup(props, { emit }) {
    const edit = () => {
      emit('edit')
    }

    return { edit }
  }
}
</script>

<style scoped>
.detail-card, .update-card {
  width: 100%;
}
.card, form {
  display: flex;
  flex-direction: column;
}
.button-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
button {
  margin-left: auto;
}
.styled-text, input {
  border: 0;
  border-bottom: 1px solid var(--secondary);
  padding: 10px;
  outline: none;
  display: block;
  width: 100%;
  box-sizing: border-box;
  margin: 20px auto;
}
label {
  font-size: medium;
  font-weight: bold;
}
</style>