import { ref } from 'vue'
import { projectStorage } from '@/firebase/config'
import getUser from './getUser'

const useStorage = () => {

  const { user } = getUser()

  const error = ref(null)
  const url = ref(null)
  const filePath = ref(null)

  const uploadImage = async (file, path) => {
    
    const uniqueFileName = `${file.name}-${Math.floor(new Date().valueOf() * Math.random() * 1000)}`
    filePath.value = `${path}/${user.value.uid}/${uniqueFileName}`
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