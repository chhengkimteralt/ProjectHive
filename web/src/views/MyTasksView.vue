<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { projectService } from '../services/projectService'
import type { Task } from '../types/task'
import type { Milestone } from '../types/milestone'

const currentUserId = 1

const allTasks = ref<Task[]>([])
const milestones = ref<Milestone[]>([])
const isLoading = ref<boolean>(true)
const errorMessage = ref<string | null>(null)

const activeFilter = ref<string>('all')

const myTasks = computed(() =>
  allTasks.value.filter(
    (t) => String(t.assigned_to) === String(currentUserId)
  )
)

const filteredTasks = computed(() => {
  if (activeFilter.value === 'all') return myTasks.value
  return myTasks.value.filter(
    (t) => t.status.toLowerCase().trim() === activeFilter.value
  )
})

function getMilestoneName(milestoneId: number | string): string {
  const m = milestones.value.find((m) => String(m.id) === String(milestoneId))
  return m ? m.name : `Milestone #${milestoneId}`
}

function statusClass(status: string): string {
  const s = status.toLowerCase().trim()
  if (s === 'complete') return 'status-complete'
  if (s === 'in progress') return 'status-in-progress'
  return 'status-pending'
}

function isOverdue(deadline: string): boolean {
  if (!deadline) return false
  return new Date(deadline) < new Date(new Date().toDateString())
}

function nextStatus(current: string): string {
  const cycle = ['pending', 'in progress', 'complete']
  const idx = cycle.indexOf(current.toLowerCase().trim())
  return cycle[(idx + 1) % cycle.length]
}

async function toggleStatus(task: Task) {
  const updated = nextStatus(task.status)
  try {
    const result = await projectService.updateTaskStatus(task.id, updated)
    const idx = allTasks.value.findIndex((t) => t.id === task.id)
    if (idx !== -1) allTasks.value[idx] = result
  } catch {
    alert('Failed to update task status. Is json-server running?')
  }
}

onMounted(async () => {
  try {
    const [fetchedTasks, fetchedMilestones] = await Promise.all([
      projectService.getTasks(),
      projectService.getMilestones()
    ])
    allTasks.value = fetchedTasks
    milestones.value = fetchedMilestones
  } catch (err) {
    errorMessage.value = err instanceof Error ? err.message : 'Failed to load tasks'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="my-tasks-layout">

    <div class="tasks-page-header">
      <h1>My Tasks</h1>
      <span class="task-count-badge" v-if="!isLoading && !errorMessage">
        {{ myTasks.length }} task{{ myTasks.length !== 1 ? 's' : '' }}
      </span>
    </div>

    <div class="tasks-filter-bar" v-if="!isLoading && !errorMessage && myTasks.length > 0">
      <span class="filter-label">Show:</span>
      <button
        v-for="chip in ['all', 'pending', 'in progress', 'complete']"
        :key="chip"
        type="button"
        class="filter-chip"
        :class="{ active: activeFilter === chip }"
        @click="activeFilter = chip"
      >
        {{ chip === 'all' ? 'All' : chip }}
      </button>
    </div>

    <div v-if="isLoading" class="state-loading">
      <p>Loading your tasks... please wait</p>
    </div>

    <div v-else-if="errorMessage" class="state-error">
      <p>{{ errorMessage }}</p>
    </div>

    <div v-else-if="myTasks.length === 0" class="tasks-empty-box">
      <span class="tasks-empty-icon">🌿</span>
      <p>No tasks assigned to you yet!</p>
      <span class="sub-hint">Ask your project leader to assign tasks to you.</span>
    </div>

    <div v-else-if="filteredTasks.length === 0" class="tasks-empty-box">
      <span class="tasks-empty-icon">🍃</span>
      <p>No "{{ activeFilter }}" tasks found.</p>
      <span class="sub-hint">Try a different filter above.</span>
    </div>

    <div v-else class="task-list">
      <div
        v-for="task in filteredTasks"
        :key="task.id"
        class="task-card"
        :class="statusClass(task.status)"
      >
        <div class="task-card-top">
          <div class="task-title-block">
            <h3 class="task-title">{{ task.title }}</h3>
            <span class="task-milestone-label">
              {{ getMilestoneName(task.milestone_id) }}
            </span>
          </div>

          <button
            type="button"
            class="task-status-btn"
            :class="statusClass(task.status)"
            @click="toggleStatus(task)"
            title="Click to cycle status"
          >
            {{ task.status }}
          </button>
        </div>

        <p v-if="task.description" class="task-desc">{{ task.description }}</p>

        <div class="task-footer">
          <span
            class="task-deadline-meta"
            :class="{ overdue: isOverdue(task.deadline) }"
          >
            {{ isOverdue(task.deadline) ? 'Overdue ·' : 'Deadline ·' }} {{ task.deadline }}
          </span>
        </div>
      </div>
    </div>

  </div>
</template>