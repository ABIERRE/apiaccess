<template>
  <div
    :id="'b' + state.id"
    class="loginExpBtn"
  >
  <div :id="'s' + state.id" class="bgscreen" @click="ed"/>
    <div
      :id="state.id"
      class="circle"
      :class="{
        notexp: !state.expflg && !state.isAnimate
      }"
      @click="st"
      @keyup.esc="ed"
      tabindex="0"
    >
      <div class="circleLabel" v-show="!state.expflg">
        <Icon
          class="LoginIcon"
          :src="LOGIN"
          :size="25"
        />
      </div>
      <span class="slotBase" v-show="state.expflg">
        <LoginContainer />
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import LOGIN from '@/assets/LOGIN.svg'
import Icon from '@/components/Atoms/Icon.vue'
import LoginContainer from '@/components/Organisms/LoginContainer.vue'

import { useStore } from 'vuex'
// import { useRouter } from 'vue-router'

import {
  reactive,
  watchEffect,
  defineComponent
} from 'vue'

import V from 'animejs'

type XY = {
  x: number,
  y: number
}

type ListData = {
  val: string,
  label: string
}

type loginExpBtnState = {
  id: string,
  bxy: XY | null,
  isAnimate: boolean,
  expflg: boolean,
  x: number,
  y: number,
  datalist: ListData[]
}
type targetState = {
  name: string,
  dispName: string,
  role: string,
  password: string
}

type targetErrorState = {
  name: boolean,
  dispName: boolean,
  role: boolean,
  password: boolean
}

export default defineComponent({
  name: 'loginExpBtn',
  props: {
    text: String,
    expX: Number,
    expY: Number,
    paddingLeft: Number
  },
  components: {
    Icon,
    LoginContainer
  },
  setup (props) {
    const store = useStore()
    // const rtr = useRouter()
    const state: loginExpBtnState = reactive({
      id: '',
      bxy: null,
      isAnimate: false,
      expflg: false,
      x: 0,
      y: 0,
      datalist: [
        { val: 'admin', label: 'admin' },
        { val: 'common', label: 'common' }
      ]
    })

    const target: targetState = reactive({
      name: '',
      dispName: '',
      role: '',
      password: ''
    })

    const err: targetErrorState = reactive({
      role: false,
      name: false,
      password: false,
      dispName: false
    })

    const resetValidateTarget = () => {
      err.role = false
      err.name = false
      err.password = false
      err.dispName = false
    }

    const validateTarget = () => {
      resetValidateTarget()
      if (target.name === '') err.name = true
      if (target.role === '') err.role = true
      if (target.dispName === '') err.dispName = true
      if (target.password === '') err.password = true

      let bool = true
      for (const [k, v] of Object.entries(err)) {
        console.log(k, v)
        if (v === true) {
          bool = false
          break
        }
      }
      return bool
    }

    state.id = 'expbtn' + (+new Date())

    watchEffect(() => {
      const w = window.innerWidth
      console.log(w)
      const ef = state.expflg
      if (!ef) return

      const el = document.getElementById(state.id)
      if (!el) return

      if (w < 601) {
        el.style.width = '100vw'
        el.style.height = '100vh'
        el.style.borderRadius = '0'
      } else {
        el.style.width = props.expX + 'px'
        el.style.height = props.expY + 'px'
        el.style.borderRadius = '10px'
      }
    })

    const resetTarget = () => {
      target.name = ''
      target.password = ''
      target.role = ''
      target.dispName = ''
    }

    const st = () => {
      if (state.expflg) return
      if (state.isAnimate) return
      // rtr.push('/login')
      state.isAnimate = true
      state.expflg = true
      console.log('st called : expflg', state.expflg)
      const el = document.getElementById(state.id)
      const bel = document.getElementById('b' + state.id)
      const sel = document.getElementById('s' + state.id)
      if (!el) return
      if (!sel) return
      if (!bel) return

      const xy = bel.getBoundingClientRect()
      if (!xy) return
      state.bxy = xy

      bel.style.zIndex = '99999999999'
      el.style.top = xy.top + 'px'
      el.style.left = xy.left + 'px'
      el.style.position = 'fixed'

      sel.style.top = xy.top + 'px'
      sel.style.left = xy.left + 'px'
      sel.style.position = 'fixed'

      const x = window.innerWidth
      const y = window.innerHeight
      const mx = x < y ? y : x

      if (x < 601) {
        V({
          targets: el,
          width: '100vw',
          height: '100vh',
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          boxShadowX: 0,
          boxShadowY: 17,
          boxShadowBlur: 35,
          borderRadius: '0%',
          duration: 300,
          delay: 0,
          easing: 'easeOutQuad',
          begin: function () {
            el.style.margin = 'auto'
          },
          complete: function () {
            sel.style.top = '0px'
            sel.style.left = '0px'
            sel.style.width = '100vw'
            sel.style.height = '100vh'
            sel.style.borderRadius = '0%'
            state.isAnimate = false
          }
        })
      } else {
        V({
          targets: el,
          width: props.expX,
          height: props.expY,
          top: '0px',
          left: '0px',
          right: '0px',
          bottom: '0px',
          borderRadius: '10px',
          boxShadowX: 0,
          boxShadowY: 17,
          boxShadowBlur: 35,
          duration: 400,
          delay: 0,
          easing: 'easeOutQuad',
          begin () {
            el.style.margin = 'auto'
            el.style.overflow = 'hidden'
          },
          complete () {
            el.style.overflow = 'visible'
            state.isAnimate = false
          }
        })
        V({
          targets: sel,
          width: mx * 1.5,
          height: mx * 1.5,
          top: -mx / 3,
          left: -mx / 3,
          duration: 400,
          delay: 0,
          easing: 'easeOutQuad',
          begin: function () {
            sel.style.borderRadius = '50%'
          },
          complete: function () {
            sel.style.top = '0px'
            sel.style.left = '0px'
            sel.style.width = '100vw'
            sel.style.height = '100vh'
            sel.style.borderRadius = '0%'
          }
        })
      }
    }

    const ed = () => {
      if (state.isAnimate) return
      if (!state.expflg) return
      resetTarget()
      resetValidateTarget()
      // rtr.push('/')
      state.isAnimate = true
      state.expflg = false
      console.log('expflg', state.expflg)
      const el = document.getElementById(state.id)
      const bel = document.getElementById('b' + state.id)
      const sel = document.getElementById('s' + state.id)
      if (!el) return
      if (!bel) return
      if (!sel) return
      const xy = bel.getBoundingClientRect()
      const exy = el.getBoundingClientRect()

      el.style.margin = '0px 0px 0px 0px'
      el.style.right = ''
      el.style.bottom = ''
      el.style.top = exy.top + 'px'
      el.style.left = exy.left + 'px'

      sel.style.margin = '0'
      sel.style.right = ''
      sel.style.bottom = ''
      sel.style.top = '0px'
      sel.style.left = '0px'

      const x = window.innerWidth
      if (x < 601) {
        sel.removeAttribute('style')
      } else {
        const x = window.innerWidth
        const y = window.innerHeight
        const mx = x < y ? y : x
        V({
          targets: sel,
          height: [mx, '40px'],
          width: [mx, '40px'],
          top: xy.top + 'px',
          left: xy.left + 'px',
          borderRadius: ['0%', '50%'],
          duration: 300,
          delay: 0,
          easing: 'easeOutQuad'
        })
      }
      var tl = V.timeline()
      tl.add({
        targets: el,
        height: '40px',
        width: '40px',
        top: xy.top + 'px',
        left: xy.left + 'px',
        borderRadius: '20px',
        boxShadowX: 4,
        boxShadowY: 4,
        translateY: 7,
        boxShadowBlur: 7,
        duration: 300,
        easing: 'easeOutQuad',
        delay: 0,
        complete: () => {
          state.isAnimate = false
          bel.removeAttribute('style')
          sel.removeAttribute('style')
        }
      })
      tl.add({
        targets: el,
        translateY: 0,
        duration: 200,
        easing: 'easeOutQuad',
        delay: 0,
        complete () {
          el.removeAttribute('style')
        }
      })
    }

    const loginExp = () => {
      if (!validateTarget()) return
      store.dispatch('user/store', target)
      ed()
    }

    return {
      state,
      target,
      err,
      st,
      ed,
      loginExp,
      LOGIN
    }
  }
})
</script>
<style scoped>

