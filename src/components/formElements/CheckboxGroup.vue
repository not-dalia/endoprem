<template>
  <div class="checkbox-group" :class="{subsection: eldata.subsection }" :id="`form-el-${eldata.name}`" v-bind:value="value">
    <label class="title">{{ eldata.question }}</label>
    <div class="desc" v-if="eldata.description">{{ eldata.description }}</div>
    <div class="option-row" :class="{ col: getLength() > 10 }">
      <div
        class="option-col"
        v-for="(option, oi) in eldata.options"
        v-bind:key="`${eldata.name}-option-${oi}`"
        v-on:click="selectOption(oi)"
      >
        <input
          type="checkbox"
          :name="`${eldata.name}-option`"
          :id="`${eldata.name}-option-${oi}`"
          :value="getOptionValue(oi)"
          :checked="selectedOptions.indexOf(getOptionValue(oi)) > -1"
        />
        <div class="checkmark">
          <div class="checked" :style="{background: color}"></div>
        </div>
        <label :for="`${eldata.name}-option-${oi}`" style="pointer-events: none;">{{option.text}}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CheckboxGroup",
  props: ["eldata", "value", "color"],
  data() {
    return {
      today: new Date(),
      selectedOptions: [],
      actionOption: null
    };
  },
  created() {},
  mounted() {
    this.eldata.options.forEach((option, i) => {
      if (option.action) this.actionOption = i+1;
    });
    if (this.value != null) this.selectedOptions = [ ...this.value ]
    this.initialize()
  },
  watch: {
    selectedOptions: {
      handler: function (val, oldVal) {
        this.$emit('input', val);
        this.checkboxChanged(val, oldVal);
      },
      deep: true
    }
  },
  methods: {
    initialize () {
      if (!this.actionOption) return;
      let option = this.eldata.options[this.actionOption-1]
      let action = {
        show: (option.action.onchecked && this.selectedOptions.indexOf(getOptionValue(this.actionOption-1)) > -1 ) || (!option.action.onchecked && this.selectedOptions.indexOf(getOptionValue(this.actionOption-1)) < 0 ),
        element: option.action.name
      }
      this.$root.$emit('toggleElement', action);
    },
    getOptionValue(index) {
      return this.eldata.options[index].value || this.eldata.options[index].text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
    },
    checkboxChanged (val, oldVal) {
      if (!this.actionOption) return;
      let option = this.eldata.options[this.actionOption-1]
      let action = {
        show: (option.action.onchecked && this.selectedOptions.indexOf(getOptionValue(this.actionOption-1)) > -1 ) || (!option.action.onchecked && this.selectedOptions.indexOf(getOptionValue(this.actionOption-1)) < 0 ),
        element: option.action.name
      }
      this.$root.$emit('toggleElement', action);

    },
    getLength() {
      let maxLength = 0;
      this.eldata.options.forEach(n => {
        if (n.text.length > maxLength) {
          maxLength = n.text.length;
        }
      });
      return maxLength;
    },
    selectOption(option) {
      // this.$set(this.selectedOptions, option, !this.selectedOption[option] )
      let selectedOptions = [...this.selectedOptions]
      let optionValue = this.getOptionValue(option)
      let optionIndex = selectedOptions.indexOf(optionValue)
      if (optionIndex > -1) selectedOptions.splice(optionIndex, 1)
      else selectedOptions.push(optionValue)
      this.selectedOptions = [...selectedOptions]
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

.checkbox-group {
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
      position: relative;
      padding: 0.55rem 10px;

      &:hover {
        background: #e4e4e4;
      }

      input[type='checkbox'] {
        opacity: 0;
        position: absolute;
        left: 0.75em;
        top: 0.75em;
      }
      
      .checkmark {
        background: #fff;
        border: 1px solid #707070;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 14px;
        cursor: pointer;
        margin: auto;
        
        .checked {
          width: 0;
          height: 0;
          padding: 0;
          background: $theme-color;
        }
      }

      input[type='checkbox']:checked ~ .checkmark {
        .checked {
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
        margin-left: 2rem;
        cursor: pointer;
        display: inline-block;
        line-height: 1.6;
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
