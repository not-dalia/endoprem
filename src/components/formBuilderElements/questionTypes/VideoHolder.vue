<template>
  <div>
    <builderInputRow
      label="Youtube Video ID"
      name="video-id"
    >
      <input
        v-model="question.youtubeId"
        type="text"
        name="video-id"
        style="width: 100%"
      >
    </builderInputRow>
  </div>
</template>
<script>
import builderInputRow from "@/components/formBuilderElements/InputRow.vue";
export default {
  name: 'VideoHolder',
  components: {
    builderInputRow
  },
  props: ['question']
}
</script>
<style lang="stylus" scoped>

</style>