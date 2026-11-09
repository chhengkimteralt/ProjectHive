<script setup lang="ts">
import { reactive, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useProjectStore } from '../stores/projectStore'

const router = useRouter()
const projectStore = useProjectStore()

const currentUser = ref({
  name: 'Kimter',
  id: 1,
})

const form = reactive({
  name: '',
  description: '',
  scope: '',
  start_date: '',
  end_date: '',
  created_by: currentUser.value.id
})

const errors = reactive({
  name: '',
  description: '',
  scope: '',
  start_date: '',
  end_date: ''
})

const isSubmitting = ref(false)
const submitError = ref<string | null>(null)

function validateForm(): boolean {
  let isValid = true

  errors.name = ''
  errors.description = ''
  errors.scope = ''
  errors.start_date = ''
  errors.end_date = ''

  if (!form.name.trim()) {
    errors.name = 'Project name is required'
    isValid = false
  } else if (form.name.trim().length < 3) {
    errors.name = 'Project name must be at least 3 characters'
    isValid = false
  }

  if (!form.description.trim()) {
    errors.description = 'Description is required'
    isValid = false
  }

  if (!form.scope.trim()) {
    errors.scope = 'Scope definition is required'
    isValid = false
  }

  if (form.start_date && form.end_date) {
    const start = new Date(form.start_date)
    const end = new Date(form.end_date)
    if (end < start) {
      errors.end_date = 'End date cannot be earlier than start date'
      isValid = false
    }
  }

  return isValid
}

async function handleSubmit() {
  submitError.value = null
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true
  try {
    const newProject = await projectStore.createProject({
      name: form.name.trim(),
      description: form.description.trim(),
      scope: form.scope.trim(),
      start_date: form.start_date,
      end_date: form.end_date,
      created_by: form.created_by
    })

    router.push(`/projects/${newProject.id}`)
  } catch (err) {
    submitError.value = err instanceof Error ? err.message : 'Failed to save project'
  } finally {
    isSubmitting.value = false
  }
}

</script>

<template>
  <div class="create-project-container">
    <RouterLink to="/" class="back-link">← Back to Dashboard</RouterLink>
    <div class="card form-card">
      <div class="form-header">
        <h2>Create New Project</h2>
      </div>
      <div v-if="submitError" class="state-error banner">
        <p>{{ submitError }}</p>
      </div>
      <form @submit.prevent="handleSubmit" novalidate>

        <div class="form-group" :class="{ 'has-error': errors.name }">
          <label for="name">Project Name <span class="required">*</span></label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            placeholder="Give your project a creative and unique name"
          />
          <span v-if="errors.name" class="error-msg">{{ errors.name }}</span>
        </div>

        <div class="form-group" :class="{ 'has-error': errors.description }">
          <label for="description">Description <span class="required">*</span></label>
          <textarea
            id="description"
            v-model="form.description"
            rows="3"
            placeholder="What is this project about? Why does it matter?"
          ></textarea>
          <span v-if="errors.description" class="error-msg">{{ errors.description }}</span>
        </div>
 
        <div class="form-group" :class="{ 'has-error': errors.scope }">
          <label for="scope">Project Scope <span class="required">*</span></label>
          <textarea
            id="scope"
            v-model="form.scope"
            rows="3"
            placeholder="Key deliverables, requirements, and tech stack..."
          ></textarea>
          <span v-if="errors.scope" class="error-msg">{{ errors.scope }}</span>
        </div>

        <div class="form-row">
          <div class="form-group" :class="{ 'has-error': errors.start_date }">
            <label for="start_date">Start Date <span class="required">*</span></label>
            <input
              id="start_date"
              v-model="form.start_date"
              type="date"
            />
            <span v-if="errors.start_date" class="error-msg">{{ errors.start_date }}</span>
          </div>
          <div class="form-group" :class="{ 'has-error': errors.end_date }">
            <label for="end_date">End Date <span class="required">*</span></label>
            <input
              id="end_date"
              v-model="form.end_date"
              type="date"
            />
            <span v-if="errors.end_date" class="error-msg">{{ errors.end_date }}</span>
          </div>
        </div>

        <div class="form-actions">
          <RouterLink to="/" class="btn-cancel">Cancel</RouterLink>
          <button type="submit" class="btn-primary" :disabled="isSubmitting">
            <span v-if="isSubmitting">Creating...</span>
            <span v-else>+ Create Project</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
