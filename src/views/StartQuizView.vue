<script setup lang="ts">
import { useRouter } from 'vue-router'

interface questionsRawData {
  question: string
  topics: string[]
  choices: string[]
}
const props = defineProps<{
  questionsList: questionsRawData[]
  quizCache: string
}>()

const topicsRoster = props.questionsList.reduce((acc: string[], item: questionsRawData) => {
  for (const topic of item.topics) {
    if (!acc.includes(topic)) acc.push(topic)
  }
  return acc
}, [])

const lastItem = topicsRoster.pop()
const topicsList = [topicsRoster.join(', '), lastItem].join(', and ')

const router = useRouter()
const localStorageData = localStorage.getItem(props.quizCache)
if (localStorageData !== null) {
  const data = JSON.parse(localStorageData)
  const quizProgress = data.quizProgress.reduce(
    (accumulator: number, currentValue: boolean | null) => {
      if (currentValue !== null) accumulator += 1
      return accumulator
    },
    0
  )
  if (quizProgress === props.questionsList.length) router.push('/results')
  else if (quizProgress < props.questionsList.length) router.push('/quiz')
}
</script>

<template>
  <div
    class="flex flex-col justify-self-center justify-center items-center border-stone-50 border-4 rounded-3xl p-6 md:p-12"
  >
    <header>
      <p
        id="general-instructions"
        class="font-primary font-semibold text-center text-md md:text-lg text-stone-50"
      >
        Answer the {{ questionsList.length }} question{{ questionsList.length > 1 ? 's' : '' }} by
        choosing from the provided choices. Question topics include: <br /><br />{{ topicsList }}.
      </p>
    </header>
    <nav
      class="bg-stone-600 hover:bg-amber-500 text-stone-50 hover:text-black flex flex-col rounded transition-all ease-in-out duration-150 text-center md:w-1/3 w-1/2 mt-20"
    >
      <RouterLink
        to="/quiz"
        class="font-primary font-extrabold text-lg uppercase md:text-xl items-stretch py-3"
        >Start</RouterLink
      >
    </nav>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
