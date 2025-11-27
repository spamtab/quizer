// Auto-index all question JSON files and provide helpers

// Eagerly import all JSON files under questions/
const modules = import.meta.glob('./questions/*.json', { eager: true })

// Flatten all questions and build quick indices
const allQuestions = []
for (const path in modules) {
  const mod = modules[path]
  const arr = (mod && mod.default) || []
  if (Array.isArray(arr)) {
    allQuestions.push(...arr)
  }
}

// Build subject -> Set(topics) map from question content
const map = new Map()
for (const q of allQuestions) {
  const subj = q?.subject?.name || 'General'
  const topic = q?.subject?.topic || 'General'
  if (!map.has(subj)) map.set(subj, new Set())
  map.get(subj).add(topic)
}

export function getSubjectTopicMap() {
  // Return plain object: { subject: [topics...] }
  const obj = {}
  for (const [subject, topicSet] of map.entries()) {
    obj[subject] = Array.from(topicSet).sort()
  }
  return obj
}

export function getQuestionsForSelection({ selectedSubject = 'all', selectedTopic = 'all' } = {}) {
  if (selectedSubject === 'all') return [...allQuestions]
  if (selectedTopic === 'all') {
    return allQuestions.filter(q => q?.subject?.name === selectedSubject)
  }
  return allQuestions.filter(q => q?.subject?.name === selectedSubject && q?.subject?.topic === selectedTopic)
}

export function getAllQuestions() {
  return [...allQuestions]
}
