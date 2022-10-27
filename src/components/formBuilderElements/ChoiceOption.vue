<template>
  <div>
    <builderInputRow
      label="Option Text"
      name="option-text"
    >
      <input
        v-model="option.text"
        type="text"
        name="option-text"
        style="width: 100%"
      >
    </builderInputRow>
    <builderInputRow
      label="Option value"
      name="max-text"
    >
      <input
        v-model="option.value"
        type="number"
        name="max-text"
        style="width: 100%"
        min="0"
      >
    </builderInputRow>
    <builderInputRow
      v-if="option.action"
      label="Action"
      name="action"
    >
      <action :option="option" />
    </builderInputRow>
  </div>
</template>
<script>
import builderInputRow from "@/components/formBuilderElements/InputRow.vue";
import Action from "@/components/formBuilderElements/Action.vue";
export default {
  name: 'DateQuestion',
  components: {
    builderInputRow,
    Action
  },
  props: ['option'],
  mounted () {
    if (!this.option.action) this.option.action = {}
  },
  created () {
    if (!this.option.action) this.option.action = {}
  }
}
</script>
<style lang="stylus" scoped>

</style>