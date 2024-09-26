<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, RouterLink, RouterView } from 'vue-router'

const isQuizTime = computed(() => {
  return useRouter().currentRoute._value.name === 'quiz'
})
</script>

<template>
  <p class="text-5xl text-center font-primary font-thin py-8">Trivia Quiz</p>
  <div class="bg-red-500 w-full" v-if="isQuizTime">conditional rendering based on url</div>
  <div
    class="flex flex-col justify-center items-center border-white border-2 rounded-md p-6 md:p-12"
  >
    <RouterView />
  </div>
</template>

<style scoped>
/* nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
} */

@media (min-width: 1024px) {
  /* nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  } */
}
</style>
