import Vue from 'vue'
import Router from 'vue-router'
import Tasks from './views/Tasks'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Tasks',
      component: Tasks
    }
  ]
})

export default router
