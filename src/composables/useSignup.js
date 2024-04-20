import { ref } from 'vue'
import { projectAuth, projectFirestore } from '@/firebase/config'

const error = ref(null)
const isPending = ref(false)

const signup = async (email, password, familyName, familyAddress, phoneNumber) => {
  error.value = null
  isPending.value = true

  try {
    const res = await projectAuth.createUserWithEmailAndPassword(email, password)

    if (!res) {
      throw new Error('Could not complete the sign up')
    }
    const userId = res.user.uid

    await projectFirestore.collection('familyMembers').doc(res.user.uid).set({
      userId,
      familyName,
      email,
      familyAddress: {
        street: familyAddress.street,
        number: familyAddress.number,
        zipcode: familyAddress.zipcode,
        country: familyAddress.country,
      },
      phoneNumber
    })

    await res.user.updateProfile({
      displayName: familyName
    })

    error.value = null
    isPending.value = false
    return res

  } catch (err) {
    console.error(err.message)
    error.value = err.message
    isPending.value = false
  }
}

const useSignup = () => {
  return { error, isPending, signup }
}

export default useSignup