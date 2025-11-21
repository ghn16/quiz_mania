// import { reactive } from 'vue'
// import api from '../services/api'

// export const quizStore = reactive({
//   themes: [],
//   currentTheme: null,
//   currentQuestions: [],
//   currentQuestionIndex: 0,
//   score: 0,
//   totalQuestions: 0,
//   answered: false,
//   selectedAnswer: null,
//   showFeedback: false,
//   feedback: '',
//   timeLeft: 15,
//   timer: null,
//   loading: false,
//   error: null,

//   // ========== CHARGEMENT DES DONNÉES ==========
//   async loadThemes() {
//     this.loading = true
//     this.error = null
//     try {
//       this.themes = await api.getThemes()
//     } catch (error) {
//       this.error = 'Erreur lors du chargement des thèmes'
//       console.error(error)
//     } finally {
//       this.loading = false
//     }
//   },

//   async startQuiz(themeId) {
//     this.loading = true
//     try {
//       const theme = await api.getTheme(themeId)
//       if (!theme || theme.questions.length === 0) {
//         return false
//       }
//       this.currentTheme = theme
//       this.currentQuestions = [...theme.questions]
//       this.totalQuestions = this.currentQuestions.length
//       this.score = 0
//       this.currentQuestionIndex = 0
//       this.answered = false
//       this.selectedAnswer = null
//       this.showFeedback = false
//       return true
//     } catch (error) {
//       console.error('Erreur lors du démarrage du quiz:', error)
//       return false
//     } finally {
//       this.loading = false
//     }
//   },

//   // ========== GESTION ADMIN AVEC API ==========
//   async addTheme(themeData) {
//     try {
//       const newTheme = await api.createTheme(themeData)
//       this.themes.push(newTheme)
//       return { success: true, theme: newTheme }
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.message || 'Erreur lors de l\'ajout du thème'
//       }
//     }
//   },

//   async deleteTheme(id) {
//     try {
//       await api.deleteTheme(id)
//       this.themes = this.themes.filter(t => t.id !== id)
//       return { success: true }
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.message || 'Erreur lors de la suppression'
//       }
//     }
//   },

//   async addQuestion(questionData) {
//     try {
//       const newQuestion = await api.createQuestion(questionData.themeId, {
//         question: questionData.question,
//         answers: questionData.answers,
//         correct: questionData.correct,
//         time: questionData.time
//       })

//       const theme = this.themes.find(t => t.id === questionData.themeId)
//       if (theme) {
//         theme.questions.push(newQuestion)
//       }
//       return { success: true, question: newQuestion }
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.message || 'Erreur lors de l\'ajout de la question'
//       }
//     }
//   },

//   async deleteQuestion(themeId, questionId) {
//     try {
//       await api.deleteQuestion(themeId, questionId)
//       const theme = this.themes.find(t => t.id === themeId)
//       if (theme) {
//         theme.questions = theme.questions.filter(q => q.id !== questionId)
//       }
//       return { success: true }
//     } catch (error) {
//       return {
//         success: false,
//         error: error.response?.data?.message || 'Erreur lors de la suppression'
//       }
//     }
//   },

//   // ========== SAUVEGARDE DES SCORES ==========
//   async saveScore(playerName) {
//     try {
//       const scoreData = {
//         playerName,
//         themeId: this.currentTheme.id,
//         score: this.score,
//         totalQuestions: this.totalQuestions,
//         date: new Date().toISOString()
//       }
//       await api.saveScore(scoreData)
//       return { success: true }
//     } catch (error) {
//       return {
//         success: false,
//         error: 'Erreur lors de la sauvegarde du score'
//       }
//     }
//   },

//   selectAnswer(index) {
//     if (this.answered) return
//     this.answered = true
//     this.selectedAnswer = index
//     this.stopTimer()

//     const correct = this.currentQuestions[this.currentQuestionIndex].correct
//     if (index === correct) {
//       this.score++
//       this.feedback = '🎉'
//     } else {
//       this.feedback = '😢'
//     }
//     this.showFeedback = true
//   },

//   nextQuestion() {
//     this.showFeedback = false
//     this.answered = false
//     this.selectedAnswer = null

//     if (this.currentQuestionIndex < this.currentQuestions.length - 1) {
//       this.currentQuestionIndex++
//       return true
//     }
//     return false
//   },

//   startTimer(callback) {
//     const question = this.currentQuestions[this.currentQuestionIndex]
//     this.timeLeft = question.time
//     this.timer = setInterval(() => {
//       this.timeLeft--
//       if (this.timeLeft <= 0) {
//         this.stopTimer()
//         this.answered = true
//         this.feedback = '⏰'
//         this.showFeedback = true
//         callback()
//       }
//     }, 1000)
//   },

//   stopTimer() {
//     if (this.timer) {
//       clearInterval(this.timer)
//       this.timer = null
//     }
//   },

//   resetQuiz() {
//     this.stopTimer()
//     this.currentTheme = null
//     this.currentQuestions = []
//     this.currentQuestionIndex = 0
//     this.score = 0
//     this.totalQuestions = 0
//     this.answered = false
//     this.selectedAnswer = null
//     this.showFeedback = false
//     this.feedback = ''
//   }
// })



import { reactive } from 'vue'
import { themesData } from '../data/themes'

export const quizStore = reactive({
  themes: themesData,
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

  startQuiz(themeId) {
    const theme = this.themes.find(t => t.id === parseInt(themeId))
    if (!theme || theme.questions.length === 0) {
      return false
    }
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

  addTheme(themeData) {
    const id = Math.max(...this.themes.map(t => t.id), 0) + 1
    this.themes.push({
      id,
      name: themeData.name,
      icon: themeData.icon,
      questions: []
    })
  },

  deleteTheme(id) {
    this.themes = this.themes.filter(t => t.id !== id)
  },

  addQuestion(questionData) {
    const theme = this.themes.find(t => t.id === questionData.themeId)
    if (theme) {
      theme.questions.push({
        question: questionData.question,
        answers: questionData.answers,
        correct: questionData.correct,
        time: questionData.time
      })
    }
  },

  deleteQuestion(themeId, questionIndex) {
    const theme = this.themes.find(t => t.id === themeId)
    if (theme) {
      theme.questions.splice(questionIndex, 1)
    }
  }
})
