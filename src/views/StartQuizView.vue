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
  <div
    class="flex flex-col justify-center items-center border-white border-4 rounded-md p-6 md:p-12"
  >
    <header>
      <!-- <div class="wrapper">
            <HelloWorld msg="You did it!" />
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </nav>
        </div> -->

      <p id="general-instructions" class="font-primary font-semibold text-center">
        Answer the {{ questionsList.length }} question{{ questionsList.length > 1 ? 's' : '' }} by
        choosing from the provided choices. Question topics include: {{ topicsList }}.
      </p>
    </header>
    <nav
      class="bg-stone-600 hover:bg-amber-500 hover:text-black flex flex-col rounded transition-all ease-in-out duration-150 text-center md:w-1/3 w-1/2 py-2 mt-20"
    >
      <RouterLink to="/quiz" class="font-primary font-extrabold text-xl items-stretch"
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
  /* background-color: #ff8800; */
}

p {
  color: #dddddd;
}
</style>
