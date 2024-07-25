import { ref } from 'vue'
import { projectFirestore } from '@/firebase/config'
import getUser from '@/composables/getUser'

const useDocument = (collection, id, userId = null) => {
  const error = ref(null)
  const isPending = ref(false)
  const { user } = getUser()

  let documentRef = projectFirestore.collection(collection).doc(id)

  if (!userId && user.value) {
    userId = user.value.uid
  }

  const updateDoc = async (updates) => {
    isPending.value = true
    error.value = null

    try {
      console.log('Attempting to update document with:', updates)
      if ('userId' in updates && updates.userId !== userId) {
        throw new Error('Unauthorized update attempt')
      }
      await documentRef.update(updates)
      console.log('Document updated successfully')
      isPending.value = false
      return { success: true, message: 'Update successful' }
    } catch (err) {
      console.error('Error updating document:', err.message)
      isPending.value = false
      error.value = `Could not update document: ${err.message}`
      return { success: false, message: err.message }
    }
  }

  return { error, isPending, updateDoc }
}

export default useDocument
