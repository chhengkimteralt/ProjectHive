import type { Project } from '../types/project'
import type { Milestone } from '../types/milestone'
import type { Task } from '../types/task'
import type { User } from '../types/user'

const BASE_URL = 'http://localhost:3000'

export type CreateProjectInput = Omit<Project, 'id'>

export const projectService = {
  async getAll(): Promise<Project[]> {
    const response = await fetch(`${BASE_URL}/projects`)
    if (!response.ok) {
      throw new Error(`Failed to fetch projects (Status: ${response.status})`)
    }
    return response.json()
  },

  async getById(id: string): Promise<Project> {
    const response = await fetch(`${BASE_URL}/projects/${id}`)
    if (!response.ok) {
      throw new Error(`Project with ID ${id} not found`)
    }
    return response.json()
  },

  async create(project: CreateProjectInput): Promise<Project> {
    const response = await fetch(`${BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(project)
    })

    if (!response.ok) {
      throw new Error(`Failed to create project (Status: ${response.status})`)
    }
    return response.json()
  },

  async getMilestones(projectId?: string | number): Promise<Milestone[]> {
    const response = await fetch(`${BASE_URL}/milestones`)
    if (!response.ok) {
      throw new Error(`Failed to fetch milestones (Status: ${response.status})`)
    }
    const all: Milestone[] = await response.json()
    if (!projectId) return all
    return all.filter((m) => String(m.project_id) === String(projectId))
  },

  async getTasks(): Promise<Task[]> {
    const response = await fetch(`${BASE_URL}/tasks`)
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks (Status: ${response.status})`)
    }
    return response.json()
  },

  async getUsers(): Promise<User[]> {
    const response = await fetch(`${BASE_URL}/users`)
    if (!response.ok) {
      throw new Error(`Failed to fetch users (Status: ${response.status})`)
    }
    return response.json()
  },

  async updateTaskStatus(taskId: number | string, newStatus: string): Promise<Task> {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    })
    if (!response.ok) {
      throw new Error(`Failed to update task (Status: ${response.status})`)
    }
    return response.json()
  }
}
