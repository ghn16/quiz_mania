<template>
  <div class="admin-panel">
    <div class="admin-header">
      <h2 class="admin-title">🔧 Administration</h2>
      <button @click="$emit('close')" class="btn btn-danger btn-small">
        Fermer
      </button>
    </div>

    <div class="tabs-container">
      <button
        @click="activeTab = 'themes'"
        :class="{active: activeTab === 'themes'}"
        class="tab-btn">
        📁 Thèmes
      </button>
      <button
        @click="activeTab = 'questions'"
        :class="{active: activeTab === 'questions'}"
        class="tab-btn">
        ❓ Questions
      </button>
    </div>

    <!-- Gestion des Thèmes -->
    <div v-if="activeTab === 'themes'">
      <h3 class="section-title">Ajouter un thème</h3>
      <div class="form-group">
        <label>Nom du thème</label>
        <input v-model="newTheme.name" placeholder="Ex: Géographie" />
      </div>
      <div class="form-group">
        <label>Icône (emoji)</label>
        <input v-model="newTheme.icon" placeholder="Ex: 🌍" />
      </div>
      <button @click="handleAddTheme" class="btn btn-primary">
        ➕ Ajouter le thème
      </button>

      <h3 class="section-title" style="margin-top: 40px;">Thèmes existants</h3>
      <div v-for="theme in themes" :key="theme.id" class="list-item">
        <div class="list-item-content">
          <span class="list-icon">{{ theme.icon }}</span>
          <strong class="list-name">{{ theme.name }}</strong>
          <span class="list-info">({{ theme.questions.length }} questions)</span>
        </div>
        <button @click="handleDeleteTheme(theme.id)" class="btn btn-danger btn-small">
          🗑️ Supprimer
        </button>
      </div>
    </div>

    <!-- Gestion des Questions -->
    <div v-if="activeTab === 'questions'">
      <h3 class="section-title">Ajouter une question</h3>
      <div class="form-group">
        <label>Thème</label>
        <select v-model="newQuestion.themeId">
          <option v-for="theme in themes" :key="theme.id" :value="theme.id">
            {{ theme.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label>Question</label>
        <textarea v-model="newQuestion.question" rows="3" placeholder="Votre question..."></textarea>
      </div>
      <div class="form-group">
        <label>Réponses</label>
        <div v-for="(answer, index) in newQuestion.answers" :key="index" class="answer-row">
          <input
            v-model="newQuestion.answers[index]"
            type="text"
            :placeholder="'Réponse ' + (index + 1)" />
          <label class="radio-label">
            <input
              type="radio"
              :value="index"
              v-model.number="newQuestion.correct" />
            Correcte
          </label>
        </div>
      </div>
      <div class="form-group">
        <label>Temps (secondes)</label>
        <input v-model.number="newQuestion.time" type="number" min="5" max="60" />
      </div>
      <button @click="handleAddQuestion" class="btn btn-primary">
        ➕ Ajouter la question
      </button>

      <h3 class="section-title" style="margin-top: 40px;">Questions existantes</h3>
      <div v-for="theme in themes" :key="theme.id" class="theme-questions">
        <h4 class="theme-subtitle">
          {{ theme.icon }} {{ theme.name }}
        </h4>
        <div v-if="theme.questions.length === 0" class="no-questions">
          Aucune question pour ce thème
        </div>
        <div v-for="(question, qIndex) in theme.questions" :key="qIndex" class="list-item">
          <div class="question-item-content">
            <strong class="question-text">{{ question.question }}</strong>
            <div class="question-meta">
              {{ question.answers.length }} réponses • {{ question.time }}s
            </div>
          </div>
          <button @click="handleDeleteQuestion(theme.id, qIndex)" class="btn btn-danger btn-small">
            🗑️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { quizStore } from '../store/quizStore'

export default {
  // ... autres options
  methods: {
    async handleAddTheme() {
      if (!this.newTheme.name || !this.newTheme.icon) {
        alert('⚠️ Veuillez remplir tous les champs')
        return
      }

      const result = await quizStore.addTheme({ ...this.newTheme })

      if (result.success) {
        this.newTheme = { name: '', icon: '' }
        alert('✅ Thème ajouté avec succès!')
      } else {
        alert(`❌ ${result.error}`)
      }
    },

    async handleDeleteTheme(id) {
      if (confirm('⚠️ Supprimer ce thème et toutes ses questions ?')) {
        const result = await quizStore.deleteTheme(id)

        if (result.success) {
          alert('✅ Thème supprimé')
        } else {
          alert(`❌ ${result.error}`)
        }
      }
    },

    async handleAddQuestion() {
      if (!this.newQuestion.question || this.newQuestion.answers.some(a => !a)) {
        alert('⚠️ Veuillez remplir tous les champs')
        return
      }

      const result = await quizStore.addQuestion({
        ...this.newQuestion,
        answers: [...this.newQuestion.answers]
      })

      if (result.success) {
        this.newQuestion = {
          themeId: this.newQuestion.themeId,
          question: '',
          answers: ['', '', '', ''],
          correct: 0,
          time: 15
        }
        alert('✅ Question ajoutée avec succès!')
      } else {
        alert(`❌ ${result.error}`)
      }
    }
  }
}
</script>

<style scoped>
.admin-panel {
  background: white;
  border-radius: 25px;
  padding: 40px;
  margin: 30px auto;
  max-width: 1000px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 25px;
  border-bottom: 3px solid #e5e7eb;
}

.admin-title {
  font-size: 2.5em;
  font-weight: 900;
  color: #1e3a8a;
}

.tabs-container {
  display: flex;
  gap: 15px;
  margin-bottom: 40px;
}

.tab-btn {
  padding: 15px 35px;
  background: #f3f4f6;
  border: none;
  border-radius: 15px;
  font-size: 1.1em;
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

.section-title {
  margin-bottom: 25px;
  color: #1e3a8a;
  font-size: 1.8em;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 700;
  color: #1e3a8a;
  font-size: 1.1em;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 15px;
  border: 3px solid rgba(30, 58, 138, 0.2);
  border-radius: 12px;
  font-size: 1.1em;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #fbbf24;
  box-shadow: 0 0 20px rgba(251, 191, 36, 0.3);
}

.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, rgba(248, 250, 252, 0.8), rgba(241, 245, 249, 0.8));
  border-radius: 15px;
  margin-bottom: 15px;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.list-item:hover {
  transform: translateX(10px);
  border-color: #fbbf24;
  box-shadow: 0 5px 20px rgba(251, 191, 36, 0.2);
}

.list-item-content {
  display: flex;
  align-items: center;
  gap: 15px;
}

.list-icon {
  font-size: 2em;
}

.list-name {
  font-size: 1.2em;
  color: #1e3a8a;
}

.list-info {
  color: #64748b;
  font-weight: 600;
}

.answer-row {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  align-items: center;
}

.answer-row input[type="text"] {
  flex: 1;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  font-weight: 600;
  color: #1e3a8a;
}

.theme-questions {
  margin-bottom: 35px;
}

.theme-subtitle {
  color: #1e3a8a;
  margin-bottom: 20px;
  font-size: 1.4em;
}

.no-questions {
  color: #64748b;
  font-style: italic;
  padding: 20px;
  text-align: center;
}

.question-item-content {
  flex: 1;
}

.question-text {
  display: block;
  color: #1e3a8a;
  margin-bottom: 8px;
}

.question-meta {
  color: #64748b;
  font-size: 0.9em;
}
</style>
