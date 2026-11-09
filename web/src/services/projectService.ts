import type { Project } from '../types/project'

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
  }
}
