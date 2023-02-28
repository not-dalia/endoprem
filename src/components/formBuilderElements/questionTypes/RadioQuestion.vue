<template>
  <div class="builder-question">
    <settingsContainer title="Options">
      <choiceOption
        v-for="(option, i) in question.options"
        :key="`question-option-${i}`"
        :option="option"
      />
    </settingsContainer>
  </div>
</template>
<script>
import ChoiceOption from "@/components/formBuilderElements/ChoiceOption.vue";
import settingsContainer from "@/components/formBuilderElements/SettingsContainer.vue";
export default {
  name: 'RadioQuestion',
  components: {
    ChoiceOption,
    settingsContainer
  },
  props: ['question']
}
</script>
<style lang="stylus" scoped>

</style>