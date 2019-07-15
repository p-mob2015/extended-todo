<template lang="pug">
v-dialog(v-model='open' @keydown.esc='close()' max-width='500' persistent)
  v-card
    v-card-title {{ title }}
    v-card-text
      v-text-field(v-model='mutableProject.title' label='Title')
    v-card-actions
      v-btn(color='darken-1' flat @click.stop='close()') Cancel
      v-spacer
      v-btn.mr-0(color='primary' flat @click.native='submit()' :disabled='!submitable') Save
</template>

<script>
  import { mapMutations } from 'vuex'

  export default {
    props: {
      editMode: { type: Boolean, default: false },
      open: { type: Boolean, default: false },
      model: { type: Object, default: () => ({}) }
    },
    data: () => ({
      mutableProject: {}
    }),
    computed: {
      title () {
        return this.editMode ? 'Edit Project' : 'Add Project'
      },
      submitable () {
        return this.mutableProject.title
      }
    },
    watch: {
      open () {
        this.initMutable(this.model)
      }
    },
    methods: {
      ...mapMutations('projects', [
        'updateProject',
        'addProject'
      ]),
      initMutable (project) {
        this.mutableProject = { ...project }
      },
      close () {
        this.$emit('update:open', false)
      },
      submit () {
        if (this.editMode) {
          this.updateProject(this.mutableProject)
        } else {
          this.addProject(this.mutableProject)
        }
        this.close()
      }
    }
  }
</script>
