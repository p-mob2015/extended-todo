<template lang="pug">
v-toolbar
  v-toolbar-title
    v-btn-toggle(:value='taskVisibility' @change='setTaskVisibility')
      v-btn(flat value='all') All
      v-btn(flat value='incomplete') Incomplete
      v-btn(flat value='complete') Complete
  v-spacer
  v-toolbar-items.actions
    v-speed-dial(direction='left' open-on-hover)
      v-btn.mx-1(fab dark small color='blue darken-2' slot='activator' @click.stop)
        v-icon add
      v-tooltip(bottom)
        template(v-slot:activator='{ on }')
          v-btn.mx-1(fab dark small color='green' v-on='on' @click.stop='projectDialogOpen=true')
            v-icon create_new_folder
        span Add a project
      v-tooltip(bottom)
        template(v-slot:activator='{ on }')
          v-btn.mx-1(fab dark small color='green' v-on='on' @click.stop='taskDialogOpen=true')
            v-icon assignment
        span Add a task
  task-dialog(:open.sync='taskDialogOpen' :model='{}')
  project-dialog(:open.sync='projectDialogOpen' :model='{}')
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  import TaskDialog from './TaskDialog'
  import ProjectDialog from './ProjectDialog'

  export default {
    components: {
      'task-dialog': TaskDialog,
      'project-dialog': ProjectDialog
    },
    data: () => ({
      taskDialogOpen: false,
      projectDialogOpen: false
    }),
    computed: {
      ...mapState({
        taskVisibility: state => state.ui.taskVisibility
      })
    },
    methods: {
      ...mapMutations('ui', [
        'setTaskVisibility'
      ])
    }
  }
</script>

<style lang="stylus" scoped>
.actions
  display flex
  align-items center
</style>