<template>
  <div class="admin-wrapper">
    <!-- Écran de connexion -->
    <div v-if="!isAuthenticated" class="login-container">
      <div class="login-box">
        <h2 class="login-title">🔐 Espace Administration</h2>
        <p class="login-subtitle">Connectez-vous pour gérer les quiz</p>

        <div class="form-group">
          <label>Mot de passe</label>
          <input
            v-model="password"
            type="password"
            placeholder="Entrez le mot de passe"
            @keyup.enter="login"
            class="login-input"
          />
        </div>

        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>

        <button @click="login" class="btn btn-primary login-btn">
          Se connecter
        </button>

        <button @click="goHome" class="btn btn-secondary back-btn">
          ← Retour à l'accueil
        </button>
      </div>
    </div>

    <!-- Panel Admin -->
    <AdminPanel
      v-else
      :themes="quizStore.themes"
      @add-theme="quizStore.addTheme"
      @update-theme="quizStore.updateTheme"
      @delete-theme="quizStore.deleteTheme"
      @add-question="quizStore.addQuestion"
      @update-question="quizStore.updateQuestion"
      @delete-question="quizStore.deleteQuestion"
      @logout="logout"
      @close="goHome"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { quizStore } from '../store/quizStore'
import AdminPanel from '../components/AdminPanel.vue'

const router = useRouter()
const password = ref('')
const errorMessage = ref('')
const isAuthenticated = ref(false)

const ADMIN_PASSWORD = 'admin123'

onMounted(() => {
  isAuthenticated.value = sessionStorage.getItem('isAdmin') === 'true'
})

const login = () => {
  if (password.value === ADMIN_PASSWORD) {
    isAuthenticated.value = true
    sessionStorage.setItem('isAdmin', 'true')
    errorMessage.value = ''
    password.value = ''
  } else {
    errorMessage.value = '❌ Mot de passe incorrect'
  }
}

const logout = () => {
  isAuthenticated.value = false
  sessionStorage.removeItem('isAdmin')
  router.push('/')
}

const goHome = () => router.push('/')
</script>

<style scoped>
.admin-wrapper {
  min-height: 100vh;
  padding: 20px;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
}

.login-box {
  background: white;
  padding: 50px;
  border-radius: 25px;
  max-width: 450px;
  width: 100%;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(-30px); }
  to { opacity: 1; transform: translateY(0); }
}

.login-title {
  font-size: 2em;
  font-weight: 900;
  color: #1e3a8a;
  text-align: center;
  margin-bottom: 10px;
}

.login-subtitle {
  text-align: center;
  color: #64748b;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 700;
  color: #1e3a8a;
}

.login-input {
  width: 100%;
  padding: 15px;
  border: 3px solid rgba(30, 58, 138, 0.2);
  border-radius: 12px;
  font-size: 1.1em;
  transition: all 0.3s;
}

.login-input:focus {
  outline: none;
  border-color: #fbbf24;
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
}

.error-message {
  color: #ef4444;
  text-align: center;
  margin-bottom: 20px;
  font-weight: 600;
}

.btn {
  padding: 15px 30px;
  border: none;
  border-radius: 12px;
  font-size: 1.1em;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.login-btn {
  width: 100%;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  color: white;
}

.login-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(37, 99, 235, 0.4);
}

.back-btn {
  width: 100%;
  background: #f3f4f6;
  color: #64748b;
}

.back-btn:hover {
  background: #e5e7eb;
}
</style>
