<template>
  <div class="logo-container">
    <div class="logo-main">
      <div class="logo-decorations">
        <span class="logo-icon">✖</span>
        <span class="logo-icon">▷</span>
        <span class="logo-icon">○</span>
        <span class="logo-icon">✖</span>
        <span class="logo-icon">▷</span>
      </div>
      <span class="logo-quiz">QUIZ</span>
      <span class="logo-time">MANIA</span>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.logo-container {
  text-align: center;
  margin: 40px 0 60px;
  position: relative;
  z-index: 1;
}

.logo-main {
  font-size: 8em;
  font-weight: 900;
  line-height: 0.9;
  position: relative;
  display: inline-block;
  margin-bottom: 20px;
}

.logo-quiz {
  color: #fbbf24;
  text-shadow:
    4px 4px 0 #fff,
    8px 8px 15px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(251, 191, 36, 0.5);
  display: block;
  letter-spacing: -5px;
}

.logo-time {
  color: #fff;
  text-shadow:
    4px 4px 0 #3b82f6,
    8px 8px 15px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(59, 130, 246, 0.5);
  display: block;
  letter-spacing: -5px;
  margin-top: -10px;
}

.logo-decorations {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.logo-icon {
  position: absolute;
  font-size: 2em;
  animation: pulse 2s infinite;
}

.logo-icon:nth-child(1) {
  top: -20px;
  left: -30px;
  color: #fbbf24;
}

.logo-icon:nth-child(2) {
  top: -10px;
  right: -30px;
  color: #fff;
  animation-delay: 0.5s;
}

.logo-icon:nth-child(3) {
  bottom: -20px;
  left: 20%;
  color: #fbbf24;
  animation-delay: 1s;
}

.logo-icon:nth-child(4) {
  bottom: 30%;
  right: -40px;
  color: #fff;
  animation-delay: 1.5s;
}

.logo-icon:nth-child(5) {
  top: 40%;
  left: -50px;
  color: #fbbf24;
  animation-delay: 0.3s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .logo-main {
    font-size: 5em;
  }
}
</style>
