<template>
  <div class="admin-panel">
    <div class="admin-header">
      <h2 class="admin-title">🔧 Administration</h2>
      <div class="header-actions">
        <button @click="emit('close')" class="btn btn-secondary btn-small">
          🏠 Accueil
        </button>
        <button @click="emit('logout')" class="btn btn-danger btn-small">
          🚪 Déconnexion
        </button>
      </div>
    </div>

    <div class="tabs-container">
      <button
        @click="activeTab = 'themes'"
        :class="{ active: activeTab === 'themes' }"
        class="tab-btn"
      >
        📁 Thèmes
      </button>
      <button
        @click="activeTab = 'questions'"
        :class="{ active: activeTab === 'questions' }"
        class="tab-btn"
      >
        ❓ Questions
      </button>
    </div>

    <!-- ONGLET THÈMES -->
    <div v-if="activeTab === 'themes'" class="tab-content">
      <div class="section">
        <h3 class="section-title">
          {{ editingTheme ? '✏️ Modifier le thème' : '➕ Ajouter un thème' }}
        </h3>
        <div class="form-row">
          <div class="form-group flex-1">
            <label>Nom du thème</label>
            <input v-model="themeForm.name" placeholder="Ex: Géographie" />
          </div>
          <div class="form-group" style="width: 120px;">
            <label>Icône</label>
            <input v-model="themeForm.icon" placeholder="🌍" />
          </div>
        </div>
        <div class="form-actions">
          <button v-if="editingTheme" @click="cancelEditTheme" class="btn btn-secondary">
            Annuler
          </button>
          <button @click="submitTheme" class="btn btn-primary">
            {{ editingTheme ? '💾 Sauvegarder' : '➕ Ajouter' }}
          </button>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">📋 Thèmes existants ({{ themes.length }})</h3>
        <div v-if="themes.length === 0" class="empty-state">
          Aucun thème créé. Ajoutez-en un ci-dessus !
        </div>
        <div v-for="theme in themes" :key="theme.id" class="list-item">
          <div class="list-item-content">
            <span class="list-icon">{{ theme.icon }}</span>
            <div class="list-details">
              <strong class="list-name">{{ theme.name }}</strong>
              <span class="list-info">{{ theme.questions.length }} questions</span>
            </div>
          </div>
          <div class="list-actions">
            <button @click="editTheme(theme)" class="btn btn-warning btn-icon">✏️</button>
            <button @click="confirmDeleteTheme(theme.id)" class="btn btn-danger btn-icon">🗑️</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ONGLET QUESTIONS -->
    <div v-if="activeTab === 'questions'" class="tab-content">
      <div class="section">
        <h3 class="section-title">
          {{ editingQuestion ? '✏️ Modifier la question' : '➕ Ajouter une question' }}
        </h3>

        <div class="form-group">
          <label>Thème</label>
          <select v-model="questionForm.themeId" :disabled="editingQuestion !== null">
            <option value="">-- Sélectionner un thème --</option>
            <option v-for="theme in themes" :key="theme.id" :value="theme.id">
              {{ theme.icon }} {{ theme.name }}
            </option>
          </select>
        </div>

        <div class="form-group">
          <label>Question</label>
          <textarea
            v-model="questionForm.question"
            rows="2"
            placeholder="Votre question..."
          ></textarea>
        </div>

        <div class="form-group">
          <label>Réponses (cochez la bonne réponse)</label>
          <div v-for="(answer, index) in questionForm.answers" :key="index" class="answer-row">
            <input
              type="radio"
              :value="index"
              v-model="questionForm.correct"
              :id="'answer-' + index"
            />
            <input
              v-model="questionForm.answers[index]"
              type="text"
              :placeholder="'Réponse ' + (index + 1)"
              class="answer-input"
            />
            <button
              v-if="questionForm.answers.length > 2"
              @click="removeAnswer(index)"
              class="btn btn-danger btn-icon btn-small"
            >
              ✕
            </button>
          </div>
          <button
            v-if="questionForm.answers.length < 6"
            @click="addAnswer"
            class="btn btn-secondary btn-small"
          >
            + Ajouter une réponse
          </button>
        </div>

        <div class="form-row">
          <div class="form-group" style="width: 150px;">
            <label>Temps (secondes)</label>
            <input v-model.number="questionForm.time" type="number" min="5" max="60" />
          </div>
        </div>

        <div class="form-actions">
          <button v-if="editingQuestion" @click="cancelEditQuestion" class="btn btn-secondary">
            Annuler
          </button>
          <button @click="submitQuestion" class="btn btn-primary">
            {{ editingQuestion ? '💾 Sauvegarder' : '➕ Ajouter' }}
          </button>
        </div>
      </div>

      <div class="section">
        <h3 class="section-title">📋 Questions par thème</h3>

        <div v-if="themes.length === 0" class="empty-state">
          Créez d'abord un thème pour ajouter des questions.
        </div>

        <div v-for="theme in themes" :key="theme.id" class="theme-block">
          <div class="theme-header" @click="toggleTheme(theme.id)">
            <span>{{ theme.icon }} {{ theme.name }}</span>
            <span class="badge">{{ theme.questions.length }}</span>
            <span class="chevron" :class="{ open: expandedThemes.includes(theme.id) }">▼</span>
          </div>

          <div v-if="expandedThemes.includes(theme.id)" class="theme-questions">
            <div v-if="theme.questions.length === 0" class="empty-state small">
              Aucune question dans ce thème
            </div>
            <div v-for="(q, qIndex) in theme.questions" :key="qIndex" class="question-item">
              <div class="question-content">
                <div class="question-text">{{ qIndex + 1 }}. {{ q.question }}</div>
                <div class="question-answers">
                  <span
                    v-for="(a, aIndex) in q.answers"
                    :key="aIndex"
                    :class="['answer-chip', { correct: aIndex === q.correct }]"
                  >
                    {{ a }}
                  </span>
                </div>
                <div class="question-meta">⏱️ {{ q.time }}s</div>
              </div>
              <div class="question-actions">
                <button
                  @click="editQuestion(theme.id, qIndex, q)"
                  class="btn btn-warning btn-icon btn-small"
                >
                  ✏️
                </button>
                <button
                  @click="confirmDeleteQuestion(theme.id, qIndex)"
                  class="btn btn-danger btn-icon btn-small"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MODAL DE CONFIRMATION -->
    <div v-if="showConfirmModal" class="modal-overlay" @click.self="showConfirmModal = false">
      <div class="confirm-modal">
        <h3>{{ confirmModal.title }}</h3>
        <p>{{ confirmModal.message }}</p>
        <div class="modal-actions">
          <button @click="showConfirmModal = false" class="btn btn-secondary">Annuler</button>
          <button @click="confirmModal.action" class="btn btn-danger">Confirmer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  themes: { type: Array, required: true }
})

