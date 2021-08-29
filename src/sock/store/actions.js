import * as types from './mutations-types'

export const ActionRefresh = ({ dispatch }, payload) => {
  dispatch('ActionSet', payload)
}

export const ActionSet = ({ commit }, payload) => {
  commit(types.SET_CONTROLERS, payload)
}
