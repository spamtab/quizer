<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import QuestionCard from '../components/QuestionCard.vue'
import ScoreCard from '../components/ScoreCard.vue'
import questionsData from '../data/questions.json'

const router = useRouter()

// Quiz state
const currentQuestionIndex = ref(0)
const score = ref(0)
const quizCompleted = ref(false)
const quizQuestions = ref([])

// Shuffle array helper
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Initialize quiz
const initializeQuiz = () => {
  // Load settings from localStorage
  const savedSettings = localStorage.getItem('quizSettings')
  let settings = {
    questionCount: 10,
    shuffleQuestions: true,
    selectedSubject: 'all',
    selectedTopic: 'all'
  }
  
  if (savedSettings) {
    settings = { ...settings, ...JSON.parse(savedSettings) }
  }
  
  // Filter questions based on settings
  let filteredQuestions = [...questionsData]
  
  if (settings.selectedSubject !== 'all') {
    filteredQuestions = filteredQuestions.filter(
      q => q.subject.name === settings.selectedSubject
    )
  }
  
  if (settings.selectedTopic !== 'all') {
    filteredQuestions = filteredQuestions.filter(
      q => q.subject.topic === settings.selectedTopic
    )
  }
  
  // Shuffle if enabled
  if (settings.shuffleQuestions) {
    filteredQuestions = shuffleArray(filteredQuestions)
  }
  
  // Limit to question count
  const questionLimit = Math.min(settings.questionCount, filteredQuestions.length)
  quizQuestions.value = filteredQuestions.slice(0, questionLimit)
  
  // Reset state
  currentQuestionIndex.value = 0
  score.value = 0
  quizCompleted.value = false
}

// Current question
const currentQuestion = computed(() => {
  return quizQuestions.value[currentQuestionIndex.value]
})

// Progress
const progress = computed(() => {
  return ((currentQuestionIndex.value / quizQuestions.value.length) * 100).toFixed(0)
})

// Handle answer
const handleAnswer = (isCorrect) => {
  if (isCorrect) {
    score.value++
  }
  
  // Move to next question or complete quiz
  if (currentQuestionIndex.value < quizQuestions.value.length - 1) {
    setTimeout(() => {
      currentQuestionIndex.value++
    }, 300)
  } else {
    setTimeout(() => {
      quizCompleted.value = true
    }, 300)
  }
}

// Retry quiz
const retryQuiz = () => {
  initializeQuiz()
}

// Go to home
const goHome = () => {
  router.push('/')
}

// Initialize on mount
onMounted(() => {
  initializeQuiz()
})
</script>

<template>
  <div class="page">
    <div class="nav-header">
      <div class="nav-title">Quiz App</div>
    </div>
    
    <div class="container">
      <!-- Progress Bar -->
      <div v-if="!quizCompleted" class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
      
      <!-- Question Card -->
      <QuestionCard
        v-if="!quizCompleted && currentQuestion"
        :question="currentQuestion"
        :question-number="currentQuestionIndex + 1"
        :total-questions="quizQuestions.length"
        @answer="handleAnswer"
      />
      
      <!-- Score Card -->
      <ScoreCard
        v-if="quizCompleted"
        :score="score"
        :total-questions="quizQuestions.length"
        @retry="retryQuiz"
        @home="goHome"
      />
      
      <!-- No questions available -->
      <div v-if="!quizCompleted && !currentQuestion" class="card text-center">
        <h2>No Questions Available</h2>
        <p class="mb-3">Please adjust your settings and try again.</p>
        <button @click="goHome" class="btn btn-primary">Go Home</button>
      </div>
    </div>
  </div>
</template>
