<template lang="pug">
v-list-tile.task
  v-list-tile-action
    v-checkbox(:input-value='isComplete' @change='toggleComplete')
  v-list-tile-content
    v-list-tile-title {{ model.title }}
    v-list-tile-sub-title {{ model.due }}
  v-list-tile-action.actions
    v-chip.mr-5(outline color='primary') {{ model.status }}
    v-btn.mr-2(fab dark small color='green' @click.native='$emit("edit")')
      v-icon edit
    v-btn(fab dark small color='red' @click.native='remove')
      v-icon delete
</template>

<script>
  import { mapMutations } from 'vuex'
  import { TASK_STATES } from '@/store/modules/tasks'

  export default {
    props: {
      model: Object
    },
    computed: {
      isComplete () {
        return this.model.status === TASK_STATES.COMPLETE
      }
    },
    methods: {
      ...mapMutations('tasks', [
        'updateTask',
        'removeTask'
      ]),
      toggleComplete (truthy) {
        this.updateTask({
          id: this.model.id,
          status: truthy ? TASK_STATES.COMPLETE : TASK_STATES.READY
        })
      },
      remove () {
        this.removeTask(this.model.id)
      }
    }
  }
</script>

<style lang="stylus" scoped>
.actions
  display flex
  flex-direction row
</style>
