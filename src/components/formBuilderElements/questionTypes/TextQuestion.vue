<template>
  <div>
    <builderInputRow label="Enable recording audio" name="question-canrecordaudio" v-if="question.type == 'long-text'">
      <input type="checkbox" name="question-canrecordaudio" v-model="question.canRecordAudio"/>
    </builderInputRow>
    <builderInputRow label="Minimum text length" name="min-text">
      <input type="number" name="min-text" v-model="question.validationRules.min" style="width: 100%"/>
    </builderInputRow>
    <builderInputRow label="Maxmimum text length" name="max-text">
      <input type="number" name="max-text" v-model="question.validationRules.max" style="width: 100%" min="0"/>
    </builderInputRow>
    <builderInputRow label="Exact text length" name="length-text">
      <input type="number" name="length-text" v-model="question.validationRules.length" style="width: 100%" min="0"/>
    </builderInputRow>
  </div>
</template>
<script>
import builderInputRow from "@/components/formBuilderElements/InputRow.vue";
export default {
  name: 'TextQuestion',
  props: ['question'],
  components: {
    builderInputRow
  }
}
</script>
<style lang="stylus" scoped>

</style>