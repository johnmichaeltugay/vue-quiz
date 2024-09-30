import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useQuizStore = defineStore('quiz', () => {
  const scoreTracker = ref<(boolean | null)[]>([])
  function initializeScoreTracker(questionCount: number) {
    if (scoreTracker.value.length === 0)
      for (let item = 0; item < questionCount; item++) scoreTracker.value.push(null)
  }
  function resetScoreTracker() {
    scoreTracker.value = []
  }
  function getAnswered() {
    return scoreTracker.value.reduce((acc, quizItem) => {
      if (quizItem !== null) acc += 1
      return acc
    }, 0)
  }
  function getScore() {
    const score = scoreTracker.value.reduce((acc, quizItem) => {
      if (quizItem) acc += 1
      return acc
    }, 0)
    return score + '/' + scoreTracker.value.length
  }
  function getScorePercentage() {
    const score = scoreTracker.value.reduce((acc, quizItem) => {
      if (quizItem) acc += 1
      return acc
    }, 0)
    return Math.round((score / scoreTracker.value.length) * 100) + '%'
  }

  return {
    scoreTracker,
    initializeScoreTracker,
    resetScoreTracker,
    getAnswered,
    getScore,
    getScorePercentage
  }
})
