import { ref, watchEffect } from 'vue'
import { projectFirestore } from '@/firebase/config'

const getDocument = (collection, id) => {
  
  const document = ref(null)
  const error = ref(null)

  // firestore collection reference
  let documentRef = projectFirestore.collection(collection).doc(id)

  const unsub = documentRef.onSnapshot(
    (doc) => {
      console.log('Document data:', doc.data());
      if (doc.data()) {
        document.value = { ...doc.data(), id: doc.id }
        error.value = null
      } else {
        error.value = 'that document does not exist'
      }
    },
    (err) => {
      console.log(err.message)
      error.value = 'could not fetch document'
    }
  )
  // unsub from prev collection when watcher is stopped (component unmounted)
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })

  return { error, document }
}

export default getDocument