<template>
  <div>
    <builderInputRow label="Youtube Video ID" name="video-id">
      <input type="text" name="video-id" v-model="question.youtubeId" style="width: 100%"/>
    </builderInputRow>
  </div>
</template>
<script>
import builderInputRow from "@/components/formBuilderElements/InputRow.vue";
export default {
  name: 'VideoHolder',
  props: ['question'],
  components: {
    builderInputRow
  }
}
</script>
<style lang="stylus" scoped>

</style>