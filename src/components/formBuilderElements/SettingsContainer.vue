<template>
  <div class="settings-container" :data-title="title" :style="{borderWidth: borderWidth || 1}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "settings-container",
  props: ["title", "border-width"]
}
</script>
<style lang="stylus" scoped>
.settings-container {
  width: 100%;
  padding: 15px 10px 5px 10px;
  border: 1px dashed lightgray;
  margin: 20px 0;
  border-radius: 3px;
  position: relative;
  &:before {
    position: absolute;
    content: attr(data-title);
    top: 0;
    left: 5px;
    transform: translate(0, -50%);
    background: white;
    padding: 0 2px;
    font-weight: bold;
    text-transform: uppercase;
    font-size: smaller;
    color: dimgrey;
  }
}
</style>