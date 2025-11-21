<template>
  <div class="shapes">
    <div class="shape"></div>
    <div class="shape"></div>
    <div class="shape"></div>
    <div class="shape"></div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.shapes {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.shape {
  position: absolute;
  border: 3px solid rgba(251, 191, 36, 0.3);
  border-radius: 20px;
  animation: float 20s infinite ease-in-out;
}

.shape:nth-child(1) {
  width: 150px;
  height: 150px;
  top: 10%;
  left: 5%;
  animation-delay: 0s;
}

.shape:nth-child(2) {
  width: 100px;
  height: 100px;
  top: 60%;
  right: 10%;
  animation-delay: 2s;
  border-radius: 50%;
}

.shape:nth-child(3) {
  width: 80px;
  height: 80px;
  top: 30%;
  right: 20%;
  animation-delay: 4s;
  transform: rotate(45deg);
}

.shape:nth-child(4) {
  width: 120px;
  height: 120px;
  bottom: 15%;
  left: 15%;
  animation-delay: 1s;
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-30px) rotate(5deg); }
  50% { transform: translateY(-15px) rotate(-5deg); }
  75% { transform: translateY(-40px) rotate(3deg); }
}
</style>
