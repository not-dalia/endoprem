<template>
  <div>
    <builderInputRow label="Minimum age" name="min-text">
      <input type="number" name="min-text" v-model="question.validationRules.min" style="width: 100%"/>
    </builderInputRow>
    <builderInputRow label="Maxmimum age" name="max-text">
      <input type="number" name="max-text" v-model="question.validationRules.max" style="width: 100%" min="0"/>
    </builderInputRow>
  </div>
</template>
<script>
import builderInputRow from "@/components/formBuilderElements/InputRow.vue";
export default {
  name: 'DateQuestion',
  props: ['question'],
  components: {
    builderInputRow
  }
}
</script>
<style lang="stylus" scoped>

</style>