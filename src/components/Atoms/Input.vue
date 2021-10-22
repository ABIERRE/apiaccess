<template>
  <input
    class="Input"
    :type="type || 'text'"
    v-model="inputVal"
  />
</template>
<script>
import {
  computed
} from 'vue'

export default {
  name: 'Input',
  props: {
    modelValue: String,
    type: String
  },
  setup (props, ctx) {
    const inputVal = computed({
      get: function () { return props.modelValue },
      set: function (v) { ctx.emit('update:modelValue', v) }
    })
    return {
      inputVal
    }
  }
}
</script>
<style scoped>
.TextInput {
  position: relative;
  margin-top: 25px;
}
.Label {
  position: absolute;
  display: block;
  text-align: left;
  line-height: 20px;
  font-size: 11px;
  padding-top: 6px;
  width:0 auto;min-width: 250px;
  top: -30px;
  left: 0px;
  z-index: 1;
  cursor: text;
}

.focused {
  color: #620;
  font-size: 13px;
  letter-spacing: 2px;
  transform: translate(2px,5px);
  transition-property: transform font-size;transition-duration: 0.2s;transition-delay: 0;
  text-shadow: 0 1.36px 1.896px #c4b59daa,0 -2px 1px #fff;
}

.notfocus {
  color: #d94;
  letter-spacing: 1px;
  transform: translate(15px,35px);
  transition-property: transform font-size;transition-duration: 0.2s;transition-delay: 0;
}

.isEdit {
  filter: drop-shadow( 0px 0px 2px rgba(234,245,30,.09));
}

.Input {
  font-family: "TsukuARdGothic-Regular", "M PLUS 1p", "Yu Gothic", sans-serif;
  display: block;
  width: 100%;
  height: 40px;
  padding: 10px;
  outline: 0;
  color: #000;
  -webkit-appearance:none;
  font-size: 16.2px;
  font-weight: 100;
  line-height:20px;
  letter-spacing: 1px;
  border-top: hidden;
  border-left: hidden;
  border-right: hidden;
  border: none;
  border-radius: 5px;
  caret-color: #aa0;
  box-shadow: -2px -2px 2px #fff7f7aa inset, 1px 1px 1px 1px #ccaa4422 inset;
}

.InNotFocus {
  background: linear-gradient(335deg, #fff7f4ee, #ffd09911);
}

.InFocused {
  background: linear-gradient(335deg, #fff7f4ee, #ffeedd11);
}

.InIsEdit {
  background: linear-gradient(335deg, #fff7f4ee, #ffeedd55);
  box-shadow: -1px -1px 5px #ffee99aa inset, 1px 1px 1px 1px #ccaa4422 inset;
}

</style>
