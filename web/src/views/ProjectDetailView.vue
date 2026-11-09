<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useProjectStore } from '../stores/projectStore'
import { projectService } from '../services/projectService'
import type { Milestone } from '../types/milestone'
import type { Task } from '../types/task'
import type { User } from '../types/user'

const props = defineProps<{
  id: string
}>()

const projectStore = useProjectStore()

const milestones = ref<Milestone[]>([])
const tasks = ref<Task[]>([])
const users = ref<User[]>([])
const isLoading = ref<boolean>(true)
const errorMessage = ref<string | null>(null)

async function loadProjectData() {
  isLoading.value = true
  errorMessage.value = null

  try {
    await projectStore.fetchProjectById(props.id)

    const [fetchedMilestones, fetchedTasks, fetchedUsers] = await Promise.all([
      projectService.getMilestones(props.id),
      projectService.getTasks(),
      projectService.getUsers()
    ])

    milestones.value = fetchedMilestones
    tasks.value = fetchedTasks
    users.value = fetchedUsers
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : `Failed to load project with ID ${props.id}`
  } finally {
    isLoading.value = false
  }
}

function getAssigneeName(userId?: number | string): string {
  if (!userId) return 'Unassigned'
  const user = users.value.find(
    (u) => String(u.id) === String(userId) || String(u.user_id) === String(userId)
  )
  return user ? user.name : `Member #${userId}`
}

function getTasksForMilestone(milestoneId: number | string): Task[] {
  return tasks.value.filter((t) => String(t.milestone_id) === String(milestoneId))
}

function getStatusClass(status: string): string {
  const normalized = status.toLowerCase().trim()
  if (normalized === 'complete') {
    return 'status-complete'
  }
  if (normalized === 'in progress') {
    return 'status-in-progress'
  }
  return 'status-pending'
}

onMounted(() => {
  loadProjectData()
})

watch(() => props.id, () => {
  loadProjectData()
})
</script>

<template>
  <div class="project-detail-layout">

    <RouterLink to="/" class="back-link">
      <span>Back to Dashboard</span>
    </RouterLink>

    <div v-if="isLoading" class="state-loading">
      <p>Loading project details...PLEASE WAIT PATIENTLY</p>
    </div>

    <div v-else-if="errorMessage || !projectStore.currentProject" class="state-error detail-error-container">
      <h3>Oops! Project Not Found</h3>
      <p>{{ errorMessage || 'The project could not be found:(' }}</p>
      <RouterLink to="/" class="btn-secondary">
        Return to Dashboard
      </RouterLink>
    </div>

    <template v-else>

      <section class="project-summary-card">
        <div class="project-summary-top">
          <div class="project-info-block">
            <h1 class="project-detail-title">{{ projectStore.currentProject.name }}</h1>
            <div class="project-dates-badge">
              <span>{{ projectStore.currentProject.start_date || 'N/A' }} – {{ projectStore.currentProject.end_date || 'N/A' }}</span>
            </div>
            <p class="project-detail-desc">{{ projectStore.currentProject.description }}</p>
          </div>

          <div class="project-header-actions">
            <button type="button" class="btn-secondary-outline">
              View Team
            </button>
            <button type="button" class="btn-secondary-outline">
              Invite
            </button>
          </div>
        </div>

        <div v-if="projectStore.currentProject.scope" class="project-scope-box">
          <div class="scope-header">
            <span class="scope-badge">📜 Project Scope</span>
            <span class="scope-leaf">🍃</span>
          </div>
          <p class="scope-text">{{ projectStore.currentProject.scope }}</p>
        </div>
      </section>

      <section class="milestones-container">
        <div class="milestones-header-bar">
          <h2 class="milestones-section-title">Milestone</h2>
          <button type="button" class="btn-primary btn-sm">
            + Add Milestone
          </button>
        </div>

        <div v-if="milestones.length === 0" class="empty-box">
          <p>No milestones created for this project yet.</p>
          <button type="button" class="btn-secondary btn-sm">
            Create First Milestone
          </button>
        </div>

        <div v-for="milestone in milestones" :key="milestone.id" class="milestone-card">
          <div class="milestone-top">
            <div class="milestone-info">
              <h3 class="milestone-name">{{ milestone.name }}</h3>
              <span class="milestone-dates">
                {{ milestone.start_date }} – {{ milestone.end_date }}
              </span>
              <p v-if="milestone.description" class="milestone-desc">
                {{ milestone.description }}
              </p>
            </div>

            <button type="button" class="btn-secondary btn-sm">
              + Add Task
            </button>
          </div>

          <div class="task-table-wrapper">
            <table v-if="getTasksForMilestone(milestone.id).length > 0" class="task-table">
              <thead>
                <tr>
                  <th>Task Name</th>
                  <th>Assigned Member</th>
                  <th>Dateline</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="task in getTasksForMilestone(milestone.id)" :key="task.id">
                  <td class="task-title-cell">
                    {{ task.title }}
                    <span v-if="task.description" class="task-desc-subtext">
                      {{ task.description }}
                    </span>
                  </td>
                  <td>
                    <span class="task-assignee-cell">
                      <span class="task-assignee-avatar">👤</span>
                      <span>{{ getAssigneeName(task.assigned_to) }}</span>
                    </span>
                  </td>
                  <td class="task-deadline-cell">
                    {{ task.deadline }}
                  </td>
                  <td>
                    <span class="status-pill" :class="getStatusClass(task.status)">
                      {{ task.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div v-else class="empty-tasks">
              No tasks in this milestone yet :D
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>
