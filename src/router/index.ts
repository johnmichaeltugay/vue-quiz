import { createRouter, createWebHistory } from 'vue-router'
import questionsData from '../data/questionsRoster.json'
import answersData from '../data/answersRoster.json'

const questions = questionsData.questions
const choices = questionsData.choices
const answers = answersData.answers

const countCheck =
  questions.length > choices.length
    ? 'choices'
    : questions.length < choices.length || questions.length < answers.length
      ? 'questions'
      : questions.length > answers.length
        ? 'answers'
        : 'clear'
countCheck !== 'clear' ? console.log('missing ' + countCheck + ' found') : ''

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./../views/StartQuizView.vue'),
      props: { questionsList: questions }
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: () => import('./../views/MainQuizView.vue'),
      props: { questionsList: questions, choicesList: choices, answersList: answers }
    }
  ]
})

export default router
