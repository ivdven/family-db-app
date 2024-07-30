<template>
  <div class="detail-page">
    <div v-if="ownership">
      <DetailCard v-if="!isEditing"
        :userData="userData"
        @edit="handleToggle"
      />
      <UpdateCard v-else
        :userData="userData"
        :updateError="updateError"
        @handleSubmit="handleSubmit"
        @cancel="handleToggle"
      />
    </div>
  </div>
</template>

<script>
import DetailCard from '@/components/DetailCard.vue'
import UpdateCard from '@/components/UpdateCard.vue'
import useDocument from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import { ref, watch, toRaw } from 'vue'

export default {
  props: ['id'],
  components: { DetailCard, UpdateCard },
  setup(props) {
    const { user } = getUser()
    const { error, document: userData } = getDocument('familyMembers', props.id)
    const { error: updateError, updateDoc } = useDocument('familyMembers', props.id)

    const isEditing = ref(false)

    const handleToggle = () => {
      console.log('handleToggle called')
      isEditing.value = !isEditing.value
    }

    const handleSubmit = async (updatedData) => {

      const dataToUpdate = JSON.parse(JSON.stringify(toRaw(updatedData)))

      try {
        await updateDoc(dataToUpdate)
        console.log('Document successfully updated')
        handleToggle()
      } catch (error) {
        console.error('Error updating document:', error.message)
        alert(`Update failed: ${error.message}`)
      }
    }

    const ownership = ref(false)

    watch([user, userData], () => {
      console.log('Checking ownership')
      if (userData.value && user.value) {
        console.log('Ownership check: User UID:', user.value.uid, 'Document owner UID:', userData.value.userId)
        ownership.value = user.value.uid === userData.value.userId
      } else {
        console.log('User data or user is not available for ownership check')
        ownership.value = false
      }
    })

    return {
      error, isEditing, userData, updateError,
      handleSubmit, handleToggle, ownership
    }
  }
}
</script>
