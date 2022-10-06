<template>
  <div>
    <builderInputRow label="Option Text" name="option-text">
      <input type="text" name="option-text" v-model="option.text" style="width: 100%"/>
    </builderInputRow>
    <builderInputRow label="Option value" name="max-text">
      <input type="number" name="max-text" v-model="option.value" style="width: 100%" min="0"/>
    </builderInputRow>
    <builderInputRow label="Action" name="action" v-if="option.action">
      <action :option="option"/>
    </builderInputRow>
  </div>
</template>
<script>
import builderInputRow from "@/components/formBuilderElements/InputRow.vue";
import Action from "@/components/formBuilderElements/Action.vue";
export default {
  name: 'DateQuestion',
  props: ['option'],
  components: {
    builderInputRow,
    Action
  },
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