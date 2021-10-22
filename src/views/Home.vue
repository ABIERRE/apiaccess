<template>
  <div class="Home">
    <Btn @click="helthCheck" text="API Check" />
    <div class="HelthStatus">API status</div>
    <div class="HelthResult">{{ helthStatus }}</div>
  </div>
</template>

<script lang="ts">
import Btn from '@/components/Atoms/Btn.vue'
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'Home',
  components: {
    Btn
  },
  setup () {
    const store = useStore()
    const helthStatus = computed(() => store.getters['system/getHelth']())
    const helthCheck = (): void => {
      store.dispatch('system/helthCheck')
    }
    return {
      helthCheck,
      helthStatus
    }
  }
})
</script>

<style scoped>
.Home {
  padding-top: 40px;
  padding-left: 40px;
}

.HelthStatus {
  margin-top: 20px;
  border-left: 3px solid #0da;
  padding-left: 10px;
  line-height: 30px;
  font-size: 20px;
}
.HelthResult {
  margin-top: 20px;
  font-size: 24px;
}

</style>
