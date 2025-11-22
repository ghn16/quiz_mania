<template>
  <div class="quiz-box results-box">
    <h2 class="results-title">Quiz Terminé!</h2>
    <div class="results-emoji">{{ resultEmoji }}</div>
    <div class="results-score">{{ quizStore.score }}/{{ quizStore.totalQuestions }}</div>
    <p class="results-percentage">{{ percentage }}% de réussite</p>
    <button class="btn btn-primary" @click="backToThemes">
      🏠 Retour aux thèmes
    </button>
    <button class="btn btn-secondary" @click="restart">
      🔄 Recommencer
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { quizStore } from '../store/quizStore'

const router = useRouter()

const percentage = computed(() =>
  Math.round((quizStore.score / quizStore.totalQuestions) * 100)
)

const resultEmoji = computed(() => {
  const p = percentage.value
  if (p === 100) return '🏆'
  if (p >= 80) return '🎉'
  if (p >= 60) return '😊'
  if (p >= 40) return '😐'
  return '😢'
})

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

<style scoped>
.quiz-box {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 30px;
  padding: 50px;
  max-width: 900px;
  margin: 0 auto;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
}

.results-box {
  text-align: center;
  padding: 40px;
}

.results-title {
  font-size: 3.5em;
  font-weight: 900;
  color: #1e3a8a;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.results-emoji {
  font-size: 10em;
  margin: 30px 0;
  animation: emojiPop 1s;
}

@keyframes emojiPop {
  0% { transform: scale(0) rotate(-180deg); opacity: 0; }
  50% { transform: scale(1.2) rotate(10deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

.results-score {
  font-size: 3em;
  font-weight: 900;
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 30px 0;
}

.results-percentage {
  font-size: 1.8em;
  color: #64748b;
  margin: 20px 0 40px;
}

.btn {
  padding: 18px 40px;
  border: none;
  border-radius: 15px;
  font-size: 1.2em;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  margin: 10px;
}

.btn-primary {
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(37, 99, 235, 0.4);
}

.btn-secondary {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: #1e3a8a;
}

.btn-secondary:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(251, 191, 36, 0.4);
}
</style>
