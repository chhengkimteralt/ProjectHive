<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useProjectStore } from '../stores/projectStore'
import type { Project } from '../types/project'
import projectIcon from '../assets/icons/project.png'
import taskIcon from '../assets/icons/task.png'

const projectStore = useProjectStore()
const currentUser = ref({
  name: 'Kimter',
  id: 1,
})

function getProjectRole(project: Project): string {
  if (project.role) return project.role
  return project.created_by === currentUser.value.id ? 'Leader' : 'Member'
}

onMounted(() => {
  projectStore.fetchProjects()
})
</script>

<template>
  <div class="dashboard">

    <div class="header">
      <h1>Projects</h1>
      <RouterLink to="/projects/new" class="btn-create">
        + Create New Project 
      </RouterLink>
    </div>

    <div v-if="projectStore.isLoading" class="state-loading">
      <p>Loading projects... please wait</p>
    </div>

    <div v-else-if="projectStore.error" class="state-error">
      <p>Opps! {{ projectStore.error }}</p>
    </div>

    <div v-else-if="projectStore.projects.length === 0" class="state-empty">
      <div class="card">
        <h2>🌲 Welcome to ProjectHive, {{ currentUser.name }}!</h2>
        <p>
          A little cozy workspace to manage group projects, divide tasks into milestones, 
          and collaborate smoothly with your team.
        </p>

        <div class="button-group">
          <RouterLink to="/projects/new" class="btn-primary">
            <img :src="projectIcon" alt="" class="btn-icon" />
            <span>+ Create New Project</span>
          </RouterLink>
          <RouterLink to="/my-tasks" class="btn-secondary">
            <img :src="taskIcon" alt="" class="btn-icon" />
            <span>View My Tasks</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <div v-else class="project-list">
      <div v-for="project in projectStore.projects" :key="project.id" class="project-card">
        <div class="project-card-header">
          <h3>{{ project.name }}</h3>
          <span 
            class="role-badge" 
            :class="getProjectRole(project).toLowerCase()"
          >
            {{ getProjectRole(project) }}
          </span>
        </div>

        <p>{{ project.description }}</p>

        <div class="project-card-footer">
          <span class="timeline">{{ project.start_date }} - {{ project.end_date }}</span>
          <RouterLink :to="`/projects/${project.id}`" class="view-link">
            View
          </RouterLink>
        </div>
      </div>
    </div>
    
  </div>    
</template>
