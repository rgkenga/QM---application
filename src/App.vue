<template>
  <PreloaderVue v-if="isLoading" />
  <router-view />
</template>

<script>
import { ref, defineComponent, onMounted } from 'vue'
import PreloaderVue from './components/PreloaderVue.vue'

export default defineComponent({
  name: 'App',
  components: {
    PreloaderVue
  },
  setup () {
    const isLoading = ref(true)

    onMounted(() => {
      setTimeout(() => {
        isLoading.value = false
      }, 2000)
    })
    return {
      isLoading
    }
  }
})
</script>
