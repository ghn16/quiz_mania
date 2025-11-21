import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor pour ajouter le token d'authentification
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('adminToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default {
  // ========== THÈMES ==========
  async getThemes() {
    const response = await api.get('/themes')
    return response.data
  },

  async getTheme(id) {
    const response = await api.get(`/themes/${id}`)
    return response.data
  },

  async createTheme(themeData) {
    const response = await api.post('/themes', themeData)
    return response.data
  },

  async updateTheme(id, themeData) {
    const response = await api.put(`/themes/${id}`, themeData)
    return response.data
  },

  async deleteTheme(id) {
    const response = await api.delete(`/themes/${id}`)
    return response.data
  },

  // ========== QUESTIONS ==========
  async getQuestions(themeId) {
    const response = await api.get(`/themes/${themeId}/questions`)
    return response.data
  },

  async createQuestion(themeId, questionData) {
    const response = await api.post(`/themes/${themeId}/questions`, questionData)
    return response.data
  },

  async updateQuestion(themeId, questionId, questionData) {
    const response = await api.put(`/themes/${themeId}/questions/${questionId}`, questionData)
    return response.data
  },

  async deleteQuestion(themeId, questionId) {
    const response = await api.delete(`/themes/${themeId}/questions/${questionId}`)
    return response.data
  },

  // ========== AUTHENTIFICATION ==========
  async login(password) {
    const response = await api.post('/auth/login', { password })
    return response.data
  },

  async logout() {
    const response = await api.post('/auth/logout')
    sessionStorage.removeItem('adminToken')
    sessionStorage.removeItem('isAdmin')
    return response.data
  },

  async verifyToken() {
    try {
      const response = await api.get('/auth/verify')
      return response.data.valid
    } catch {
      return false
    }
  },

  // ========== SCORES ==========
  async saveScore(scoreData) {
    const response = await api.post('/scores', scoreData)
    return response.data
  },

  async getLeaderboard(themeId = null) {
    const url = themeId ? `/scores/leaderboard?theme=${themeId}` : '/scores/leaderboard'
    const response = await api.get(url)
    return response.data
  },
}
