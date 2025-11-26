<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startQuiz = () => {
  router.push('/quiz')
}

const goToSettings = () => {
  router.push('/settings')
}
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="card text-center">
        <div class="card-header">
          <h1>🎯 Quiz App</h1>
          <p>Test your knowledge with interactive quizzes</p>
        </div>
        
        <div class="btn-group">
          <button @click="startQuiz" class="btn btn-primary btn-large">
            Start Quiz
          </button>
          <button @click="goToSettings" class="btn btn-secondary btn-large">
            Settings
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
