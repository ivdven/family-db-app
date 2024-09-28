import { ref } from 'vue'
import { projectStorage } from '@/firebase/config'
import getUser from './getUser'

const useStorage = () => {

  const { user } = getUser()

  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file, path) => {
    filePath.value = `${path}/${user.value.uid}/${file.name}`
    const storageRef = projectStorage.ref(filePath.value)

    try {
      const res = await storageRef.put(file)
      url.value = await res.ref.getDownloadURL()
    } catch (err) {
      console.log(err)
      error.value = err.message
    }
  }

  return { user, error, url, filePath, uploadImage }
}

export default useStorage