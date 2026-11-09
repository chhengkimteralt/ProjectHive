import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Project } from '../types/project'
import { projectService, type CreateProjectInput } from '../services/projectService'

export const useProjectStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const currentProject = ref<Project | null>(null)
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

  async function fetchProjectById(id: string): Promise<Project> {
    isLoading.value = true
    error.value = null
    try {
      const project = await projectService.getById(id)
      currentProject.value = project
      return project
    } catch (err) {
      error.value = err instanceof Error ? err.message : `Failed to load project with ID ${id}`
      currentProject.value = null
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function createProject(newProjectData: CreateProjectInput): Promise<Project> {
    isLoading.value = true
    error.value = null
    try {
      const created = await projectService.create(newProjectData)
      projects.value.push(created)
      return created
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to create project'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return {
    projects,
    currentProject,
    isLoading,
    error,
    fetchProjects,
    fetchProjectById,
    createProject
  }
})