const emit = defineEmits([
  'add-theme',
  'update-theme',
  'delete-theme',
  'add-question',
  'update-question',
  'delete-question',
  'logout',
  'close'
])

const activeTab = ref('themes')
const expandedThemes = ref([])
const showConfirmModal = ref(false)
const confirmModal = reactive({ title: '', message: '', action: null })

// === THÈME ===
const editingTheme = ref(null)
const themeForm = reactive({ name: '', icon: '' })

const submitTheme = () => {
  if (!themeForm.name || !themeForm.icon) {
    alert('⚠️ Veuillez remplir tous les champs')
    return
  }
  if (editingTheme.value) {
    emit('update-theme', editingTheme.value, { ...themeForm })
    editingTheme.value = null
  } else {
    emit('add-theme', { ...themeForm })
  }
  themeForm.name = ''
  themeForm.icon = ''
}

const editTheme = (theme) => {
  editingTheme.value = theme.id
  themeForm.name = theme.name
  themeForm.icon = theme.icon
}

const cancelEditTheme = () => {
  editingTheme.value = null
  themeForm.name = ''
  themeForm.icon = ''
}

const confirmDeleteTheme = (id) => {
  const theme = props.themes.find(t => t.id === id)
  confirmModal.title = '🗑️ Supprimer le thème'
  confirmModal.message = `Voulez-vous vraiment supprimer "${theme?.name}" et toutes ses questions ?`
  confirmModal.action = () => {
    emit('delete-theme', id)
    showConfirmModal.value = false
  }
  showConfirmModal.value = true
}

// === QUESTION ===
const editingQuestion = ref(null)
const questionForm = reactive({
  themeId: '',
  question: '',
  answers: ['', '', '', ''],
  correct: 0,
  time: 15
})

const submitQuestion = () => {
  if (!questionForm.themeId || !questionForm.question || questionForm.answers.some(a => !a.trim())) {
    alert('⚠️ Veuillez remplir tous les champs')
    return
  }
  const data = {
    themeId: questionForm.themeId,
    question: questionForm.question,
    answers: [...questionForm.answers],
    correct: questionForm.correct,
    time: questionForm.time
  }
  if (editingQuestion.value) {
    emit('update-question', editingQuestion.value.themeId, editingQuestion.value.index, data)
    editingQuestion.value = null
  } else {
    emit('add-question', data)
  }
  resetQuestionForm()
}

const editQuestion = (themeId, index, q) => {
  editingQuestion.value = { themeId, index }
  questionForm.themeId = themeId
  questionForm.question = q.question
  questionForm.answers = [...q.answers]
  questionForm.correct = q.correct
  questionForm.time = q.time
}

const cancelEditQuestion = () => {
  editingQuestion.value = null
  resetQuestionForm()
}

const resetQuestionForm = () => {
  questionForm.question = ''
  questionForm.answers = ['', '', '', '']
  questionForm.correct = 0
  questionForm.time = 15
}

const confirmDeleteQuestion = (themeId, index) => {
  confirmModal.title = '🗑️ Supprimer la question'
  confirmModal.message = 'Voulez-vous vraiment supprimer cette question ?'
  confirmModal.action = () => {
    emit('delete-question', themeId, index)
    showConfirmModal.value = false
  }
  showConfirmModal.value = true
}

