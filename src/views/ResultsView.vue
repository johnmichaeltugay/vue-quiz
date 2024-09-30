<script setup lang="ts">
import { useQuizStore } from '@/stores/useQuizStore'

const props = defineProps<{
  questionsList: object
  quizCache: string
}>()

const store = useQuizStore()
const resetQuizData = () => {
  store.resetScoreTracker()
  localStorage.removeItem(props.quizCache)
}
</script>
<template>
  <div
    class="text-stone-50 text-center font-primary w-full flex flex-col justify-center align-center"
  >
    <h3 class="text-2xl font-extrabold">Your Score</h3>
    <p class="text-8xl font-thin mt-4 mb-2">{{ store.getScore() }}</p>
    <p class="text-md font-medium">
      You got {{ store.getScorePercentage() }} of the questions correct
    </p>
    <nav
      class="bg-stone-600 hover:bg-amber-500 hover:text-black flex flex-col justify-self-center rounded-sm transition-all ease-in-out duration-150 text-center w-full py-3 mt-12"
    >
      <RouterLink
        to="/"
        class="font-primary font-extrabold text-xl items-stretch"
        @click="resetQuizData"
        >Retake Quiz</RouterLink
      >
    </nav>
  </div>
</template>
