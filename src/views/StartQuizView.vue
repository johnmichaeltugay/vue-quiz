<script setup lang="ts">
const props = defineProps<{
  questionsList: object
}>()
const topicsRoster = props.questionsList.reduce((acc, item) => {
  for (const topic of item.topics) {
    if (!acc.includes(topic)) acc.push(topic)
  }
  return acc
}, [])
const lastItem = topicsRoster.pop()
const topicsList = [topicsRoster.join(', '), lastItem].join(', and ')
</script>

<template>
  <header>
    <!-- <div class="wrapper">
            <HelloWorld msg="You did it!" />
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </nav>
        </div> -->
    <p class="text-5xl text-center noto-sans-100 py-8">(Mini) Trivia Quiz</p>
    <p id="general-instructions" class="text-center">
      Answer the 10 questions by choosing from the provided choices. Question topics include:
      {{ topicsList }}.
    </p>
  </header>
  <nav class="bg-slate-600 hover:bg-amber-600 text-center w-1/3 mt-20">
    <RouterLink to="/quiz" class="noto-sans-800 text-xl w-full">Start</RouterLink>
  </nav>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  /* background-color: #ff8800; */
}

p {
  color: #dddddd;
}
</style>
