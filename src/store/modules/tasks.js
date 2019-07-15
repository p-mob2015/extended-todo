import reject from 'lodash/reject'
import orderBy from 'lodash/orderBy'
import { generateId } from '@/utils/functions'

export const TASK_STATES = {
  READY: 'ready',
  PENDING: 'pending',
  COMPLETE: 'complete',
  PAUSED: 'paused'
}

const getDefaultState = () => ({
  list: []
})

const state = getDefaultState()

const mutations = {
  addTask (state, task) {
    state.list = [...state.list, {
      ...task,
      status: task.status || TASK_STATES.READY,
      id: generateId('t')
    }]
  },
  makeOrphans(state, projectId) {
    state.list = state.list.map(task => {
      if (task.projectId === projectId) {
        return {
          ...task,
          projectId: null
        }
      }

      return task
    })
  },
  removeTask (state, taskId) {
    state.list = reject(state.list, task => task.id === taskId)
  },
  updateTask (state, { id, ...updateBody }) {
    state.list = state.list.map(task => {
      if (task.id === id) {
        return {
          ...task,
          ...updateBody
        }
      }

      return task
    })
  }
}

const getters = {
  sortedList (state) {
    return orderBy(state.list, [task => task.status === TASK_STATES.COMPLETE, task => new Date(task.due)], ['desc', 'asc'])
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
