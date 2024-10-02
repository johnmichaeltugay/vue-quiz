import { createRouter, createWebHistory } from 'vue-router'
import questionsData from '@/data/questionsRoster.json'
import answersData from '@/data/answersRoster.json'

const questions = questionsData.questions
const answers = answersData.answers
const localStorageID = 'RuKIrzAQcTe'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/StartQuizView.vue'),
      props: { questionsList: questions, quizCache: localStorageID },
      meta: { transition: 'slide-right' }
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('@/views/MainQuizView.vue'),
      props: {
        questionsList: questions,
        answersList: answers,
        quizCache: localStorageID
      },
      meta: { transition: 'slide-right' }
    },
    {
      path: '/results',
      name: 'results',
      component: () => import('@/views/ResultsView.vue'),
      props: { questionsList: questions, quizCache: localStorageID },
      meta: { transition: 'slide-right' }
    }
  ]
})

export default router
