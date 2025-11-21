<template>
  <div class="quiz-box results-box">
    <h2 class="results-title">Quiz Terminé!</h2>
    <div class="results-emoji">{{ getResultEmoji() }}</div>
    <div class="results-score">{{ score }}/{{ totalQuestions }}</div>
    <p class="results-percentage">{{ getPercentage() }}% de réussite</p>
    <button @click="$emit('back-to-themes')" class="btn btn-primary">
      🏠 Retour aux thèmes
    </button>
    <button @click="$emit('restart')" class="btn btn-secondary">
      🔄 Recommencer
    </button>
  </div>
</template>

<script>
export default {
  name: 'QuizResults',
  props: {
    score: Number,
    totalQuestions: Number
  },
  emits: ['restart', 'back-to-themes'],
  methods: {
    getPercentage() {
      return Math.round((this.score / this.totalQuestions) * 100)
    },
    getResultEmoji() {
      const p = this.getPercentage()
      if (p === 100) return '🏆'
      if (p >= 80) return '🎉'
      if (p >= 60) return '😊'
      if (p >= 40) return '😐'
      return '😢'
    }
  }
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
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
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
  margin: 30px 0;
}

.results-percentage {
  font-size: 1.8em;
  color: #64748b;
  margin: 20px 0;
}
</style>
