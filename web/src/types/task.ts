export type TaskStatus = 'pending' | 'in progress' | 'complete'

export interface Task {
  id: number | string
  task_id?: number
  milestone_id: number | string
  title: string
  description?: string
  deadline: string
  status: TaskStatus | string
  assigned_to?: number | string
}
