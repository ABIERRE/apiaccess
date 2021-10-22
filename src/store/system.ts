import { ActionContext } from 'vuex'
import Http from '@/modules/Http'

type SystemState = {
  helth: string
}

type SystemContext = ActionContext<SystemState, null>

export default {
  namespaced: true,
  state (): SystemState {
    return {
      helth: ''
    }
  },
  mutations: {
    setHelth (state: SystemState, bool?: boolean): void {
      console.log(bool)
      if (bool === undefined) {
        state.helth = ''
      }
      state.helth = bool ? 'OK' : 'NG'
    }
  },
  actions: {
    async helthCheck (ctx: SystemContext): Promise<void> {
      console.log('called helthCheck')
      ctx.commit('setHelth')
      const res = await Http.get('check')
      console.log(res.status)
      ctx.commit('setHelth', res.status === 200)
    }
  },
  getters: {
    getHelth: (state: SystemState) => (): string => {
      return state.helth
    }
  }
}
