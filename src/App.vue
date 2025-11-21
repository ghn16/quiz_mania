<template>
  <div id="app">
    <FloatingShapes />

    <div class="main-container">
      <QuizLogo v-if="$route.name === 'home'" />

      <!-- RouterView remplace les v-if conditionnels -->
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>

    <AdminButton
      v-if="!isAdmin && $route.name === 'home'"
      @click="showLogin = true"
    />

    <LoginModal
      v-if="showLogin"
      @login="login"
      @close="showLogin = false"
    />
  </div>
</template>

<script>
import FloatingShapes from './components/FloatingShapes.vue'
import QuizLogo from './components/QuizLogo.vue'
import AdminButton from './components/AdminButton.vue'
import LoginModal from './components/LoginModal.vue'

export default {
  name: 'App',
  components: {
    FloatingShapes,
    QuizLogo,
    AdminButton,
    LoginModal
  },
  data() {
    return {
      isAdmin: sessionStorage.getItem('isAdmin') === 'true',
      showLogin: false
    }
  },
  methods: {
    login(password) {
      if (password === 'admin123') {
        this.isAdmin = true
        sessionStorage.setItem('isAdmin', 'true')
        this.showLogin = false
        this.$router.push('/admin')
      } else {
        alert('❌ Mot de passe incorrect')
      }
    }
  }
}
</script>

<style>
/* Transitions entre les routes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

