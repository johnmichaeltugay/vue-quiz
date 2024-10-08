<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useQuizStore } from '@/stores/useQuizStore'

interface questionsRawData {
  question: string
  topics: string[]
  choices: string[]
}

interface ConditonalClassesReturn {
  [key: string]: boolean
}

const props = defineProps<{
  questionsList: questionsRawData[]
  answersList: string[]
  quizCache: string
}>()

const store = useQuizStore()
const currentQuestion = ref(0)
const currentSelection = ref('')

store.initializeScoreTracker(props.questionsList.length)
const writeCacheData = (data: (boolean | null)[], quizNumber: number) => {
  localStorage.setItem(
    props.quizCache,
    JSON.stringify({ itemProgress: quizNumber, quizProgress: data })
  )
}

const checkAnswer = () => {
  store.scoreTracker[currentQuestion.value] =
    currentSelection.value === props.answersList[currentQuestion.value]
  writeCacheData(store.scoreTracker, currentQuestion.value)
}
const nextQuestion = () => {
  currentQuestion.value += 1
  currentSelection.value = ''
}

const localStorageRecord = localStorage.getItem(props.quizCache)
if (localStorageRecord !== null) {
  const cachedData = JSON.parse(localStorageRecord)
  store.scoreTracker = cachedData.quizProgress
  currentQuestion.value =
    store.scoreTracker[cachedData.itemProgress] === null
      ? cachedData.itemProgress
      : cachedData.itemProgress + 1 === cachedData.quizProgress.length
        ? cachedData.itemProgress
        : cachedData.itemProgress + 1
} else {
  writeCacheData(store.scoreTracker, currentQuestion.value)
}

window.onbeforeunload = () => {
  if (store.scoreTracker.length > 0) {
    writeCacheData(store.scoreTracker, currentQuestion.value)
  }
}

const choicesClasses = (selectedChoice: number) => {
  const renderedChoice = props.questionsList[currentQuestion.value].choices[selectedChoice]
  const pickedChoice = currentSelection.value
  const correctChoice = props.answersList[currentQuestion.value]
  const questionAssessment = store.scoreTracker[currentQuestion.value]

  const isQuestionAnswered = questionAssessment !== null
  const isChoiceSelected = renderedChoice === pickedChoice
  const isChoiceTheCorrectAnswer = renderedChoice === correctChoice

  return {
    'text-stone-50': isQuestionAnswered || !isChoiceSelected,
    'bg-lime-600 border-lime-600':
      isQuestionAnswered && (questionAssessment || isChoiceTheCorrectAnswer),
    'bg-rose-600 borrder-rose-600': isQuestionAnswered && isChoiceSelected && !questionAssessment,
    'border-transparent': !isChoiceSelected && (!isChoiceTheCorrectAnswer || !isQuestionAnswered),
    'bg-stone-800': isQuestionAnswered && !isChoiceSelected && !isChoiceTheCorrectAnswer,
    'bg-stone-700 hover:bg-stone-500': !isQuestionAnswered && !isChoiceSelected,
    'bg-amber-600 border-amber-100 text-stone-900': !isQuestionAnswered && isChoiceSelected
  } as Record<string, boolean>
}
</script>

<template>
  <div class="select-none w-full">
    <div
      class="flex flex-col justify-center items-center border-amber-200 border-4 rounded-3xl p-6 md:p-12 mb-16"
    >
      <div id="question-box" class="flex items-start w-full mb-4">
        <div
          class="bg-amber-600 text-stone-50 font-primary font-medium text-2xl md:text-3xl md:min-w-18 min-w-12 md:min-h-18 min-h-12 rounded-full flex justify-center items-center"
        >
          {{ currentQuestion + 1 }}
        </div>
        <div class="flex flex-wrap items-center self-stretch">
          <div class="font-primary font-extrabold text-stone-50 text-xl md:text-2xl ml-4 flex">
            {{ props.questionsList[currentQuestion].question }}
          </div>
        </div>
      </div>

      <div
        id="choices-box"
        class="rounded-sm border-2 w-full px-3 my-1 flex transition-all ease-in-out duration-150"
        v-for="(choice, index) in props.questionsList[currentQuestion].choices"
        :class="choicesClasses(index)"
        :key="props.questionsList[currentQuestion].choices[index]"
      >
        <input
          type="radio"
          class="hidden"
          v-model="currentSelection"
          :name="'question' + currentQuestion"
          :id="props.questionsList[currentQuestion].choices[index]"
          :value="props.questionsList[currentQuestion].choices[index]"
          :disabled="store.scoreTracker[currentQuestion] !== null"
        />
        <label
          :for="props.questionsList[currentQuestion].choices[index]"
          class="font-primary text-lg md:text-xl flex w-full py-2 self-stretch"
          :class="[
            store.scoreTracker[currentQuestion] !== null &&
            props.questionsList[currentQuestion].choices[index] ===
              props.answersList[currentQuestion]
              ? 'font-bold'
              : 'font-light',
            store.scoreTracker[currentQuestion] === null ? 'hover:cursor-pointer' : ''
          ]"
          :disabled="store.scoreTracker[currentQuestion] !== null"
          >{{ props.questionsList[currentQuestion].choices[index] }}</label
        >
      </div>
      <div class="flex w-full mt-12 py-6 justify-center items-center relative">
        <Transition name="slide-up">
          <button
            type="submit"
            v-if="store.scoreTracker[currentQuestion] === null"
            class="absolute font-primary text-lg md:text-xl font-bold rounded-sm md:w-1/3 w-1/2 py-3 transition-all ease-in-out duration-150"
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
            v-else-if="
              store.getAnswered() !== props.questionsList.length &&
              store.scoreTracker[currentQuestion] !== null
            "
            class="absolute font-primary text-lg md:text-xl font-bold rounded-sm md:w-1/3 w-1/2 py-3 transition-all ease-in-out duration-150"
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
            v-else-if="store.getAnswered() === props.questionsList.length"
            class="absolute bg-stone-600 hover:bg-amber-500 text-stone-50 hover:text-black flex flex-col rounded-sm transition-all ease-in-out duration-150 text-center md:w-1/3 w-1/2"
            :class="store.getAnswered() === props.questionsList.length ? '' : 'hidden'"
          >
            <RouterLink
              to="/results"
              class="font-primary text-lg md:text-xl font-extrabold self-stretch py-3"
              @click="writeCacheData(store.scoreTracker, currentQuestion)"
              >Finish Quiz</RouterLink
            >
          </nav>
        </Transition>
      </div>
    </div>
    <div id="scoreTrackerNav" class="py-4 flex flex-nowrap w-full max-w-screen-md overflow-scroll">
      <div
        class="rounded-full text-stone-50 flex justify-center items-center md:min-w-12 min-w-10 md:min-h-12 min-h-10 mx-1"
        v-for="(tracker, index) in store.scoreTracker"
        :class="[
          store.scoreTracker[index] === null
            ? currentQuestion === index
              ? 'bg-amber-600'
              : 'bg-stone-600'
            : store.scoreTracker[index]
              ? 'bg-lime-600'
              : 'bg-rose-600',
          currentQuestion === index ? ' border-stone-50' : 'border-transparent'
        ]"
        :key="index"
      >
        <p class="font-primary font-bold text-base md:text-lg">{{ index + 1 }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.2s cubic-bezier(0, 1.2, 0.85, 1);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.slide-up-enter-to,
.slide-up-leave-from {
  opacity: 1;
  transform: translateY(0%);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
