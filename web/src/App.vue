<script setup lang="ts">
import { ref } from 'vue'
import projectIcon from './assets/icons/project.png'
import taskIcon from './assets/icons/task.png'
import invitationIcon from './assets/icons/invitation.png'

const appTitle = ref('ProjectHive')
const currentUser = ref({
  name: 'Kimter',
  id: 'p20240007',
})
</script>

<template>
  <!-- navigation bar -->
  <header class="top-header">
    <div class="nav-left">
      <a href="/" class="brand-logo">
        <span class="bee-icon">🐝</span>
        <span>{{ appTitle }}</span>
      </a>
      <nav class="nav-links">
        <a href="#projects" class="active">
          <img :src="projectIcon" alt="Projects" class="nav-icon" />
          <span>Projects</span>
        </a>
        <a href="#tasks">
          <img :src="taskIcon" alt="My Tasks" class="nav-icon" />
          <span>My Tasks</span>
        </a>
        <a href="#invitations">
          <img :src="invitationIcon" alt="Invitations" class="nav-icon" />
          <span>Invitations</span>
        </a>
      </nav>
    </div>

    <!-- user badge -->
    <div class="user-badge">
      <span>🍃</span>
      <span>Logged in: <strong>{{ currentUser.name }}</strong></span>
    </div>
  </header>

  <main>
    <div class="card">
      <h2>🌲 Welcome to ProjectHive, {{ currentUser.name }}!</h2>
      <p>
        Your cozy workspace to manage group projects, divide tasks into milestones, and collaborate smoothly with your team.
      </p>

      <div class="button-group">
        <button class="btn-primary">
          <img :src="projectIcon" alt="" class="btn-icon" />
          <span>+ Create New Project</span>
        </button>
        <button class="btn-secondary">
          <img :src="taskIcon" alt="" class="btn-icon" />
          <span>View My Tasks</span>
        </button>
      </div>
    </div>
  </main>
</template>
