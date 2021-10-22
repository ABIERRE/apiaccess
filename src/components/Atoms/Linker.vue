<template>
  <router-link
    class="linker"
    :style="style()"
    :to="to"
    :target="newTab ? '_blank' : ''"
  >
    <span v-if="text">{{ text }}</span>
    <slot v-else />
  </router-link>
</template>
<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'linker',
  props: [
    'to',
    'text',
    'clr',
    'src',
    'newTab'
  ],
  setup (props) {
    return {
      style: () => 'color: ' + (props.clr ? props.clr : '#000')
    }
  }
})
</script>
<style scoped>
.linker {
  display: block;
  width: 0 auto;
  min-width: 30px;
  max-width: 210px;
  color: #444;
  text-shadow: 3px 3px 3px #ddd;
  letter-spacing: 2px;
  user-select: none;
  cursor: pointer;
}
</style>
