import { ref } from 'vue'
import { projectFirestore } from '@/firebase/config'
import getUser from '@/composables/getUser';  // Import getUser composable to get user information

const useDocument = (collection, id, userId = null) => {
  const error = ref(null)
  const isPending = ref(false)
  const { user } = getUser();  // Get user information from the composable

  let documentRef = projectFirestore.collection(collection).doc(id)

  // If userId is not provided, use the userId from the user object
  if (!userId && user.value) {
    userId = user.value.uid;
  }

  const updateDoc = async (updates) => {
    isPending.value = true;
    error.value = null;
  
    try {
      if ('userId' in updates && updates.userId !== userId) {
        throw new Error('Unauthorized update attempt');
      } 
      const res = await documentRef.update(updates)
      isPending.value = false
      return res
    } catch (err) {
      isPending.value = false
      error.value = 'could not update document'
    }

  };

  return { error, isPending, updateDoc }
}

export default useDocument
