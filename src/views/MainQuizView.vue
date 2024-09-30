<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useQuizStore } from '@/stores/useQuizStore'

const props = defineProps<{
  questionsList: object
  choicesList: object
  answersList: object
  quizCache: string
}>()

const store = useQuizStore()
const currentQuestion = ref(0)
const currentSelection = ref('')

store.initializeScoreTracker(props.questionsList.length)
const checkAnswer = () => {
  store.scoreTracker[currentQuestion.value] =
    currentSelection.value === props.answersList[currentQuestion.value]
  writeCacheData(store.scoreTracker, currentQuestion.value)
}
const nextQuestion = () => {
  currentQuestion.value += 1
  currentSelection.value = ''
}
const writeCacheData = (data, quizNumber) => {
  localStorage.setItem(props.quizCache, JSON.stringify({ quizNumber: quizNumber, data: data }))
}
const localStorageRecord = localStorage.getItem(props.quizCache)
if (localStorageRecord !== null) {
  const cachedData = JSON.parse(localStorageRecord)
  store.scoreTracker = cachedData.data
  currentQuestion.value =
    store.scoreTracker[cachedData.quizNumber] === null
      ? cachedData.quizNumber
      : cachedData.quizNumber + 1 === cachedData.data.length
        ? cachedData.quizNumber
        : cachedData.quizNumber + 1
} else {
  writeCacheData(store.scoreTracker, currentQuestion.value)
}
</script>

<template>
  <div
    class="flex flex-col justify-center items-center border-amber-200 border-4 rounded-3xl p-6 md:p-12 mb-16"
  >
    <div id="question-box" class="flex items-start w-full mb-4">
      <div
        class="bg-amber-600 font-primary font-medium text-2xl md:min-w-18 min-w-12 md:min-h-18 min-h-12 rounded-full flex justify-center items-center"
      >
        {{ currentQuestion + 1 }}
      </div>
      <div class="flex flex-wrap items-center self-stretch">
        <div class="font-primary font-extrabold text-xl ml-4 flex">
          {{ props.questionsList[currentQuestion].question }}
        </div>
      </div>
    </div>

    <div
      id="choices-box"
      class="rounded-sm border-2 w-full px-3 my-1 flex transition-all ease-in-out duration-150"
      v-for="(choice, index) in props.choicesList[currentQuestion]"
      :class="
        store.scoreTracker[currentQuestion] !== null
          ? props.choicesList[currentQuestion][index] === currentSelection
            ? store.scoreTracker[currentQuestion]
              ? 'bg-lime-600 border-lime-600 text-stone-50'
              : 'bg-rose-600 border-rose-600 text-stone-50'
            : props.choicesList[currentQuestion][index] === props.answersList[currentQuestion]
              ? 'bg-lime-600 border-lime-600 text-stone-50'
              : 'bg-stone-700 border-transparent text-stone-50'
          : props.choicesList[currentQuestion][index] === currentSelection
            ? 'bg-amber-600 border-amber-100 text-stone-900'
            : 'bg-stone-700 hover:bg-stone-500 border-transparent text-stone-50'
      "
      :key="props.choicesList[currentQuestion][choice]"
    >
      <input
        type="radio"
        class="hidden"
        v-model="currentSelection"
        :name="'question' + currentQuestion"
        :id="props.choicesList[currentQuestion][index]"
        :value="props.choicesList[currentQuestion][index]"
        :disabled="store.scoreTracker[currentQuestion] !== null"
      />
      <label
        :for="props.choicesList[currentQuestion][index]"
        class="font-primary font-light flex w-full py-2 self-stretch"
        :disabled="store.scoreTracker[currentQuestion] !== null"
        >{{ props.choicesList[currentQuestion][index] }}</label
      >
    </div>

    <button
      type="submit"
      class="font-primary font-bold rounded-sm md:w-1/3 w-1/2 mt-12 py-3 transition-all ease-in-out duration-150"
      :class="
        store.scoreTracker[currentQuestion] !== null
          ? 'hidden'
          : currentSelection === ''
            ? 'bg-stone-800 text-stone-600'
            : 'bg-stone-600 text-stone-50 hover:bg-amber-600 hover:text-stone-900'
      "
      :disabled="currentSelection === ''"
      @click="checkAnswer"
    >
      SUBMIT
    </button>
    <button
      class="font-primary font-bold rounded-sm md:w-1/3 w-1/2 mt-12 py-3 transition-all ease-in-out duration-150"
      :class="
        store.getAnswered() === props.questionsList.length ||
        store.scoreTracker[currentQuestion] === null
          ? 'hidden'
          : 'bg-stone-600 text-stone-50 hover:bg-amber-600 hover:text-stone-900'
      "
      :disabled="store.scoreTracker[currentQuestion] === null"
      @click="nextQuestion"
    >
      NEXT
    </button>
    <nav
      class="bg-stone-600 hover:bg-amber-500 hover:text-black flex flex-col rounded-sm transition-all ease-in-out duration-150 text-center md:w-1/3 w-1/2 py-3 mt-12"
      :class="store.getAnswered() === props.questionsList.length ? '' : 'hidden'"
    >
      <RouterLink to="/results" class="font-primary font-extrabold items-stretch"
        >Finish Quiz</RouterLink
      >
    </nav>
  </div>
  <div
    id="scoreTrackerNav"
    class="py-4 fixed bottom-0 flex flex-nowrap w-[70vw] max-w-screen-md overflow-scroll"
  >
    <div
      class="rounded-full text-stone-50 flex justify-center items-center md:min-w-10 min-w-8 md:min-h-10 min-h-8 mx-1"
      v-for="(tracker, index) in store.scoreTracker"
      :class="
        store.scoreTracker[index] === null
          ? 'bg-stone-600'
          : store.scoreTracker[index]
            ? 'bg-lime-600'
            : 'bg-rose-600'
      "
      :key="index"
    >
      <p class="font-primary font-bold text-base">{{ index + 1 }}</p>
    </div>
  </div>
</template>
