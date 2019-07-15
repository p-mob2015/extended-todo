<template lang="pug">
.task-list
  v-alert.ma-5(v-if='tasks.length === 0 && projects.length === 1' :value='true' outline color='primary') Start by adding some projects and tasks
  v-list(v-else two-line subheader)
    template(v-for='pId in Object.keys(projectsMap)')
      v-subheader(:key='pId')
        | {{ projectsMap[pId].project.title }}
        v-spacer
        template(v-if='projectsMap[pId].project.id !== "na"')
          v-icon.action-icon(size='medium' color='primary' @click.native='onEditProject(projectsMap[pId].project)') edit
          v-icon.action-icon.ml-1(size='medium' color='red' @click.native='triggerProjectRemoval(projectsMap[pId].project)') delete
      task(v-for='task in projectsMap[pId].tasks' :model='task' :key='task.id' @edit='onEditTask(task)')
      v-divider
    task-dialog(:open.sync='taskDialogOpen' :model='taskInEdit' editMode)
    project-dialog(:open.sync='projectDialogOpen' :model='projectInEdit' editMode)
    confirm-dialog(ref='confirmDialog' @confirm='confirmProjectRemoval()')
</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'
  import { TASK_STATES } from '@/store/modules/tasks'
  import Task from './Task'
  import TaskDialog from './TaskDialog'
  import ProjectDialog from './ProjectDialog'
  import ConfirmDialog from './ConfirmDialog'

  export default {
    components: {
      'task': Task,
      'task-dialog': TaskDialog,
      'project-dialog': ProjectDialog,
      'confirm-dialog': ConfirmDialog
    },
    data: () => ({
      taskDialogOpen: false,
      taskInEdit: null,
      projectDialogOpen: false,
      projectInEdit: null,
      projectForRemoval: null
    }),
    computed: {
      ...mapState({
        projects: state => [...state.projects.list, { id: 'na', title: 'Others' }],
        visibility: state => state.ui.taskVisibility
      }),
      ...mapGetters('tasks', {
        tasks: 'sortedList'
      }),
      visibleTasks () {
        if (this.visibility === 'complete') return this.tasks.filter(t => t.status === TASK_STATES.COMPLETE)
        if (this.visibility === 'incomplete') return this.tasks.filter(t => t.status !== TASK_STATES.COMPLETE)

        return this.tasks
      },
      projectsMap () {
        const pTaskMap = this.projects.reduce((obj, project) => {
          return {
            ...obj,
            [project.id]: { project, tasks: [] }
          }
        }, {})

        for (let task of this.visibleTasks) {
          if (task.projectId) {
            pTaskMap[task.projectId].tasks.push(task)
          } else {
            pTaskMap['na'].tasks.push(task)
          }
        }

        if (!pTaskMap['na'].tasks.length) delete pTaskMap['na']

        return pTaskMap
      }
    },
    methods: {
      ...mapMutations('projects', [
        'removeProject'
      ]),
      ...mapMutations('tasks', [
        'makeOrphans'
      ]),
      onEditTask (task) {
        this.taskInEdit = task
        this.taskDialogOpen = true
      },
      onEditProject (project) {
        this.projectInEdit = project
        this.projectDialogOpen = true
      },
      triggerProjectRemoval (project) {
        this.$refs.confirmDialog.show(
          'Delete Project',
          `Are you sure to delete ${project.title}? The belonging tasks will be moved to 'Others'.`,
          true
        )

        this.projectForRemoval = project        
      },
      confirmProjectRemoval () {
        this.makeOrphans(this.projectForRemoval.id)
        this.removeProject(this.projectForRemoval.id)

        this.projectForRemoval = null
      }
    }
  }
</script>

<style lang="stylus" scoped>
.action-icon
  cursor pointer
</style>
