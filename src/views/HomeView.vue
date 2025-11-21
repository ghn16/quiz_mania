<template>
  <div>
    <div v-if="quizStore.loading" class="loading">
      <div class="spinner"></div>
      <p>Chargement des thèmes...</p>
    </div>

    <div v-else-if="quizStore.error" class="error">
      <p>{{ quizStore.error }}</p>
      <button @click="quizStore.loadThemes()" class="btn btn-primary">
        Réessayer
      </button>
    </div>

    <ThemeSelection
      v-else
      :themes="quizStore.themes"
      @start-quiz="startQuiz"
    />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { quizStore } from '../store/quizStore'
import ThemeSelection from '../components/ThemeSelection.vue'

export default {
  name: 'HomeView',
  components: {
    ThemeSelection
  },
  setup() {
    const router = useRouter()

    // Charger les thèmes au montage du composant
    onMounted(async () => {
      await quizStore.loadThemes()
    })

    const startQuiz = async (themeId) => {
      const success = await quizStore.startQuiz(themeId)
      if (success) {
        router.push(`/quiz/${themeId}`)
      } else {
        alert('⚠️ Ce thème ne contient pas encore de questions')
      }
    }

    return {
      quizStore,
      startQuiz
    }
  }
}
</script>

<style scoped>
.loading {
  text-align: center;
  padding: 100px 20px;
  color: white;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 6px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fbbf24;
  border-radius: 50%;
  margin: 0 auto 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error {
  text-align: center;
  padding: 100px 20px;
  color: white;
}

.error p {
  font-size: 1.5em;
  margin-bottom: 30px;
  color: #ef4444;
}
</style>
