<template>
  <div
    class="LoginContainer def"
    accessibilityRole="form"
  >
    <div class="LoginTitle">Hello Sir ! Welcome back !</div>
    <TextInput label="Mail" v-model="state.auth.mail" type="text" />
    <TextInput label="Password" v-model="state.auth.password" type="password" @keyup.enter="login" />
    <Btn class="nbtn" @click="login" text="Login" />
    <div
      class="isFailed"
      v-show="isFailed"
    >
      ※ Mail、Passwordを確認してください
    </div>
    <div class="forgot">
      <!-- <Linker to="/reset" clr="#016" :newTab="true">Forgot password ?</Linker> -->
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Btn from '@/components/Atoms/Btn.vue'
import TextInput from '@/components/Molecules/TextInput.vue'
// import Linker from '@/components/Atoms/Linker.vue'

import {
  computed,
  reactive,
  watch,
  onMounted,
  defineComponent
} from 'vue'

type AuthInfo = {
  mail: string,
  password: string
}

type LoginContainerState = {
  auth: AuthInfo,
  isEmit: boolean
}

export default defineComponent({
  name: 'Login',
  components: {
    Btn,
    TextInput
    // Linker
  },
  setup () {
    const store = useStore()
    const router = useRouter()

    const state: LoginContainerState = reactive({
      auth: {
        mail: '',
        password: ''
      },
      isEmit: false
    })

    // computed
    const isAuth = computed(() => store.getters['auth/isLogin']())
    const isFailed = computed(() => store.state.auth.isFailed)

    // watch
    watch(isAuth, () => {
      console.log('isAuth ?', isAuth.value)
      if (isAuth.value) {
        console.log('isAuth === true')
        state.isEmit = false
        router.push('/home')
      }
    })

    watch(isFailed, () => {
      state.isEmit = false
    })

    // Mounted
    onMounted(() => {
      console.log('-- called Mounted ---')
    })

    return {
      state,
      isAuth,
      isFailed,
      login: () => {
        if (state.isEmit) return
        state.isEmit = true
        store.dispatch('auth/login', state.auth)
      }
    }
  }
})

</script>
<style scoped>
.LoginContainer {
  width: 260px;
  height: 470px;
  border-radius: 10px;
  padding: 20px 20px;
  background: #eeccaa44;
  transition-property: box-shadow, background;transition-duration: 0.3s;transition-delay: 0;
  background: linear-gradient(145deg, #fff, #eeffee55);
  box-shadow: 11px 11px 23px #00000018;
}

.logo {
  display: block;
  width: 220px;
  height: 0 auto;
  background: none;
  user-select: none;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
}

.LoginTitle {
  font-size: 26px;
  margin-top: 20px;
  margin-bottom: 30px;
  padding-left: 5px;
}

.appTitle {
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  padding-bottom: 10px;
}

.isFailed {
  margin-top: 30px;
  font-size: 11px;
  color: #600;
}

.nbtn {
  width: 100%;
  margin-top: 20px;
}

.Spiner {
  position: fixed;
  margin-top: 64px;
  margin-left: 78px;
}

.forgot {
  font-size: 11px;
  margin-top: 30px;
}

@media screen and (max-width: 600px) {
  .LoginContainer {
    width: 100vw;
    height: 100vh;
    padding: 50vw 60px 0px;
  }
}

</style>
