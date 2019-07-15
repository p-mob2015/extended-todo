const getDefaultState = () => ({
  taskVisibility: 'all'
})

const state = getDefaultState()

const mutations = {
  setTaskVisibility (state, taskVisibility) {
    state.taskVisibility = taskVisibility
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
