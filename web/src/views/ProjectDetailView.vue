<script setup lang="ts">
import { RouterLink } from 'vue-router'

// Automatically received from the route param :id
const props = defineProps<{
  id: string
}>()
</script>

<template>
  <div class="project-detail card">
    <RouterLink to="/" class="back-link">Back to Dashboard</RouterLink>
    <h2>Project Details</h2>
    <p>This is project ID: <span class="badge">{{ props.id }}</span></p>
  </div>
</template>
