<template>
  <div
    :id="`form-el-${eldata.name}`"
    class="likert-bar"
    :class="{subsection: eldata.subsection }"
    :value="value"
  >
    <div class="title-row">
      <label class="title">{{ eldata.question }} {{ eldata.validationRules && eldata.validationRules.required? '(*)' : '' }}</label>
      <HelpText
        :text="eldata.help"
        :name="eldata.name"
      />
    </div>
    <div
      v-if="eldata.description"
      class="desc"
    >
      {{ eldata.description }}
    </div>
    <div class="option-row">
      <div
        v-for="(option, oi) in options"
        :key="`${eldata.name}-option-${oi+1}`"
        class="option-cell"
        @click="selectOption(oi)"
      >
        <div class="option-label">
          <input
            :id="`${eldata.name}-option-${oi+1}`"
            type="radio"
            :name="`${eldata.name}-option`"
            :value="option"
            :checked="selectedOption === oi"
          >
          <div
            class="checkmark"
            :class="{ 'check-selected': (selectedOption === oi) ? true : false}"
          >
            <label :for="`${eldata.name}-option-${oi+1}`">{{ option }}</label>
          </div>
        </div> 
      </div>
    </div>
    <div
      v-if="eldata.options.startText || eldata.options.endText"
      class="hint-row"
    >
      <div class="start-text hint-text-container">
        <div class="hint-text">
          {{ eldata.options.startText }}
        </div>
      </div>
      <div class="end-text hint-text-container">
        <div class="hint-text">
          {{ eldata.options.endText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelpText from "@/components/HelpText.vue"
export default {
  name: "LikertBar",
  components: {
    HelpText
  },
  props: ["eldata", "value"],
  data() {
    return {
      selectedOption: null,
      actionOption: null,
      endSurvey: false,
      options: []
    };
  },
  watch: {
    selectedOption: function (val) {
      this.$emit('input', this.options[val]);
    }
  },
  mounted() {
    this.options = []
    for (let i = this.eldata.options.from; i <= this.eldata.options.to; i++) {
      this.options.push(i)
    }
    if (this.value != null) this.selectedOption = this.options.indexOf(this.value)
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.title {
  font-size: 1.1rem;
}

.likert-bar {
  text-align: left;
  padding: 5px 0;
  font-weight: 500;
  color: #555;

  &.subsection {
    padding: 5px 10px;
    font-weight: 300 !important;
  }

  .option-row {
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    width: 100%;
    margin-top: 20px;

    &.col {
      flex-direction: column !important;
      .option-col {
        margin: 5px 0;
      }
    }

    .option-cell {
      background: #f4f4f4;
      line-height: 2.5rem;
      cursor: pointer;
      flex: 1;
      align-items: center;
      justify-content: center;

      .option-label {
        position: relative;
      }

      &:hover {
        background: #e4e4e4;
      }

      input[type='radio'] {
        opacity: 0;
        position: absolute;
        left: 0.75em;
        top: 0.75em;
      }
      
      .checkmark {
        background: #eee;
        border: 1px solid #fff;
        margin: auto;
        cursor: pointer;
        text-align: center;
        
        .check-selected {
          background: $theme-color;
        }
      }

      input[type='radio']:checked ~ .checkmark {
          background: $theme-color;
          label {
            color: white;
          }
      }

      input[type='radio']:focus ~ .checkmark, input[type='radio']:active ~ .checkmark {
        outline: 2px solid #f90;
        outline-offset: -2px;
      }

      label {
        font-weight: 400;
        font-size: 1rem;
        text-align: center;
        color: #333333;
        cursor: pointer;
        display: inline-block;
      }

      .label-desc {
        font-weight: 300;
        font-size: 0.9rem;
        text-align: left;
        color: #333333;
        margin-left: 1.8rem;
        cursor: pointer;
        display: inline-block;
        line-height: 1.1rem;
      }
    }
  }

  .hint-row {
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    width: 100%;
    margin-top: 5px;

    .hint-text-container {
      flex: 1;
      padding: 2px;
      display: flex;

      .hint-text {
        max-width: 150px;
        font-size: 0.9rem;
        font-weight: 400;
      }

      &.start-text {
        text-align: left;
        justify-content: flex-start;
      }

      &.end-text {
        text-align: right;
        justify-content: flex-end;
      }
    }
  }

  .desc {
    font-weight: 300;
    font-size: 1rem;
    text-align: left;
    color: #333333;
    margin-top: 5px;
  }
}
</style>
