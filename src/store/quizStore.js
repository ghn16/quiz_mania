import { reactive } from 'vue'
import { themesData } from '../data/themes'

export const quizStore = reactive({
  themes: JSON.parse(JSON.stringify(themesData)),
  currentTheme: null,
  currentQuestions: [],
  currentQuestionIndex: 0,
  score: 0,
  totalQuestions: 0,
  answered: false,
  selectedAnswer: null,
  showFeedback: false,
  feedback: '',
  timeLeft: 15,
  timer: null,
  loading: false,
  error: null,

  async loadThemes() {
    this.loading = true
    this.error = null
    try {
      await new Promise(resolve => setTimeout(resolve, 300))
    } catch (error) {
      this.error = 'Erreur lors du chargement des thèmes'
    } finally {
      this.loading = false
    }
  },

  startQuiz(themeId) {
    const theme = this.themes.find(t => t.id === parseInt(themeId))
    if (!theme || theme.questions.length === 0) return false

    this.currentTheme = theme
    this.currentQuestions = [...theme.questions]
    this.totalQuestions = this.currentQuestions.length
    this.score = 0
    this.currentQuestionIndex = 0
    this.answered = false
    this.selectedAnswer = null
    this.showFeedback = false
    return true
  },

  selectAnswer(index) {
    if (this.answered) return
    this.answered = true
    this.selectedAnswer = index
    this.stopTimer()

    const correct = this.currentQuestions[this.currentQuestionIndex].correct
    if (index === correct) {
      this.score++
      this.feedback = '🎉'
    } else {
      this.feedback = '😢'
    }
    this.showFeedback = true
  },

  nextQuestion() {
    this.showFeedback = false
    this.answered = false
    this.selectedAnswer = null

    if (this.currentQuestionIndex < this.currentQuestions.length - 1) {
      this.currentQuestionIndex++
      return true
    }
    return false
  },

  startTimer(callback) {
    const question = this.currentQuestions[this.currentQuestionIndex]
    this.timeLeft = question.time
    this.timer = setInterval(() => {
      this.timeLeft--
      if (this.timeLeft <= 0) {
        this.stopTimer()
        this.answered = true
        this.feedback = '⏰'
        this.showFeedback = true
        callback()
      }
    }, 1000)
  },

  stopTimer() {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },

  resetQuiz() {
    this.stopTimer()
    this.currentTheme = null
    this.currentQuestions = []
    this.currentQuestionIndex = 0
    this.score = 0
    this.totalQuestions = 0
    this.answered = false
    this.selectedAnswer = null
    this.showFeedback = false
    this.feedback = ''
  },

  // === GESTION ADMIN ===
  addTheme(data) {
    const id = Math.max(...this.themes.map(t => t.id), 0) + 1
    this.themes.push({ id, name: data.name, icon: data.icon, questions: [] })
    return { success: true }
  },

  updateTheme(id, data) {
    const theme = this.themes.find(t => t.id === id)
    if (theme) {
      theme.name = data.name
      theme.icon = data.icon
      return { success: true }
    }
    return { success: false, error: 'Thème non trouvé' }
  },

  deleteTheme(id) {
    const idx = this.themes.findIndex(t => t.id === id)
    if (idx !== -1) {
      this.themes.splice(idx, 1)
      return { success: true }
    }
    return { success: false, error: 'Thème non trouvé' }
  },

  addQuestion(data) {
    const theme = this.themes.find(t => t.id === data.themeId)
    if (theme) {
      theme.questions.push({
        question: data.question,
        answers: data.answers,
        correct: data.correct,
        time: data.time
      })
      return { success: true }
    }
    return { success: false, error: 'Thème non trouvé' }
  },

  updateQuestion(themeId, index, data) {
    const theme = this.themes.find(t => t.id === themeId)
    if (theme?.questions[index]) {
      theme.questions[index] = {
        question: data.question,
        answers: data.answers,
        correct: data.correct,
        time: data.time
      }
      return { success: true }
    }
    return { success: false, error: 'Question non trouvée' }
  },

  deleteQuestion(themeId, index) {
    const theme = this.themes.find(t => t.id === themeId)
    if (theme?.questions[index] !== undefined) {
      theme.questions.splice(index, 1)
      return { success: true }
    }
    return { success: false, error: 'Question non trouvée' }
  }
})
