<template lang="pug">
v-dialog(v-model='open' @keydown.esc='open=false' max-width='500')
  v-card
    v-card-title {{ title }}
    v-card-text
      v-container.text-xs-center(grid-list-md) {{ description }}
    v-card-actions
      v-btn(color='darken-1' flat @click.stop='open=false') No
      v-spacer
      v-btn.mr-0(:color="criticality ? 'red' : 'primary'" flat @click.native='confirm()') Yes
</template>
<script>
  export default {
    data () {
      return {
        title: '',
        description: '',
        criticality: false,
        open: false
      }
    },
    methods: {
      show (title, description, criticality = false) {
        this.title = title
        this.description = description
        this.criticality = criticality
        this.open = true
      },
      confirm () {
        this.open = false
        this.$emit('confirm')
      }
    }
  }
</script>
