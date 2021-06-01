<template>
  <div class="radio-group" :class="{subsection: eldata.subsection }" :id="`form-el-${eldata.name}`" v-bind:value="value">
    <label class="title">{{ eldata.question }}</label>
    <div class="desc" v-if="eldata.description">{{ eldata.description }}</div>
    <div class="option-row" :class="{ col: getLength() > 10 }">
      <div
        class="option-col"
        v-for="(option, oi) in eldata.options"
        v-bind:key="`${eldata.name}-option-${oi+1}`"
        v-on:click="selectOption(oi+1)"
      >
        <div class="option-label">
          <input
          type="radio"
          :name="`${eldata.name}-option`"
          :id="`${eldata.name}-option-${oi+1}`"
          :value="oi+1"
          :checked="selectedOption === oi+1"
          />
          <div class="checkmark">
            <div class="checked" :style="{background: color}"></div>
          </div>
          <label :for="`${eldata.name}-option-${oi+1}`">{{option.name}}</label>
        </div> 
        <div class="label-desc" v-if="option.description"> {{option.description}} </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioGroup",
  props: ["eldata", "value", "color"],
  data() {
    return {
      today: new Date(),
      selectedOption: this.value,
      actionOption: null,
      endSurvey: false
    };
  },
  mounted() {
    
    this.eldata.options.forEach((option, i) => {
      if (option.action) this.actionOption = i+1;
    });
    if (this.value != null) this.selectedOption = this.value
    this.initialize()
  },
  watch: {
    selectedOption: function (val, oldVal) {
      this.$emit('input', val);
      this.radioChanged(val, oldVal);
    }
  },
  methods: {
    initialize () {
      if (!this.actionOption) return;
      let option = this.eldata.options[this.actionOption-1]
      let action = {
        show: (option.action.onchecked && this.selectedOption == this.actionOption) || (!option.action.onchecked && this.selectedOption != this.actionOption),
        element: option.action.name
      }
      this.$root.$emit('toggleElement', action);
      this.$root.$emit('endSurvey', false);
    },
    radioChanged (val, oldVal) {
      if (!this.actionOption || (this.actionOption != val && this.actionOption != oldVal)) return;
      let option = this.eldata.options[this.actionOption-1]
      if (option.action.name) {
        let action = {
          show: (option.action.onchecked && this.selectedOption == this.actionOption) || (!option.action.onchecked && this.selectedOption != this.actionOption),
          element: option.action.name
        }
        this.$root.$emit('toggleElement', action);
      }

      if (this.endSurvey) {
        this.endSurvey = false
        this.$root.$emit('endSurvey', false)
      } else if (option.action.type == 'end-survey') {
        this.endSurvey = true
        this.$root.$emit('endSurvey', true)
      }
    },
    getLength() {
      let maxLength = 0;
      this.eldata.options.forEach(n => {
        if (n.name.length > maxLength) {
          maxLength = n.name.length;
        }
      });
      return maxLength;
    },
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

.radio-group {
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
    flex-wrap: wrap;

    &.col {
      flex-direction: column !important;
      .option-col {
        margin: 5px 0;
      }
    }

    .option-col {
      margin: 5px 15px 5px 0;
      background: #f4f4f4;
      line-height: 2.5rem;
      cursor: pointer;
      padding: 0.55rem 15px;

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
        border-radius: 100%;
        background: #fff;
        border: 1px solid #707070;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0.15rem;
        margin: auto;
        cursor: pointer;
        
        .checked {
          width: 0;
          height: 0;
          padding: 0;
        }
      }

      input[type='radio']:checked ~ .checkmark {
        .checked {
          border-radius: 100%;
          background: #009688;
          border: none;
          width: 14px;
          height: 14px;
          position: absolute;
          top: 2px;
          left: 2px;  
        }
      }

      label {
        font-weight: 400;
        font-size: 1rem;
        text-align: left;
        color: #333333;
        margin-left: 1.8rem;
        cursor: pointer;
        display: inline-block;
        line-height: 1.6rem;
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

  .desc {
    font-weight: 300;
    font-size: 1rem;
    text-align: left;
    color: #333333;
    margin-top: 5px;
  }
}
</style>
