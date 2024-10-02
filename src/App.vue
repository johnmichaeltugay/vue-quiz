<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <p class="text-4xl md:text-5xl text-center font-primary font-thin py-8">Trivia Quiz</p>
  <Transition name="swipe-left">
    <RouterView />
  </Transition>
</template>

<style>
.swipe-left-enter-active,
.swipe-left-leave-active {
  transition: all 0.3s cubic-bezier(0, 1.2, 0.85, 1);
}

.swipe-left-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.swipe-left-enter-to,
.swipe-left-leave-from {
  opacity: 1;
  transform: translateX(0%);
}

.swipe-left-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
