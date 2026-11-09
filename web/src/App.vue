<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import projectIcon from './assets/icons/project.png'
import taskIcon from './assets/icons/task.png'
import invitationIcon from './assets/icons/invitation.png'

const appTitle = ref('ProjectHive')
const currentUser = ref({
  name: 'Kimter',
  id: 'p20240007',
})

const route = useRoute()
// Dynamically active based on current page
const isProjectsActive = computed(() => route.path === '/' || route.path.startsWith('/projects'))
const isTasksActive = computed(() => route.path === '/my-tasks')
</script>

<template>
  <header class="top-header">
    <div class="nav-left">
      <RouterLink to="/" class="brand-logo">
        <span class="bee-icon">🐝</span>
        <span>{{ appTitle }}</span>
      </RouterLink>
      <nav class="nav-links">
        <RouterLink to="/" :class="{ active: isProjectsActive }">
          <img :src="projectIcon" alt="Projects" class="nav-icon" />
          <span>Projects</span>
        </RouterLink>
        <RouterLink to="/my-tasks" :class="{ active: isTasksActive }">
          <img :src="taskIcon" alt="My Tasks" class="nav-icon" />
          <span>My Tasks</span>
        </RouterLink>
        <a href="#invitations">
          <img :src="invitationIcon" alt="Invitations" class="nav-icon" />
          <span>Invitations</span>
        </a>
      </nav>
    </div>

    <div class="user-badge">
      <span>🍃</span>
      <span>Logged in: <strong>{{ currentUser.name }}</strong></span>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>