.loginExpBtn {
  display: block;
  position: relative;
  background: none;
  padding: 0px;
  width: 40px;
  height: 40px;
  border-radius: 30px;
}

.circle {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 30px;
  padding: 0;
  margin: 0;
  /* background: linear-gradient(155deg, #fff, #fafffa); */
  user-select: none;
  outline: none;
}

.cubContainer {
  padding: 20px;
}

.notexp {
  background: linear-gradient(155deg, #fff, #eeffee77);
  box-shadow: 4px 4px 7px #00000018;
}
.notexp:hover {
  transition-property: text-shadow box-shadow, background;transition-duration: 0.3s;transition-delay: 0;
  box-shadow: 1px 1px 1px #00000018;
}
.notexp:active {
  box-shadow: -1px -1px 1px #FFF9F9 inset, 1px 1px 2px 0px #00000018 inset;
}

.circleLabel {
  display: block;
  width: 40px;
  height: 40px;
  line-height: 35px;
  border-radius: 20px;
  text-align: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  cursor: pointer;
  color: #597;
  text-shadow: 0 -1px 1px #ddd, 1px 1px 1px #fff;
  font-size: 30px;
  font-weight: bold;
}

.detailTitle {
  letter-spacing: 2px;
  margin-left: 8px;
  display: flex;
  flex-wrap: wrap;
}

.LoginIcon {
  margin-left: 3px;
}

.UserId {
  margin-top: 5px;
  margin-left: 10px;
}

.toolsDetail {
  margin-top: 30px;
}

.slotBase {
  backdrop-filter: blur(5px);
}

.bgscreen {
  position: absolute;
  background: rgba(0,0,0,.03);
  border-radius: 50%;
  backdrop-filter: blur(5px);
}

.closer {
  position: absolute;
  top: -20px;
  right: -20px;
  font-size: 100px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 100%;
  box-shadow: 1px 3px 5px #000000aa;
  transition-property: box-shadow;transition-duration: 0.3s;transition-delay: 0;
  user-select: none;
  background:#fff;
}

.maxInput {
  margin-top: 40px;
}

.closer:hover {
  box-shadow: 1px 1px 3px #000000aa;
}
.closer:active {
  box-shadow: none;
}

@media screen and (max-width: 600px) {
  .cubContainer {
    width: 100%;
    height: 100%;
    padding: 40px 40px;
  }

  .detailTitle {
    width: 380px;
    margin-left: auto;margin-right: auto;
    margin-top: 60px;
    margin-bottom: 10px;
  }

  .rightDetail {
    margin-left: auto;margin-right: auto;
  }
  .leftDetail {
    margin-left: auto;margin-right: auto;
  }

  .toolsDetail {
    width: 380px;
    margin-left: auto;margin-right: auto;
  }

  .closer {
    top:20px;
    right: 20px;
  }
}
</style>
