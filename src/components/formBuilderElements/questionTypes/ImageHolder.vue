<template>
  <div>
    <builderInputRow label="Image source" name="image-src">
      <input type="text" name="image-src" v-model="question.src" style="width: 100%"/>
    </builderInputRow>
    <builderInputRow label="Image title" name="image-title">
      <input type="text" name="image-title" v-model="question.title" style="width: 100%"/>
    </builderInputRow>
    <builderInputRow label="Image alt" name="image-alt">
      <input type="text" name="image-alt" v-model="question.alt" style="width: 100%"/>
    </builderInputRow>
  </div>
</template>
<script>
import builderInputRow from "@/components/formBuilderElements/InputRow.vue";
export default {
  name: 'ImageHolder',
  props: ['question'],
  components: {
    builderInputRow
  }
}
</script>
<style lang="stylus" scoped>

</style>