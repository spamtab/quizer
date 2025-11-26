<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import questionsData from '../data/questions.json'

const router = useRouter()

// Settings state
const questionCount = ref(10)
const shuffleQuestions = ref(true)
const selectedSubject = ref('all')
const selectedTopic = ref('all')

// Extract unique subjects and topics from questions
const subjects = computed(() => {
  const uniqueSubjects = [...new Set(questionsData.map(q => q.subject.name))]
  return ['all', ...uniqueSubjects]
})

const topics = computed(() => {
  if (selectedSubject.value === 'all') {
    const uniqueTopics = [...new Set(questionsData.map(q => q.subject.topic))]
    return ['all', ...uniqueTopics]
  }
  const filteredTopics = questionsData
    .filter(q => q.subject.name === selectedSubject.value)
    .map(q => q.subject.topic)
  const uniqueTopics = [...new Set(filteredTopics)]
  return ['all', ...uniqueTopics]
})

// Load settings from localStorage on mount
onMounted(() => {
  const savedSettings = localStorage.getItem('quizSettings')
  if (savedSettings) {
    const settings = JSON.parse(savedSettings)
    questionCount.value = settings.questionCount || 10
    shuffleQuestions.value = settings.shuffleQuestions !== false
    selectedSubject.value = settings.selectedSubject || 'all'
    selectedTopic.value = settings.selectedTopic || 'all'
  }
})

// Save settings
const saveSettings = () => {
  const settings = {
    questionCount: questionCount.value,
    shuffleQuestions: shuffleQuestions.value,
    selectedSubject: selectedSubject.value,
    selectedTopic: selectedTopic.value
  }
  localStorage.setItem('quizSettings', JSON.stringify(settings))
  router.push('/')
}

// Reset to home without saving
const goBack = () => {
  router.push('/')
}

// When subject changes, reset topic to 'all'
const onSubjectChange = () => {
  selectedTopic.value = 'all'
}
</script>

<template>
  <div class="page">
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h2>⚙️ Quiz Settings</h2>
          <p>Customize your quiz experience</p>
        </div>

        <div class="form-group">
          <label class="form-label" for="questionCount">
            Number of Questions (max {{ questionsData.length }})
          </label>
          <input
            id="questionCount"
            v-model.number="questionCount"
            type="number"
            class="form-control"
            :min="1"
            :max="questionsData.length"
          />
        </div>

        <div class="form-group">
          <label class="form-label" for="subject">Subject</label>
          <select
            id="subject"
            v-model="selectedSubject"
            class="form-control"
            @change="onSubjectChange"
          >
            <option v-for="subject in subjects" :key="subject" :value="subject">
              {{ subject === 'all' ? 'All Subjects' : subject }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label" for="topic">Topic</label>
          <select
            id="topic"
            v-model="selectedTopic"
            class="form-control"
          >
            <option v-for="topic in topics" :key="topic" :value="topic">
              {{ topic === 'all' ? 'All Topics' : topic }}
            </option>
          </select>
        </div>

        <div class="checkbox-group">
          <input
            id="shuffle"
            v-model="shuffleQuestions"
            type="checkbox"
          />
          <label for="shuffle" class="form-label" style="margin-bottom: 0;">
            Shuffle questions
          </label>
        </div>

        <div class="btn-group mt-3">
          <button @click="saveSettings" class="btn btn-primary btn-block">
            Save Settings
          </button>
          <button @click="goBack" class="btn btn-secondary btn-block">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
