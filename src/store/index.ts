import { createStore } from 'vuex'
import { horseRace } from './horse-race'

const store = createStore({
  modules: {
    horseRace,
  },
})

export { store }
