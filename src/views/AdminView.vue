<template>
  <AdminPanel
    :themes="quizStore.themes"
    @add-theme="quizStore.addTheme"
    @delete-theme="quizStore.deleteTheme"
    @add-question="quizStore.addQuestion"
    @delete-question="quizStore.deleteQuestion"
    @close="close"
  />
</template>

<script>
import { quizStore } from '../store/quizStore'
import AdminPanel from '../components/AdminPanel.vue'

export default {
  name: 'AdminView',
  components: {
    AdminPanel
  },
  data() {
    return {
      quizStore
    }
  },
  methods: {
    close() {
      this.$router.push('/')
    }
  }
}
</script>
