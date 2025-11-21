<template>
  <button class="admin-fab" @click="$emit('click')">
    🔐
  </button>
</template>

<script>
export default {
  name: 'AdminButton',
  emits: ['click']
}
</script>

<style scoped>
.admin-fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7c3aed, #6d28d9);
  border: none;
  font-size: 2em;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(124, 58, 237, 0.5);
  transition: all 0.3s;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-fab:hover {
  transform: scale(1.1) rotate(90deg);
  box-shadow: 0 15px 40px rgba(124, 58, 237, 0.7);
}
</style>
