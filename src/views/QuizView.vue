<template>
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Chargement des thèmes...</p>
    </div>

  <div v-if="themeQuestion" class="quiz-box">
    <div class="progress-container">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
    </div>

    <div class="question-header">
      <div class="score-display">
        <span>🏆</span>
       <!--  <span>{{ quizStore.score }}</span> -->
      </div>
      <div>Question {{  }}</div>
      <div class="timer-display">{{ 15 }}s</div>
    </div>

    <div class="question-container">
      <div class="question-text">{{ themeQuestion.data.questions[currentQuestionIndex].question }}</div>
    </div>

     <div class="answers-container">
      <button
        v-for="(answer,index) in themeQuestion.data.questions[currentQuestionIndex].reponses"
        :key="answer.id"
        class="answer-btn"
        @click="selectAnswer(index)"
      >
        {{answer.name }}
      </button>
    </div> 
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount,ref } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { apiGet } from '@/helpears/axiosApi'

const props = defineProps({
  themeId: { type: String, required: true }
})

const router = useRouter()

const route = useRoute()
const currentQuestionIndex = ref(0)
const loading = ref(false)
const answerId = ref()

const themeQuestion = ref(null)

const themeId = route.params.themeId

// const currentQuestion = computed(() =>
//   quizStore.currentQuestions[quizStore.currentQuestionIndex]
// )

const getThemeIdApi = async(id)=>{
 const response = await apiGet('http://localhost:8050/api/v1/admin/theme/indexThemeId/' + themeId)
 themeQuestion.value = response 
  console.log('themesQuestion.value: ', themeQuestion.value.data.questions[0].reponses[0].id);
 }
/* 
const progress = computed(() =>
  ((quizStore.currentQuestionIndex + 1) / quizStore.totalQuestions) * 100
)  

const getAnswerClass = (index) => {
  if (!quizStore.answered) return ''
  if (index === currentQuestion.value.correct) return 'correct'
  if (index === quizStore.selectedAnswer) return 'incorrect'
  return ''
}  






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
*/

const selectAnswer = async (reponseId) => {
  console.log(reponseId)
  const response = await themeQuestion.value.data.questions[currentQuestionIndex.value].reponses[reponseId]
  answerId.value = response
  console.log(' answerId.value: ',  answerId.value.status);

  if(answerId.value.status == "vrai"){
    
  }


  setTimeout(() => nextQuestion(), 1500)
}
onMounted(async() => {
  /* if (!quizStore.currentTheme) {
    const success = quizStore.startQuiz(props.themeId)
    if (!success) {
      router.push('/')
      return
    } 
  }*/
/*   quizStore.startTimer(() => {
    setTimeout(() => nextQuestion(), 1500)
  })
 */
  await getThemeIdApi()
})

onBeforeUnmount(() => {
  quizStore.stopTimer()
})
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

.question-container {
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px 0;
}

.question-text {
  font-size: 2em;
  font-weight: 700;
  color: #1e3a8a;
  text-align: center;
  line-height: 1.4;
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
}

.answer-btn.incorrect {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
  border-color: #ef4444;
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
