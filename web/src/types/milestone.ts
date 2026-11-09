export interface Milestone {
  id: number | string
  milestone_id?: number
  project_id: number | string
  name: string
  description?: string
  start_date: string
  end_date: string
}
