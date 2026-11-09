import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import ProjectDashboardView from '../views/ProjectDashboardView.vue'
import CreateProjectView from '../views/CreateProjectView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'
import MyTasksView from '../views/MyTasksView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: ProjectDashboardView
  },
  {
    path: '/projects/new',
    name: 'create-project',
    component: CreateProjectView
  },
  {
    path: '/projects/:id',
    name: 'project-detail',
    component: ProjectDetailView,
    props: true 
  },
  {
    path: '/my-tasks',
    name: 'my-tasks',
    component: MyTasksView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
