<template>
  <div
    class="likert-group"
    :class="{ subsection: eldata.subsection }"
    :id="`form-el-${eldata.name}`"
    v-bind:value="value"
  >
    <label class="title">{{ eldata.question }} {{ eldata.validationRules && eldata.validationRules.required? '(*)' : '' }}</label>
    <div class="desc" v-if="eldata.description">{{ eldata.description }}</div>
    <div class="table">
      <div class="table-row radio-group-labels">
        <div class="table-cell empty-cell"></div>
        <div
          class="table-cell radio-group-label"
          v-for="(option, oi) in eldata.options"
          v-bind:key="`${eldata.name}-label-${oi + 1}`"
        >
          {{ option.text || option }}
        </div>
      </div>
      <div
        :class="{collapse: collapse.split(',')[pm] == 'true', 'table-row': true, 'radio-group-data': true}"
        v-for="(prompt, pm) in eldata.prompts"
        v-bind:key="`${eldata.name}-row-${pm + 1}`"
      >
        <div class="table-cell prompt" v-on:click="collapse.split(',')[pm] && toggleExpand(pm)">
          <div class="title-row">
            <div class="prompt-text">
              {{ prompt.prompt || prompt }}
            </div>
              <span>
                <HelpText :text="prompt.help" :name="eldata.name"/>
              </span>
          </div>
          <div class="prompt-collapse">
            <i :class="{fas: true, 'fa-chevron-up': collapse.split(',')[prompt.name || pm] == 'false', 'fa-chevron-down': collapse.split(',')[prompt.name || pm] == 'true'}"></i>
          </div>
        </div>
        <div class="selected-label" v-if="selectedOptions[prompt.name || pm]">
          {{ eldata.options.find(e => ( e.value == selectedOptions[prompt.name || pm]))&&eldata.options.find(e => ( e.value == selectedOptions[prompt.name || pm])).text || eldata.options[selectedOptions[prompt.name || pm]-1]  }}
        </div>
        <div
          class="table-cell radio-group-cell option-cell"
          v-for="(option, oi) in eldata.options"
          v-bind:key="`${eldata.name}-cell-${pm + 1}-${oi + 1}`"
        >
          <div
            class="option-row"
            v-on:click="selectOption(pm, prompt.name || pm, (option.value || (oi + 1)))"
          >
            <input
              type="radio"
              :name="`${eldata.name}-option-${pm + 1}`"
              :id="`${eldata.name}-option-${pm + 1}-${oi + 1}`"
              :value="option.value || (oi + 1)"
              :checked="selectedOptions[prompt.name || pm] == (option.value || (oi + 1))"
              v-on:click="closeExpand(pm)"
            />
            <div class="checkmark">
              <div class="checked"></div>
            </div>
            <label class="likert-labels" :for="`${eldata.name}-option-${pm + 1}-${oi + 1}`">{{ option.text || option }}</label>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HelpText from "@/components/HelpText.vue"
