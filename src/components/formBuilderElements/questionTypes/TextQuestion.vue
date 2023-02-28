<template>
  <div>
    <builderInputRow
      v-if="question.type == 'long-text'"
      label="Enable recording audio"
      name="question-canrecordaudio"
    >
      <input
        v-model="question.canRecordAudio"
        type="checkbox"
        name="question-canrecordaudio"
      >
    </builderInputRow>
    <builderInputRow
      label="Minimum text length"
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
      label="Maxmimum text length"
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
    <builderInputRow
      label="Exact text length"
      name="length-text"
    >
      <input
        v-model="question.validationRules.length"
        type="number"
        name="length-text"
        style="width: 100%"
        min="0"
      >
    </builderInputRow>
  </div>
</template>
<script>
import builderInputRow from "@/components/formBuilderElements/InputRow.vue";
export default {
  name: 'TextQuestion',
  components: {
    builderInputRow
  },
  props: ['question']
}
</script>
<style lang="stylus" scoped>

</style>