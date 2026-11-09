export interface Project {
  id: number | string
  name: string
  description: string
  scope: string
  start_date: string
  end_date: string
  created_by: number | string
  role?: string
}
