<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['retry', 'home'])

const percentage = computed(() => {
  return Math.round((props.score / props.totalQuestions) * 100)
})

const message = computed(() => {
  const pct = percentage.value
  if (pct === 100) return '🎉 Perfect Score! Outstanding!'
  if (pct >= 80) return '🌟 Excellent Work!'
  if (pct >= 60) return '👍 Good Job!'
  if (pct >= 40) return '💪 Keep Practicing!'
  return '📚 Don\'t Give Up!'
})

const retryQuiz = () => {
  emit('retry')
}

const goHome = () => {
  emit('home')
}
</script>

<template>
  <div class="card fade-in">
    <div class="score-display">
      <h2>🎯 Quiz Complete!</h2>
      
      <div class="score-number">
        {{ score }}/{{ totalQuestions }}
      </div>
      
      <div class="score-message">
        {{ percentage }}% - {{ message }}
      </div>
      
      <div class="btn-group">
        <button @click="retryQuiz" class="btn btn-success btn-large">
          🔄 Retry
        </button>
        <button @click="goHome" class="btn btn-secondary btn-large">
          🏠 Go Home
        </button>
      </div>
    </div>
  </div>
</template>