export default {
  name: "LikertTable",
  props: ["eldata", "value"],
  components: {
    HelpText
  },
  data() {
    return {
      today: new Date(),
      selectedOptions: this.value || {},
      collapse: '',
      lastChange: 0
    };
  },
  mounted() {
    if (this.value != null) this.selectedOptions = this.value;
    else this.selectedOptions = {}
    var collapse = []
    this.eldata.prompts.forEach(() => collapse.push(false))
    this.collapse = collapse.join(',')
  },
  watch: {
    selectedOptions: {
      handler: function (val, oldVal) {
        this.$emit("input", val);
        // this.$emit("input", Object.keys(val).map(e => this.eldata.options[val[e] -1]&&this.eldata.options[val[e] -1].value || val[e]));
      },
      deep: true
    },
  },
  methods: {
    toggleExpand(row) {
      var collapse = this.collapse.split(',')
      collapse[row] = (collapse[row] == 'true' ? false : true)
      this.collapse = collapse.join(',')
      console.log(this.collapse)
    },
    closeExpand(row) {
      var collapse = this.collapse.split(',')
      collapse[row] = true
      this.collapse = collapse.join(',')
    },
    selectOption(row, key, option) {
      console.log('selecting ' + option)
      let selectedOptions = {...this.selectedOptions}
      selectedOptions[key] = option;
      this.selectedOptions = {...selectedOptions}
      this.closeExpand(row)
    },
  },
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

.likert-group {
  text-align: left;
  padding: 5px 0;
  font-weight: 500;
  color: #555;

  &.subsection {
    padding: 5px 10px;
    font-weight: 300 !important;
  }

  .prompt-collapse {
    display: none;
    color: $theme-color;
  }

  .prompt-text {
    font-weight: 300;
    font-size: 1rem;
    text-align: left;
    color: #333333;
    // margin-left: 1.5rem;
    // cursor: pointer;
    line-height: 1.6;
  }

  .radio-group-label {
    text-align: center;
    font-weight: 400;
    font-size: 0.9rem;
  }

  .table {
    margin-top: 1rem;
    margin-bottom: 1rem;
    display: table;
    table-layout: fixed;
    border-collapse: collapse; 
  }

  .table-row {
    display: table-row;
    border-bottom: 1px solid #ccc;
  }

  .table-row:last-child {
    border-bottom: none;
  }

  .table-cell:first-child {
    border-right: 1px solid #ccc;
  }

  .table-cell {
    display: table-cell;
    width: 2%;
    padding: 10px;
    box-sizing: border-box;
    // border: 1px solid #ccc;
  }

  .table-cell.prompt {
    display: table-cell;
    width: 30%;
  }

  .option-cell {
    text-align: center;
    vertical-align: middle;
  }

  .likert-labels, .selected-label {
    display: none;
  }

  .selected-label {
    color: $theme-color;
  }

  // .collapse {
  //   .option-cell {
  //     display: block;
  //   }
  // }

  .option-row {
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    position: relative;

    input[type='radio'] {
        opacity: 0;
        position: absolute;
        left: 0.75em;
        top: 0.75em;
      }

      .checkmark {
        border-radius: 100%;
        background: #fff;
        border: 1px solid #707070;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        cursor: pointer;

        .checked {
          width: 0;
          height: 0;
          padding: 0;
          background: $theme-color;
        }
      }

      input[type='radio']:checked ~ .checkmark {
        .checked {
          border-radius: 100%;
          background: $theme-color;
          border: none;
          width: 14px;
          height: 14px;
          position: absolute;
          top: 2px;
          left: 2px;
        }
      }

      label {
        font-weight: 300;
        font-size: 1rem;
        text-align: left;
        color: #333333;
        cursor: pointer;
        line-height: 1.6;
      }

    &.col {
      flex-direction: column !important;

      .option-col {
        margin: 5px 0;
      }
    }

    .option-col {
      margin: 5px 15px 5px 0;
      background: #f4f4f4;
      padding: 0 10px;
      line-height: 2.5rem;
      cursor: pointer;
      position: relative;
      padding: 0.55rem 15px;

      &:hover {
        background: #e4e4e4;
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

@media only screen and (max-width: 650px) {
  .table {
    display: block !important;
  }

  .prompt-text {
    font-weight: 400 !important;
  }

  .prompt-collapse {
    display: flex !important;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0.15rem;
    cursor: pointer;
    color: $theme-color;
  }

  .table-row, .table-cell {
    display: block !important;
  }

  .radio-group-labels {
    display: none !important;
  }

  .likert-labels {
    display: inline-block !important;
  }

  .table-row {
    border: none !important;
    border-bottom: 1px solid #ccc !important;
    margin-bottom: 1rem;
  }

  .table-cell {
    width: 100% !important;
    border: none !important;
  }

  .option-cell {
    background: #f4f4f4;
    line-height: 2.5rem;
    cursor: pointer;
    padding: 0.55rem 15px;
    margin: 10px 0;
  }

  .table-cell.prompt {
    position: relative;
    padding-right: 3rem;
    box-sizing: border-box;
  }

  .option-row {
    label {
      font-weight: 400;
      font-size: 1rem;
      text-align: left;
      color: #333;
      margin-left: 1.8rem !important;
      cursor: pointer;
      display: inline-block;
      line-height: 1.6rem;
    }
  }

  .checkmark {
    left: 0.15rem !important;
    right: auto !important;
  }

  .collapse {
    .option-cell {
      display: none !important;
    }

    .selected-label {
      display: block !important;
      font-weight: 500;
      font-size: 0.9rem;
      color: $theme-color;
      padding: 3px 20px 10px 20px;
      // border-bottom: 1px solid #ccc;
      // margin-bottom: 0.5rem;
    }
  }
}
</style>
