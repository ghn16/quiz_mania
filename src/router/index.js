import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizView from '../views/QuizView.vue'
import ResultsView from '../views/ResultsView.vue'
import AdminView from '../views/AdminThemesView.vue'
import AdminThemesView from '../views/AdminThemesView.vue'
import AdminQuestionsView from '@/views/AdminQuestionsView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Quiz Mania - Accueil' },
  },
  {
    path: '/admin/themes',
    component: AdminThemesView,
  },

  {
    path: '/quiz/:themeId',
    name: 'quiz',
    component: QuizView,
    props: true,
    meta: { title: 'Quiz en cours' },
  },
  {
    path: '/results',
    name: 'results',
    component: ResultsView,
    meta: { title: 'Résultats' },
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { title: 'Administration' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
  {
  path: '/admin/questions',
  component: AdminQuestionsView
}
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Quiz Mania'
  next()
})
