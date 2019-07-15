<template lang="pug">
.page.page--tasks
  .content
    topbar
    list
</template>

<script>
  import Topbar from '@/components/Topbar'
  import List from '@/components/List'

  export default {
    components: {
      'topbar': Topbar,
      'list': List
    }
  }
</script>

<style lang="stylus" scoped>

</style>