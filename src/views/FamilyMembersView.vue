<template>
 <div v-if="documents">
  <ListView 
    :documents="documents" />
 </div>
 <div class="error" v-else>
  {{ error }}
 </div>
</template>

<script>
import ListView from '@/components/ListView.vue'

import getCollection from '@/composables/getCollection'

export default {
  components: {
    ListView
  },
  setup(){
     const { error, documents } = getCollection('familyMembers')
    
    return { 
      error, documents
    }
  }
}
</script>

<style>

</style>