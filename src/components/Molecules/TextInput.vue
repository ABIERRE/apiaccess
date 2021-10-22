<template>
  <div class="TextInput">
    <label
      class="Label"
      :class="{
        focused: state.isFocus,
        notfocus: !state.isFocus,
        isEdit: state.isEdit,
        errLabel: err
      }"
      @click="setFocus"
    >
      {{ label }}
    </label>
    <input
      class="Input"
      :class="{
        InFocused: state.isFocus,
        InNotFocus: !state.isFocus,
        InIsEdit: state.isEdit,
        errInput: err
      }"
      ref="input"
      :type="getType()"
      v-model="inputVal"
      @focus="onFocus"
      @blur="onBlur"
      autocomplete="off"
    />
    <img
      class="eye"
      :src="eye"
      v-show="type === 'password' && state.isShow"
      @mousedown="state.isEye = true"
      @mouseup="state.isEye = false"
    />
  </div>
</template>
<script lang="ts">
import {
  computed,
  reactive,
  ref,
  defineComponent,
  watch
} from 'vue'

import eye from '@/assets/eye.svg'

export default defineComponent({
  name: 'TextInput',
  props: {
    modelValue: String,
    label: String,
    isFail: Boolean,
    type: String,
    err: Boolean,
    isEye: Boolean,
    isShow: Boolean
  },
  setup (props, ctx) {
    const state = reactive({
      isFocus: false,
      isEdit: false,
      isFail: false,
      isEye: false,
      isShow: false
    })

    if (props.type === 'date') state.isFocus = true

    const input = ref()

    const inputVal = computed({
      get (): string | undefined { return props.modelValue },
      set (v): void { ctx.emit('update:modelValue', v) }
    })

    const getType = (): string => {
      if (props.type === 'password') {
        return state.isEye ? 'text' : 'password'
      }
      return 'text'
    }

    if (inputVal.value) state.isFocus = true

    watch(() => inputVal.value, () => {
      if (typeof inputVal.value !== 'string') return
      const len = inputVal.value.length
      state.isShow = len > 0
    })

    return {
      state,
      inputVal,
      input,
      eye,
      getType,
      onFocus: () => {
        console.log('TextInput onFocus')
        state.isFocus = true
        state.isEdit = true
        console.dir(state)
      },
      onBlur: () => {
        console.log('TextInput onBlur')
        state.isEdit = false
        state.isFocus = !!inputVal.value
        console.dir(state)
      },
      setFocus: () => {
        console.log('TextInput setFocus')
        state.isFocus = true
        if (input.value) input.value.focus()
        console.dir(state)
      }
    }
  }
})
</script>
<style scoped>
.TextInput {
  display: inline-block;
  position: relative;
  margin-top: 24px;
  width: 100%;
}

.Label {
  position: absolute;
  display: block;
  width: 0 auto;
  text-align: left;
  line-height: 20px;
  font-size: 11px;
  padding-top: 6px;
  top: -30px;
  left: 0px;
  z-index: 1;
  cursor: text;
  user-select: none;
}

.focused {
  color: #062;
  font-size: 13px;
  letter-spacing: 2px;
  transform: translate(7px,3px);
  transition-property: transform font-size;transition-duration: 0.2s;transition-delay: 0;
  text-shadow: 0 1.36px 1.896px #c4b59daa,0 -2px 1px #fff;
}

.notfocus {
  color: #448866aa;
  letter-spacing: 1px;
  transform: translate(15px,30px);
  transition-property: transform font-size;transition-duration: 0.2s;transition-delay: 0;
}

.isEdit {
  filter: drop-shadow( 0px 0px 2px rgba(234,245,30,.09));
}

.Input {
  font-family: "TsukuARdGothic-Regular", "M PLUS 1p", "Yu Gothic", sans-serif;
  display: block;
  width: 100%;
  height: 30px;
  padding: 14px;
  outline: 0;
  color: #000;
  -webkit-appearance:none;
  font-size: 16px;
  font-weight: 100;
  line-height:20px;
  letter-spacing: 1px;
  border-top: hidden;
  border-left: hidden;
  border-right: hidden;
  border: none;
  border-radius: 5px;
  caret-color: #aa0;
  box-shadow: -2px -2px 2px #f7f7f7aa inset, 1px 1px 1px 1px #cccccc22 inset;
}

.InNotFocus {
  background: linear-gradient(315deg, #fff, #ffffff55);
  padding: 0;
}

.InFocused {
  background: linear-gradient(315deg, #fff, #ffffffaa);
}

.InIsEdit {
  background: #fff;
}

.errLabel {
  color: #700;
}

.errInput {
  filter: drop-shadow( 0px 0px 2px rgba(234,45,30, .29));
}

.eye {
  position: absolute;
  top: 6px;
  right: 10px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

</style>
