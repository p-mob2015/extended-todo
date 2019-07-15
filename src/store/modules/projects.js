import reject from 'lodash/reject'
import { generateId } from '@/utils/functions'

const getDefaultState = () => ({
  list: []
})

const state = getDefaultState()

const mutations = {
  addProject (state, project) {
    state.list = [...state.list, {
      ...project,
      id: generateId('p')
    }]
  },
  removeProject (state, projectId) {
    state.list = reject(state.list, project => project.id === projectId)
  },
  updateProject (state, { id, ...updateBody }) {
    state.list = state.list.map(project => {
      if (project.id === id) {
        return {
          ...project,
          ...updateBody
        }
      }

      return project
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
