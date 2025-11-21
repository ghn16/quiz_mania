<template>
  <div class="themes-grid">
    <div
      v-for="theme in themes"
      :key="theme.id"
      class="theme-card"
      @click="emit('start-quiz', theme.id)"
    >
      <div class="theme-icon">{{ theme.icon }}</div>
      <div class="theme-name">{{ theme.name }}</div>
      <div class="theme-info">{{ theme.questions.length }} questions</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  themes: { type: Array, required: true }
})

const emit = defineEmits(['start-quiz'])
</script>

<style scoped>
.themes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  padding: 20px;
}

.theme-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 3px solid rgba(59, 130, 246, 0.5);
  border-radius: 25px;
  padding: 40px 30px;
  text-align: center;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
}

.theme-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, transparent, rgba(251, 191, 36, 0.1), transparent);
  transform: rotate(45deg);
  transition: 0.6s;
}

.theme-card:hover::before {
  left: 100%;
}

.theme-card:hover {
  transform: translateY(-15px) scale(1.05);
  border-color: #fbbf24;
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.5),
    0 0 40px rgba(251, 191, 36, 0.4),
    inset 0 0 30px rgba(251, 191, 36, 0.1);
}

.theme-icon {
  font-size: 5em;
  margin-bottom: 20px;
  filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.theme-card:hover .theme-icon {
  animation: spin 0.6s ease;
}

@keyframes spin {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.2); }
  100% { transform: rotate(360deg) scale(1); }
}

.theme-name {
  font-size: 1.8em;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.theme-info {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1em;
  font-weight: 500;
}

@media (max-width: 768px) {
  .themes-grid {
    grid-template-columns: 1fr;
  }
}
</style>
