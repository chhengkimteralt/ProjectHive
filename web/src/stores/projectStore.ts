import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Project } from '../types/project'
import { projectService } from '../services/projectService'

export const useProjectStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  async function fetchProjects() {
    isLoading.value = true
    error.value = null
    try {
      projects.value = await projectService.getAll()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'An unexpected error occurred'
    } finally {
      isLoading.value = false
    }
  }

  return {
    projects,
    isLoading,
    error,
    fetchProjects
  }
})
