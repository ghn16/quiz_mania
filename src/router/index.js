import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import QuizView from '../views/QuizView.vue'
import ResultsView from '../views/ResultsView.vue'
import AdminView from '../views/AdminView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Quiz Mania - Accueil' }
  },
  {
    path: '/quiz/:themeId',
    name: 'quiz',
    component: QuizView,
    props: true,
    meta: { title: 'Quiz en cours' }
  },
  {
    path: '/results',
    name: 'results',
    component: ResultsView,
    meta: { title: 'Résultats' }
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta: { title: 'Administration' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

/* router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token")
  if (to.meta.requiresAuth && !isAuthenticated) {

    next("/")
  } else if (!to.meta.requiresAuth && isAuthenticated) {

     router.back()
  }
  else {
    next()
  }
})
 */