<template>
  <div id="form-builder">
    <settingsContainer title="Form Settings">
      <builderInputRow label="Form color" name="form-color">
        <input type="text" name="form-color" v-model="formColor">
        <div class="color-display" :style="colorDisplayStyle"></div>
      </builderInputRow>
    </settingsContainer>
    <settingsContainer title="Sections">
      <div class="section-folding-control">
        <a @click="expandAllSections" class="fold-button">[+] Expand All</a>
        <span>|</span>
        <a @click="foldAllSections" class="fold-button">[–] Fold All</a>
      </div>

      <div class="form-sections">
        <builderSection 
          v-for="(section, i) in sections"
          v-bind:key="`builder-section-${i}`"
          :section="section" :section-title="`Section ${i + 1}`"
          :color="formColor" :isFolded="sectionFolds[i]"
          @toggleFold="() => toggleFold(i)"
          @moveUp="() => moveUp(i)"
          @moveDown="() => moveDown(i)"
        />
      </div>
    </settingsContainer>
  </div>
</template>

<script>
import FormData from "@/data/";
import builderInputRow from "@/components/formBuilderElements/InputRow.vue";
import builderSection from "@/components/formBuilderElements/Section.vue";
import settingsContainer from "@/components/formBuilderElements/SettingsContainer.vue";

export default {
  name: 'form-builder',
  components: {
    builderInputRow,
    builderSection,
    settingsContainer
  },
  data () {
    return {
      formColor: '#1c4a81',
      sections: [],
      sectionFolds: []
    }
  },
  mounted () {
    this.formColor = FormData.color || this.formColor
    this.sections = [...FormData.sections] || this.sections
    this.sectionFolds = this.sections.map(() => false)
  },
  computed: {
    colorDisplayStyle() {
      return {
        background: this.formColor || '#1c4a81'
      }
    }
  },
  methods: {
    expandAllSections () {
      this.sectionFolds = this.sectionFolds.map(() => false)
    },
    foldAllSections () {
      this.sectionFolds = this.sectionFolds.map(() => true)
    },
    toggleFold (i) {
      this.sectionFolds[i] = !this.sectionFolds[i]
      this.sectionFolds = [...this.sectionFolds]
    },
    moveUp (i) {
      if (i == 0) return;
      let sections = [...this.sections];
      let sectionFolds = [...this.sectionFolds];
      sections.splice(i - 1, 0, sections.splice(i, 1)[0]);
      sectionFolds.splice(i - 1, 0, sectionFolds.splice(i, 1)[0]);
      this.sections = sections;
      this.sectionFolds = sectionFolds;
    },
    moveDown (i) {
      if (i >= this.sections.length) return;
      let sections = [...this.sections];
      let sectionFolds = [...this.sectionFolds];
      sections.splice(i + 1, 0, sections.splice(i, 1)[0]);
      sectionFolds.splice(i + 1, 0, sectionFolds.splice(i, 1)[0]);
      this.sections = sections;
      this.sectionFolds = sectionFolds;
    }
  }
}
</script>

<style lang="stylus" scoped>
  #form-builder {
    padding: 10px;
    width: 100%;
    font-size: 16px;

    .color-display {
      width: 20px;
      height: 20px;
      margin-left: 5px;
      border-radius: 3px;
    }

    .section-folding-control {
      text-align: left;
      font-size: smaller;
      .fold-button {
        margin: 0 5px;
        text-decoration: underline;
        cursor: pointer;
        &:hover {
          color: darkgrey;
        }
      }
    }

    .form-sections {
      padding: 10px 5px;
    }
  }
</style>
