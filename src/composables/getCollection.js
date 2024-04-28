import { ref, watchEffect } from 'vue';
import { projectFirestore } from '../firebase/config';

const getCollection = (collection, query) => {

  const documents = ref(null)
  const error = ref(null)

  // register the firestore collection reference
  let collectionRef = projectFirestore.collection(collection)
    

  if (query) {
    collectionRef = collectionRef.where(...query)
  }

  const unsub = collectionRef.onSnapshot(snap => {
    let results = [];
    snap.docs.forEach(doc => {
      // must wait for the server to create the timestamp & send it back
      // we don't want to edit data until it has done this
      doc.data().createdAt && results.push({...doc.data(), id: doc.id})
    });
    
    // update values
    documents.value = results;
    error.value = null;
  }, err => {
    console.log(err.message)
    documents.value = null
    error.value = 'could not fetch the data'
  })
  // unsub from prev collection when watcher is stopped (component unmounted)
  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  })

  return { error, documents }
}

export default getCollection