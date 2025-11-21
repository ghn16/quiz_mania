<template>
  <div class="quiz-box">
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <div class="question-header">
      <div class="score-display">
        <span>🏆</span>
        <span>{{ score }}</span>
      </div>
      <div>Question {{ currentQuestionIndex + 1 }}/{{ totalQuestions }}</div>
      <div class="timer-display">{{ timeLeft }}s</div>
    </div>

    <div class="question-text">{{ currentQuestion.question }}</div>

    <!-- SOIT le feedback, SOIT les réponses (pas les deux) -->
    <div v-if="showFeedback" class="feedback-container">
      <div class="feedback-emoji">{{ feedback }}</div>
    </div>

    <div v-else class="answers-container">
      <button
        v-for="(answer, index) in currentQuestion.answers"
        :key="index"
        :disabled="answered"
        :class="getAnswerClass(index)"
        class="answer-btn"
        @click="emit('select-answer', index)"
      >
        {{ answer }}
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  currentQuestion: { type: Object, required: true },
  currentQuestionIndex: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  score: { type: Number, required: true },
  timeLeft: { type: Number, required: true },
  answered: { type: Boolean, required: true },
  selectedAnswer: { type: Number, default: null },
  showFeedback: { type: Boolean, required: true },
  feedback: { type: String, default: '' },
  progress: { type: Number, required: true }
})

const emit = defineEmits(['select-answer'])

const getAnswerClass = (index) => {
  if (!props.answered) return ''
  if (index === props.currentQuestion.correct) return 'correct'
  if (index === props.selectedAnswer) return 'incorrect'
  return ''
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
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}

.progress-container {
  margin-bottom: 40px;
}

.progress-bar {
  width: 100%;
  height: 15px;
  background: rgba(30, 58, 138, 0.2);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #fbbf24, #f59e0b, #fbbf24);
  background-size: 200% 100%;
  border-radius: 20px;
  transition: width 0.5s ease;
  animation: shimmer 2s infinite;
  box-shadow: 0 0 15px rgba(251, 191, 36, 0.5);
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  border-radius: 20px;
  color: white;
  margin-bottom: 40px;
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.4);
}

.score-display {
  font-size: 1.6em;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
}

.timer-display {
  font-size: 2em;
  font-weight: 900;
  color: #fbbf24;
  animation: timerPulse 1s infinite;
}

@keyframes timerPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.question-text {
  font-size: 2em;
  font-weight: 700;
  color: #1e3a8a;
  text-align: center;
  margin: 40px 0;
  line-height: 1.4;
}

.feedback-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  margin: 40px 0;
}

.feedback-emoji {
  font-size: 10em;
  animation: emojiPop 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

@keyframes emojiPop {
  0% { transform: scale(0) rotate(-180deg); opacity: 0; }
  50% { transform: scale(1.2) rotate(10deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}

.answers-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 40px 0;
}

.answer-btn {
  padding: 30px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9));
  border: 3px solid rgba(30, 58, 138, 0.2);
  border-radius: 20px;
  font-size: 1.2em;
  font-weight: 600;
  color: #1e3a8a;
  cursor: pointer;
  transition: all 0.3s;
}

.answer-btn:hover:not(:disabled) {
  transform: translateY(-5px) scale(1.02);
  border-color: #fbbf24;
  box-shadow: 0 15px 35px rgba(251, 191, 36, 0.3);
}

.answer-btn.correct {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
  border-color: #10b981;
  animation: correctAnswer 0.6s;
}

.answer-btn.incorrect {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border-color: #ef4444;
  animation: incorrectAnswer 0.5s;
}

@keyframes correctAnswer {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.05) rotate(2deg); }
  75% { transform: scale(1.05) rotate(-2deg); }
}

@keyframes incorrectAnswer {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-10px); }
  50% { transform: translateX(10px); }
  75% { transform: translateX(-10px); }
}

.answer-btn:disabled {
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .answers-container {
    grid-template-columns: 1fr;
  }
  .quiz-box {
    padding: 30px 20px;
  }
}
</style>
