<template>
  <QuizResults
    :score="quizStore.score"
    :total-questions="quizStore.totalQuestions"
    @restart="restart"
    @back-to-themes="backToThemes"
  />
</template>

<script>
import { quizStore } from '../store/quizStore'
import QuizResults from '../components/QuizResults.vue'

export default {
  name: 'ResultsView',
  components: {
    QuizResults
  },
  data() {
    return {
      quizStore
    }
  },
  methods: {
    restart() {
      const themeId = quizStore.currentTheme.id
      quizStore.resetQuiz()
      this.$router.push(`/quiz/${themeId}`)
    },
    backToThemes() {
      quizStore.resetQuiz()
      this.$router.push('/')
    }
  }
}
</script>
