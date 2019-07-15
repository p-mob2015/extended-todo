import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import tasks from './modules/tasks'
import projects from './modules/projects'
import ui from './modules/ui'

Vue.use(Vuex)

const storeModules = {
  tasks,
  projects,
  ui
}

const store = new Vuex.Store({
  modules: storeModules,
  plugins: [createPersistedState()]
})

export default store
