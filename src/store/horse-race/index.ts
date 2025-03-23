import { type Module } from 'vuex'
import { state, type AppState } from './state'
import { mutations } from './mutations'
import { actions } from './actions'
import { getters } from './getters'

// Configuration for the horse race module
export const horseRace: Module<AppState, unknown> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
