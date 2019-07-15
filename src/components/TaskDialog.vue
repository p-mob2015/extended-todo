<template lang="pug">
v-dialog(v-model='open' @keydown.esc='close()' max-width='500' persistent)
  v-card
    v-card-title {{ title }}
    v-card-text
      v-select(v-model='mutableTask.projectId' :items='projects' label='Project' item-text='title' item-value='id')
      v-text-field(v-model='mutableTask.title' label='Title')
      v-menu(
        v-model='dateMenuOpen'
        :close-on-content-click='false'
        :nudge-right='40'
        lazy
        transition='scale-transition'
        offset-y
        full-width
        min-width='290'
      )
        template(v-slot:activator='{ on }')
          v-text-field(v-model='mutableTask.due' label='Due date' readonly v-on='on')
        v-date-picker(v-model='mutableTask.due' @input='dateMenuOpen = false' :min='today' no-title scrollable)
      v-select(v-model='mutableTask.status' :items='states' label='Status' item-text='key' item-value='key')
    v-card-actions
      v-btn(color='darken-1' flat @click.stop='close()') Cancel
      v-spacer
      v-btn.mr-0(color='primary' flat @click.native='submit()' :disabled='!submitable') Save
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import { TASK_STATES } from '@/store/modules/tasks'

  export default {
    props: {
      editMode: { type: Boolean, default: false },
      open: { type: Boolean, default: false },
      model: { type: Object, default: () => ({}) }
    },
    data: () => ({
      mutableTask: {},
      dateMenuOpen: false,
      today: new Date().toISOString().substr(0, 10),
      states: Object.keys(TASK_STATES).map(st => ({
        key: TASK_STATES[st]
      }))
    }),
    computed: {
      ...mapState({
        projects: state => state.projects.list
      }),
      title () {
        return this.editMode ? 'Edit Task' : 'Add Task'
      },
      submitable () {
        return this.mutableTask.title && this.mutableTask.due
      }
    },
    watch: {
      open () {
        this.initMutable(this.model)
      }
    },
    methods: {
      ...mapMutations('tasks', [
        'updateTask',
        'addTask'
      ]),
      initMutable (task) {
        this.mutableTask = { ...task }
      },
      close () {
        this.$emit('update:open', false)
      },
      submit () {
        if (this.editMode) {
          this.updateTask(this.mutableTask)
        } else {
          this.addTask(this.mutableTask)
        }
        this.close()
      }
    }
  }
</script>
