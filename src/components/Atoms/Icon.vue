<template>
  <div
    class="IconBase"
  >
    <img
      class="Icon"
      :src="src"
      :style="'width: ' + size + 'px; height: ' + size + 'px;'"
    />
  </div>
</template>
<script>
export default {
  name: 'IconBase',
  props: {
    text: String,
    src: String,
    size: {
      type: Number,
      required: false,
      default: 20
    }
  }
}
</script>
<style scoped>
.IconBase {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #ffffff77;
  padding-top: 7px;
  user-select: none;
}
.Icon {
  display: block;
  padding: 0;
  width: 20px;
  height: 20px;
  margin-left: auto;
  margin-right: auto;
  user-select: none;
}
</style>
