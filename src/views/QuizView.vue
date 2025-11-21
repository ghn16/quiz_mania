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

<script setup>
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { quizStore } from '../store/quizStore'
import QuizGame from '../components/QuizGame.vue'

const props = defineProps({
  themeId: { type: String, required: true }
})

const router = useRouter()

const currentQuestion = computed(() =>
  quizStore.currentQuestions[quizStore.currentQuestionIndex]
)

const progress = computed(() =>
  ((quizStore.currentQuestionIndex + 1) / quizStore.totalQuestions) * 100
)

const nextQuestion = () => {
  const hasNext = quizStore.nextQuestion()
  if (!hasNext) {
    router.push('/results')
  } else {
    quizStore.startTimer(() => {
      setTimeout(() => nextQuestion(), 1500)
    })
  }
}

const selectAnswer = (index) => {
  quizStore.selectAnswer(index)
  setTimeout(() => nextQuestion(), 1500)
}

onMounted(() => {
  if (!quizStore.currentTheme) {
    const success = quizStore.startQuiz(props.themeId)
    if (!success) {
      router.push('/')
      return
    }
  }
  quizStore.startTimer(() => {
    setTimeout(() => nextQuestion(), 1500)
  })
})

onBeforeUnmount(() => {
  quizStore.stopTimer()
})
</script>
