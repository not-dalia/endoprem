<template>
  <div>
    <builderInputRow
      label="Action type"
      name="action-type"
    >
      <select v-model="actionType">
        <option value="none">
          No Action
        </option>
        <option value="end-survey">
          End Survey
        </option>
        <option value="toggle-section">
          Toggle Section
        </option>
      </select>
    </builderInputRow>
    <builderInputRow
      v-if="actionType != 'none'"
      label="Trigger action when option is"
      name="action-trigger"
    >
      <select v-model="option.action.onchecked">
        <option :value="false">
          Not selected
        </option>
        <option :value="true">
          Selected
        </option>
      </select>
    </builderInputRow>
    <builderInputRow
      v-if="actionType == 'toggle-section'"
      label="Sub-section ID"
      name="subsection-id"
    >
      <input
        v-model="option.action.name"
        name="subsection-id"
        type="text"
        style="width: 100%"
      >
    </builderInputRow>
  </div>
</template>
<script>
import builderInputRow from "@/components/formBuilderElements/InputRow.vue";
export default {
  name: 'DateQuestion',
  components: {
    builderInputRow
  },
  props: ['option'],
  data () {
    return {
      actionType: 'none'
    }
  },
  watch: {
    actionType (val, oldVal) {
      if (val == oldVal) return;
      if (val == 'none') this.option.action = null;
      else if (val == 'end-survey') this.option.action = { onchecked: false, type: 'end-survey'};
      else if (val == 'toggle-section') this.option.action = { onchecked: false, type: 'toggle-section'};
    }
  },
  mounted () {
    if (this.option.action.type) this.actionType = this.option.action.type
  }
}
</script>
<style lang="stylus" scoped>

</style>