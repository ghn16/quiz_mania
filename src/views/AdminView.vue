<template>
  <div class="admin-wrapper">
    <!-- Panel Admin -->
    <div class="admin-panel">
      <div class="admin-header">
        <h2 class="admin-title">🔧 Administration</h2>
        <div class="header-actions">
          <button class="btn btn-secondary btn-small">🏠 Accueil</button>
          <button class="btn btn-danger btn-small">🚪 Déconnexion</button>
        </div>
      </div>

      <div class="tabs-container">
        <button class="tab-btn active">📁 Thèmes</button>
        <button class="tab-btn">❓ Questions</button>
      </div>

      <!-- ONGLET THÈMES -->
      <div class="tab-content">
        <div class="section">
          <h3 class="section-title">➕ Ajouter un thème</h3>

          <div class="form-row">
            <div class="form-group flex-1">
              <label>Nom du thème</label>
              <input placeholder="Ex: Géographie" />
            </div>
            <div class="form-group" style="width: 120px;">
              <label>Icône</label>
              <input placeholder="🌍" />
            </div>
          </div>

          <div class="form-actions">
            <button class="btn btn-primary">➕ Ajouter</button>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">📋 Thèmes existants (4)</h3>

          <!-- Thème 1 -->
          <div class="list-item">
            <div class="list-item-content">
              <span class="list-icon">🌍</span>
              <div class="list-details">
                <strong class="list-name">Culture Générale</strong>
                <span class="list-info">3 questions</span>
              </div>
            </div>
            <div class="list-actions">
              <button class="btn btn-warning btn-icon">✏️</button>
              <button class="btn btn-danger btn-icon">🗑️</button>
            </div>
          </div>

          <!-- Thème 2 -->
          <div class="list-item">
            <div class="list-item-content">
              <span class="list-icon">🔬</span>
              <div class="list-details">
                <strong class="list-name">Sciences</strong>
                <span class="list-info">2 questions</span>
              </div>
            </div>
            <div class="list-actions">
              <button class="btn btn-warning btn-icon">✏️</button>
              <button class="btn btn-danger btn-icon">🗑️</button>
            </div>
          </div>

          <!-- Thème 3 -->
          <div class="list-item">
            <div class="list-item-content">
              <span class="list-icon">📜</span>
              <div class="list-details">
                <strong class="list-name">Histoire</strong>
                <span class="list-info">2 questions</span>
              </div>
            </div>
            <div class="list-actions">
              <button class="btn btn-warning btn-icon">✏️</button>
              <button class="btn btn-danger btn-icon">🗑️</button>
            </div>
          </div>

          <!-- Thème 4 -->
          <div class="list-item">
            <div class="list-item-content">
              <span class="list-icon">⚽</span>
              <div class="list-details">
                <strong class="list-name">Sport</strong>
                <span class="list-info">2 questions</span>
              </div>
            </div>
            <div class="list-actions">
              <button class="btn btn-warning btn-icon">✏️</button>
              <button class="btn btn-danger btn-icon">🗑️</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-wrapper { min-height: 100vh; padding: 20px; }

/* === PANEL ADMIN === */
.admin-panel { background: white; border-radius: 25px; padding: 30px; margin: 20px auto; max-width: 1100px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3); }
.admin-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #e5e7eb; }
.admin-title { font-size: 2em; font-weight: 900; color: #1e3a8a; }
.header-actions { display: flex; gap: 10px; }

/* === TABS === */
.tabs-container { display: flex; gap: 10px; margin-bottom: 30px; }
.tab-btn { padding: 12px 25px; background: #f3f4f6; border: none; border-radius: 12px; font-size: 1em; font-weight: 700; cursor: pointer; transition: all 0.3s; color: #64748b; }
.tab-btn.active { background: linear-gradient(135deg, #1e3a8a, #2563eb); color: white; box-shadow: 0 5px 20px rgba(30, 58, 138, 0.4); }

/* === SECTIONS === */
.section { background: #f8fafc; border-radius: 15px; padding: 25px; margin-bottom: 25px; }
.section-title { color: #1e3a8a; font-size: 1.3em; margin-bottom: 20px; }

/* === FORMULAIRES === */
.form-group { margin-bottom: 20px; }
.form-group label { display: block; margin-bottom: 8px; font-weight: 700; color: #1e3a8a; }
.form-group input { width: 100%; padding: 12px; border: 2px solid rgba(30, 58, 138, 0.2); border-radius: 10px; font-size: 1em; font-family: inherit; transition: all 0.3s; }
.form-group input:focus { outline: none; border-color: #fbbf24; box-shadow: 0 0 15px rgba(251, 191, 36, 0.3); }
.form-row { display: flex; gap: 15px; }
.flex-1 { flex: 1; }
.form-actions { display: flex; gap: 10px; justify-content: flex-end; }

/* === BOUTONS === */
.btn { padding: 12px 24px; border: none; border-radius: 10px; font-size: 1em; font-weight: 700; cursor: pointer; transition: all 0.3s; }
.btn-primary { background: linear-gradient(135deg, #1e3a8a, #2563eb); color: white; }
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(37, 99, 235, 0.4); }
.btn-secondary { background: #e5e7eb; color: #64748b; }
.btn-secondary:hover { background: #d1d5db; }
.btn-warning { background: #fbbf24; color: #1e3a8a; }
.btn-danger { background: #ef4444; color: white; }
.btn-danger:hover { background: #dc2626; }
.btn-small { padding: 8px 16px; font-size: 0.9em; }
.btn-icon { padding: 8px 12px; min-width: auto; }

/* === LISTES === */
.list-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; background: white; border-radius: 12px; margin-bottom: 10px; border: 2px solid transparent; transition: all 0.3s; }
.list-item:hover { border-color: #fbbf24; transform: translateX(5px); }
.list-item-content { display: flex; align-items: center; gap: 15px; }
.list-icon { font-size: 2em; }
.list-details { display: flex; flex-direction: column; }
.list-name { color: #1e3a8a; font-size: 1.1em; }
.list-info { color: #64748b; font-size: 0.9em; }
.list-actions { display: flex; gap: 8px; }

@media (max-width: 768px) {
  .admin-panel { padding: 20px; margin: 10px; }
  .admin-header { flex-direction: column; gap: 15px; }
  .form-row { flex-direction: column; }
  .list-item { flex-direction: column; align-items: flex-start; gap: 15px; }
  .list-actions { width: 100%; justify-content: flex-end; }
}
</style>
