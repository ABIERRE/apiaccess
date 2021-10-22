import { createStore } from 'vuex'

import auth from './auth'
import system from './system'

export default createStore({
  modules: {
    auth,
    system
  }
})
