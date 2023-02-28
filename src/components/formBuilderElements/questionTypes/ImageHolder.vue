<template>
  <div>
    <builderInputRow
      label="Image source"
      name="image-src"
    >
      <input
        v-model="question.src"
        type="text"
        name="image-src"
        style="width: 100%"
      >
    </builderInputRow>
    <builderInputRow
      label="Image title"
      name="image-title"
    >
      <input
        v-model="question.title"
        type="text"
        name="image-title"
        style="width: 100%"
      >
    </builderInputRow>
    <builderInputRow
      label="Image alt"
      name="image-alt"
    >
      <input
        v-model="question.alt"
        type="text"
        name="image-alt"
        style="width: 100%"
      >
    </builderInputRow>
  </div>
</template>
<script>
import builderInputRow from "@/components/formBuilderElements/InputRow.vue";
export default {
  name: 'ImageHolder',
  components: {
    builderInputRow
  },
  props: ['question']
}
</script>
<style lang="stylus" scoped>

</style>