<script setup lang="ts">
const props = defineProps<{
  questionsList: object
  choicesList: object
  answersList: object
}>()
</script>

<template>
  <div>quiz section</div>
  <div>{{ props.questionsList }}</div>
  <br /><br />
  <div>{{ props.choicesList }}</div>
  <br /><br />
  <div>{{ props.answersList }}</div>
</template>
