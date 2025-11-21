<template>
  <QuizResults
    :score="quizStore.score"
    :total-questions="quizStore.totalQuestions"
    @restart="restart"
    @back-to-themes="backToThemes"
  />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { quizStore } from '../store/quizStore'
import QuizResults from '../components/QuizResults.vue'

const router = useRouter()

const restart = () => {
  const themeId = quizStore.currentTheme.id
  quizStore.resetQuiz()
  router.push(`/quiz/${themeId}`)
}

const backToThemes = () => {
  quizStore.resetQuiz()
  router.push('/')
}
</script>
