import Http from '@/modules/Http'
import { ActionContext } from 'vuex'
//
type AuthInfo = {
  mail: string,
  password: string
}

type AuthState = {
  mail: string,
  Fingerprint: string,
  isFailed: boolean
}

type AuthContext = ActionContext<AuthState, null>

export default {
  namespaced: true,
  state (): AuthState {
    return {
      mail: '',
      Fingerprint: '',
      isFailed: false
    }
  },
  mutations: {
    fail (state: AuthState): void {
      state.isFailed = true
    },
    login (state: AuthState, mail: string): void {
      state.mail = ''
      state.mail = mail
      state.isFailed = false
    },
    setFingerprint (state: AuthState, Fingerprint: string): void {
      state.Fingerprint = Fingerprint
    },
    logout (state: AuthState): void {
      state.mail = ''
    }
  },
  actions: {
    async login (ctx: AuthContext, d: AuthInfo): Promise<void> {
      console.log('called store action login', d)
      ctx.commit('login', null)

      console.log('will post login')
      await Http.post('login', d)
        .then(res => {
          console.log('login has success: ', res.data)
          if (res.status === 200) {
            ctx.commit('login', res.data)
          }
        })
        .catch(err => {
          ctx.commit('fail', err)
        })
    },
    logout (ctx: AuthContext): void {
      console.log('called logout')
      ctx.commit('logout')
    }
  },
  getters: {
    isLogin: (state: AuthState) => (): boolean => {
      return state.mail !== ''
    },
    isFingerprint: (state: AuthState) => (): boolean => {
      return state.Fingerprint !== ''
    },
    getMail: (state: AuthState) => (): string => {
      return state.mail
    }
  }
}