const addAnswer = () => {
  if (questionForm.answers.length < 6) {
    questionForm.answers.push('')
  }
}

const removeAnswer = (index) => {
  questionForm.answers.splice(index, 1)
  if (questionForm.correct >= questionForm.answers.length) {
    questionForm.correct = 0
  }
}

const toggleTheme = (id) => {
  const idx = expandedThemes.value.indexOf(id)
  if (idx === -1) {
    expandedThemes.value.push(id)
  } else {
    expandedThemes.value.splice(idx, 1)
  }
}
</script>

<style scoped>
.admin-panel {
  background: white;
  border-radius: 25px;
  padding: 30px;
  margin: 20px auto;
  max-width: 1100px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 3px solid #e5e7eb;
}

.admin-title {
  font-size: 2em;
  font-weight: 900;
  color: #1e3a8a;
}

.header-actions {
  display: flex;
  gap: 10px;
}

.tabs-container {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.tab-btn {
  padding: 12px 25px;
  background: #f3f4f6;
  border: none;
  border-radius: 12px;
  font-size: 1em;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  color: #64748b;
}

.tab-btn.active {
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  color: white;
  box-shadow: 0 5px 20px rgba(30, 58, 138, 0.4);
}

.section {
  background: #f8fafc;
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 25px;
}

.section-title {
  color: #1e3a8a;
  font-size: 1.3em;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 700;
  color: #1e3a8a;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid rgba(30, 58, 138, 0.2);
  border-radius: 10px;
  font-size: 1em;
  font-family: inherit;
  transition: all 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #fbbf24;
  box-shadow: 0 0 15px rgba(251, 191, 36, 0.3);
}

.form-row {
  display: flex;
  gap: 15px;
}

.flex-1 {
  flex: 1;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 10px;
  font-size: 1em;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary {
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4);
}

.btn-secondary {
  background: #e5e7eb;
  color: #64748b;
}

.btn-secondary:hover {
  background: #d1d5db;
}

.btn-warning {
  background: #fbbf24;
  color: #1e3a8a;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.btn-small {
  padding: 8px 16px;
  font-size: 0.9em;
}

.btn-icon {
  padding: 8px 12px;
  min-width: auto;
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 12px;
  margin-bottom: 10px;
  border: 2px solid transparent;
  transition: all 0.3s;
}

.list-item:hover {
  border-color: #fbbf24;
  transform: translateX(5px);
}

.list-item-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.list-icon {
  font-size: 2em;
}

.list-details {
  display: flex;
  flex-direction: column;
}

.list-name {
  color: #1e3a8a;
  font-size: 1.1em;
}

.list-info {
  color: #64748b;
  font-size: 0.9em;
}

.list-actions {
  display: flex;
  gap: 8px;
}

.answer-row {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 10px;
}

.answer-row input[type="radio"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.answer-input {
  flex: 1;
}

.theme-block {
  background: white;
  border-radius: 12px;
  margin-bottom: 15px;
  overflow: hidden;
  border: 2px solid #e5e7eb;
}

.theme-header {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  background: linear-gradient(135deg, #f8fafc, #f1f5f9);
  cursor: pointer;
  font-weight: 700;
  color: #1e3a8a;
  transition: all 0.3s;
}

.theme-header:hover {
  background: linear-gradient(135deg, #e0e7ff, #dbeafe);
}

.badge {
  background: #1e3a8a;
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.85em;
}

.chevron {
  margin-left: auto;
  transition: transform 0.3s;
}

.chevron.open {
  transform: rotate(180deg);
}

.theme-questions {
  padding: 15px;
  background: #fafafa;
}

.question-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px;
  background: white;
  border-radius: 10px;
  margin-bottom: 10px;
  border-left: 4px solid #1e3a8a;
}

.question-content {
  flex: 1;
}

.question-text {
  font-weight: 600;
  color: #1e3a8a;
  margin-bottom: 10px;
}

.question-answers {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 8px;
}

.answer-chip {
  padding: 4px 12px;
  background: #e5e7eb;
  border-radius: 20px;
  font-size: 0.85em;
  color: #64748b;
}

.answer-chip.correct {
  background: #10b981;
  color: white;
}

.question-meta {
  font-size: 0.85em;
  color: #94a3b8;
}

.question-actions {
  display: flex;
  gap: 5px;
}

.empty-state {
  text-align: center;
  padding: 30px;
  color: #94a3b8;
  font-style: italic;
}

.empty-state.small {
  padding: 15px;
}

/* MODAL */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.confirm-modal {
  background: white;
  padding: 30px;
  border-radius: 20px;
  max-width: 400px;
  text-align: center;
}

.confirm-modal h3 {
  color: #1e3a8a;
  margin-bottom: 15px;
}

.confirm-modal p {
  color: #64748b;
  margin-bottom: 25px;
}

.modal-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .admin-panel {
    padding: 20px;
    margin: 10px;
  }

  .admin-header {
    flex-direction: column;
    gap: 15px;
  }

  .form-row {
    flex-direction: column;
  }

  .list-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .list-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
