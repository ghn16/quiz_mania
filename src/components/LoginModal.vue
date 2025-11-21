<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2 class="modal-title">🔐 Connexion Admin</h2>
      <div class="form-group">
        <label>Mot de passe</label>
        <input
          v-model="password"
          type="password"
          placeholder="Entrez le mot de passe"
          @keyup.enter="handleLogin" />
      </div>
      <button @click="handleLogin" class="btn btn-primary" style="width: 100%;">
        Se connecter
      </button>
      <p class="password-hint">
        💡 Mot de passe par défaut: <strong>admin123</strong>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginModal',
  emits: ['login', 'close'],
  data() {
    return {
      password: ''
    }
  },
  methods: {
    handleLogin() {
      this.$emit('login', this.password)
      this.password = ''
    }
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal-content {
  background: white;
  padding: 50px;
  border-radius: 25px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
  animation: modalSlide 0.3s;
}

@keyframes modalSlide {
  from { transform: translateY(-50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.modal-title {
  font-size: 2.5em;
  font-weight: 900;
  color: #1e3a8a;
  text-align: center;
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
  font-size: 1.1em;
}

.form-group input {
  width: 100%;
  padding: 15px;
  border: 3px solid rgba(30, 58, 138, 0.2);
  border-radius: 12px;
  font-size: 1.1em;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #fbbf24;
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
}

.password-hint {
  text-align: center;
  margin-top: 20px;
  color: #64748b;
  font-size: 0.95em;
}

.password-hint strong {
  color: #1e3a8a;
}
</style>
