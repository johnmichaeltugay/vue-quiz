<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useQuizStore } from '@/stores/useQuizStore'

interface questionsRawData {
  question: string
  topics: string[]
}

const props = defineProps<{
  questionsList: questionsRawData[]
  quizCache: string
}>()

const store = useQuizStore()
const resetQuizData = () => {
  store.resetScoreTracker()
  localStorage.removeItem(props.quizCache)
}

const router = useRouter()
const localStorageData = localStorage.getItem(props.quizCache)
if (localStorageData !== null) {
  const data = JSON.parse(localStorageData)
  store.scoreTracker = data.d
  const quizProgress = data.d.reduce((acc: number, currentValue: boolean | null) => {
    if (currentValue !== null) acc += 1
    return acc
  }, 0)
  if (quizProgress < props.questionsList.length) router.push('/quiz')
} else router.push('/')
</script>
<template>
  <div
    class="select-none text-stone-50 text-center font-primary w-full flex flex-col justify-center align-center"
  >
    <h3 class="text-2xl font-extrabold">Your Score</h3>
    <p class="text-8xl font-thin mt-4 mb-2">{{ store.getScore() }}</p>
    <p class="text-md font-medium">
      You got {{ store.getScorePercentage() }} of the questions correct
    </p>
    <nav
      class="bg-stone-600 hover:bg-amber-500 hover:text-black flex flex-col justify-self-center rounded-sm transition-all ease-in-out duration-150 text-center w-full mt-12"
    >
      <RouterLink
        to="/"
        class="font-primary font-extrabold text-xl flex justify-center items-center py-3"
        @click="resetQuizData"
        ><span class="material-symbols-outlined pe-2"> refresh </span> Retake Quiz</RouterLink
      >
    </nav>
  </div>
</template>
