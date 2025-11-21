<template>
  <QuizGame
    v-if="currentQuestion"
    :current-question="currentQuestion"
    :current-question-index="quizStore.currentQuestionIndex"
    :total-questions="quizStore.totalQuestions"
    :score="quizStore.score"
    :time-left="quizStore.timeLeft"
    :answered="quizStore.answered"
    :selected-answer="quizStore.selectedAnswer"
    :show-feedback="quizStore.showFeedback"
    :feedback="quizStore.feedback"
    :progress="progress"
    @select-answer="selectAnswer"
  />
</template>

<script>
import { quizStore } from '../store/quizStore'
import QuizGame from '../components/QuizGame.vue'

export default {
  name: 'QuizView',
  components: {
    QuizGame
  },
  props: {
    themeId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      quizStore
    }
  },
  computed: {
    currentQuestion() {
      return quizStore.currentQuestions[quizStore.currentQuestionIndex]
    },
    progress() {
      return ((quizStore.currentQuestionIndex + 1) / quizStore.totalQuestions) * 100
    }
  },
  mounted() {
    if (!quizStore.currentTheme) {
      const success = quizStore.startQuiz(this.themeId)
      if (!success) {
        this.$router.push('/')
        return
      }
    }
    quizStore.startTimer(() => {
      setTimeout(() => this.nextQuestion(), 1500)
    })
  },
  beforeUnmount() {
    quizStore.stopTimer()
  },
  methods: {
    selectAnswer(index) {
      quizStore.selectAnswer(index)
      setTimeout(() => this.nextQuestion(), 1500)
    },
    nextQuestion() {
      const hasNext = quizStore.nextQuestion()
      if (!hasNext) {
        this.$router.push('/results')
      } else {
        quizStore.startTimer(() => {
          setTimeout(() => this.nextQuestion(), 1500)
        })
      }
    }
  }
}
</script>
