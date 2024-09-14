<template>
  <div class="search-bar">
    <input type="text"
      v-model="query"
      @input="handleInput"
      placeholder="Search family member">
  </div>
</template>

<script>

import { ref } from 'vue'
export default {
  setup(_, { emit }) {

    const query = ref('')
    
    const handleInput = () => {
      emit('search', query.value)
    }

    return { query, handleInput }
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: flex-end;
}
.search-bar input {
  border: 1px solid var(--secondary);
  border-radius: 8px;
}
</style>