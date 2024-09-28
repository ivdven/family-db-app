<template>
  <form @submit.prevent="handleSubmit">
    <label>Title</label>
    <input type="text" required v-model="title" placeholder="Enter title">
    <label>Story</label>
    <textarea cols="10" rows="10" required v-model="story" placeholder="Write a story..."></textarea>
    <label>Upload content</label>
    <input type="file" @change="handleUpload">
    <div class="error" v-if="error">{{ error }}</div>
    <div class="error" v-if="fileError">{{ fileError }}</div>
    <div v-if="!isPending">
      <button>Submit</button>
    </div>
    <div v-else>
      <button disabled>Submitting..</button>
    </div>
  </form>
</template>

<script>
import getUser from '@/composables/getUser'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { timestamp } from '@/firebase/config'

export default {
  setup() {
    
    const { user } = getUser()
    const { url, filePath, uploadImage } = useStorage()
    const { error, isPending, addDocument } = useCollection('blogs')

    const router = useRouter()

    const title = ref('')
    const story = ref('')
    const file = ref(null)
    const fileError = ref(null)

    const types = ['image/png', 'image/jpeg', 'image/jpg', 'video/mp4', 'video/ogg', 'video/webm']

    const handleUpload = (e) => {
      let selectedFile = e.target.files[0]
      if (selectedFile && types.includes(selectedFile.type)) {
        file.value = selectedFile
        fileError.value = null
      } else {
        file.value = null
        fileError.value = `Please select the right file: ${types.join(' ')}`
      }
    }

    const handleSubmit = async () => {
      const folder = 'blogs'
      if (file.value) {
        await uploadImage(file.value, folder)
        const res = await addDocument({
          title: title.value,
          story: story.value,
          userId: user.value.uid,
          contentUrl: url.value,
          filePath: filePath.value,
          createdAt: timestamp()
        })
      } else {
        return error.value
      }
    }

    return { title, story, error, isPending, file, fileError, handleUpload, handleSubmit }
    
  }
}

</script>

<style>

</style>