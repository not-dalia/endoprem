<template>
  <div>
    <builderInputRow label="Action type" name="action-type">
      <select v-model="actionType">
        <option value="none">No Action</option>
        <option value="end-survey">End Survey</option>
        <option value="toggle-section">Toggle Section</option>
      </select>
    </builderInputRow>
    <builderInputRow label="Trigger action when option is" name="action-trigger" v-if="actionType != 'none'">
      <select v-model="option.action.onchecked">
        <option :value="false">Not selected</option>
        <option :value="true">Selected</option>
      </select>
    </builderInputRow>
    <builderInputRow label="Sub-section ID" name="subsection-id" v-if="actionType == 'toggle-section'">
      <input name="subsection-id" type="text" v-model="option.action.name" style="width: 100%"/>
    </builderInputRow>
  </div>
</template>
<script>
import builderInputRow from "@/components/formBuilderElements/InputRow.vue";
export default {
  name: 'DateQuestion',
  props: ['option'],
  components: {
    builderInputRow
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
  },
  data () {
    return {
      actionType: 'none'
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>