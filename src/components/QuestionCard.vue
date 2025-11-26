<script setup>
import { ref, watch } from 'vue'

/**
 * @typedef {Object} Question
 * @property {number} id
 * @property {string} question
 * @property {string[]} options
 * @property {number} correctOption
 * @property {Object} subject
 * @property {string} subject.name
 * @property {string} subject.topic
 */

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  questionNumber: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['answer'])

const selectedOption = ref(null)
const isAnswered = ref(false)

// Reset state when question changes
watch(() => props.question.id, () => {
  selectedOption.value = null
  isAnswered.value = false
})

const selectOption = (optionIndex) => {
  if (isAnswered.value) return
  
  selectedOption.value = optionIndex
  isAnswered.value = true
  
  const isCorrect = optionIndex === props.question.correctOption
  
  // Emit answer with delay to show feedback
  setTimeout(() => {
    emit('answer', isCorrect)
  }, 1000)
}

const getOptionClass = (optionIndex) => {
  if (!isAnswered.value) {
    return selectedOption.value === optionIndex ? 'selected' : ''
  }
  
  if (optionIndex === props.question.correctOption) {
    return 'correct'
  }
  
  if (optionIndex === selectedOption.value && optionIndex !== props.question.correctOption) {
    return 'incorrect'
  }
  
  return ''
}
</script>

<template>
  <div class="card fade-in">
    <div class="question-number">
      Question {{ questionNumber }} of {{ totalQuestions }}
    </div>
    
    <div class="question-text">
      {{ question.question }}
    </div>
    
    <ul class="options-list">
      <li
        v-for="(option, index) in question.options"
        :key="index"
        class="option-item"
        :class="getOptionClass(index + 1)"
        @click="selectOption(index + 1)"
      >
        <strong>{{ String.fromCharCode(65 + index) }}.</strong> {{ option }}
      </li>
    </ul>
  </div>
</template>
