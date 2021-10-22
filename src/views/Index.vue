<template>
  <div
    class="Index"
  >
    <div class="box">
      <LoginExpBtn
        class="boxItem"
        :expX="260"
        :expY="470"
        :paddingLeft="5"
      />
      <div class="boxLabel">Login</div>
    </div>

  </div>
</template>

<script lang="ts">
import {
  computed,
  reactive,
  onMounted,
  defineComponent
} from 'vue'

import { useStore } from 'vuex'
import LoginExpBtn from '@/components/Organisms/LoginExpBtn.vue'

type LoginState = {
  bool: boolean
}
export default defineComponent({
  name: 'Index',
  components: {
    LoginExpBtn
  },
  setup () {
    const store = useStore()
    const isPage = computed(() => store.getters['system/isPage']())
    const state: LoginState = reactive({
      bool: true
    })

    onMounted(() => {
      console.log('mounted/Index')
    })

    return {
      isPage,
      state
    }
  }
})
</script>
<style scoped>
.Index {
  width: 100vw;
  height: 100vh;
  text-align: left;
  background: none;
  overflow: hidden;
}

.version {
  font-size: 10px;
  padding-top: 10px;
  padding-left: 10px;
}

.box {
  width: 120px;
  height: 120px;
  padding: 10px;
  background: linear-gradient(145deg, #fff, #eeeeee95);
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
  border-radius: 8px;
  /* box-shadow: 3px 4px 7px 0px #0000001a; */
}

.boxItem {
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
}

.boxLabel {
  width: 100px;
  margin-top: 5px;
  text-align: center;
  letter-spacing: 1px;
}
</style>
