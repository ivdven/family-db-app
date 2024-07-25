import { ref } from 'vue'
import { projectAuth } from '@/firebase/config'

const user = ref(projectAuth.currentUser)

projectAuth.onAuthStateChanged(_user => {
  if (_user) {
    console.log('User state changed. Current user is:', _user);
    user.value = _user
  } else {
    console.error('User is not authenticated.');
    user.value = null
  }
})

const getUser = () => {
  return { user }
}

export default getUser
