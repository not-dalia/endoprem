<template>
  <div class="builder-input-row">
    <label :for="name">{{ label }}</label>
    <div class="slot-row">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BuilderInputRow',
  props: ['label', 'name', "color"]
}
</script>

<style lang="stylus" scoped>
  .builder-input-row {
    text-align: left;
    width: 100%;
    margin: 5px 0 10px 0;

    input, textarea, select {
      font-size: 1em;
    }

    textarea {
      resize: vertical;
      height: 50px;
    }

    label {
      margin-bottom: 2px;
      font-weight: 400;
      display: block;
    }

    .slot-row {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 100%;
    }
  }
</style>
