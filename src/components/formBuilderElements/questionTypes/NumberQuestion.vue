<template>
  <div>
    <builderInputRow
      label="Minimum value"
      name="min-text"
    >
      <input
        v-model="question.validationRules.min"
        type="number"
        name="min-text"
        style="width: 100%"
      >
    </builderInputRow>
    <builderInputRow
      label="Maxmimum value"
      name="max-text"
    >
      <input
        v-model="question.validationRules.max"
        type="number"
        name="max-text"
        style="width: 100%"
        min="0"
      >
    </builderInputRow>
  </div>
</template>
<script>
import builderInputRow from "@/components/formBuilderElements/InputRow.vue";
export default {
  name: 'NumberQuestion',
  components: {
    builderInputRow
  },
  props: ['question']
}
</script>
<style lang="stylus" scoped>

</style>