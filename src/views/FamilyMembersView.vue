<template>
 <div v-if="documents">
  <div class="search-bar">
    <SearchBar @search="handleSearch" />
  </div>
  <div>
    <ListView
      :documents="filteredDocuments"
      :isSearching="isSearching"
    />
  </div>
 </div>
 <div class="error" v-else>
  {{ error }}
 </div>
</template>

<script>
import ListView from '@/components/ListView.vue'
import SearchBar from '@/components/SearchBar.vue'

import getCollection from '@/composables/getCollection'

import { computed, ref } from 'vue'

export default {
  components: {
    ListView,
    SearchBar
  },
  setup(){
    const { error, documents } = getCollection('familyMembers')

    const searchQuery = ref('')
    const isSearching = ref(false)

    const handleSearch = (query) => {
      searchQuery.value = query
    }

    const filteredDocuments = computed(() => {
      const query = searchQuery.value.toLowerCase()
      if (query) {
        isSearching.value = true
        return documents.value.filter((document) => {
          return document.familyName.toLowerCase().includes(query)
        })
      } else {
        isSearching.value = false
        return documents.value
      }
    })
    
    return { 
      error, documents, searchQuery, isSearching, handleSearch, filteredDocuments
    }
  }
}
</script>

<style scoped>
  .search-bar {
    display: flex;
    justify-content: flex-end;
  }
</style>