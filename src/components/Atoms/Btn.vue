<template>
  <button class="btn">
    <span class="btnText">{{ text }}</span>
   </button>
</template>

<script>
export default {
  name: 'btn',
  props: [
    'text'
  ]
}
</script>
<style scoped>
.btn {
  display: block;
  background: none;
  min-width: 80px;
  height: 40px;
  border-radius: 5px;
  border: none;
  outline: none;
  background: linear-gradient(165deg, #fff, #fafffa);
  padding-left: 10px;
  padding-right: 10px;
  cursor: pointer;
  user-select: none;
  box-shadow: 3px 3px 4px #00000010;
  transition-property: text-shadow box-shadow, background;transition-duration: 0.3s;transition-delay: 0;
}

.btn:hover {
  font-weight: 300;
  box-shadow: 1px 1px 1px #00000010;
  text-shadow:
    rgba(234, 245, 40, .7) 1px 0px 7px,
    rgba(234, 240, 40, .7) -1px 0px 3px,
    rgba(234, 240, 40, .7) 0px 1px 3px,
    rgba(224, 240, 40, .7) -1px 0px 7px;
}

.btn:disabled {
  color: #bbb;
  background: #fafafa;
}

.btn:active {
  outline: none;
  box-shadow: -1px -1px 1px #FFF9F9 inset, 1px 1px 2px 0px #00000018 inset;
}

.btn:focus {
  outline: none;
  /* box-shadow: 2px 2px 3px 0px rgba(0,0,0,0.3) inset; */
}

.btnText {
  display: inline-block;
  text-align: center;
  font-size: 14px;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #063;
  font-weight: 300;
  letter-spacing: 2px;
  text-shadow: 0 -1px 1px #ddd, 1px 1px 1px #fff;
  transition-property: trasform;transition-duration: 0.2s;transition-delay: 0;
}

.btn:active .btnText {
  padding: 1px;
}
</style>
