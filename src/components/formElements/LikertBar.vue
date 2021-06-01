<template>
  <div class="likert-bar" :class="{subsection: eldata.subsection }" :id="`form-el-${eldata.name}`" v-bind:value="value">
    <label class="title">{{ eldata.question }}</label>
    <div class="desc" v-if="eldata.description">{{ eldata.description }}</div>
    <div class="option-row">
      <div
        class="option-cell"
        v-for="(option, oi) in options"
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
          <div class="checkmark" :style="{ background: (selectedOption === oi+1) ? color : 'inherit' }">
            <label :for="`${eldata.name}-option-${oi+1}`">{{option}}</label>
          </div>
        </div> 
      </div>
    </div>
    <div class="hint-row" v-if="eldata.options.startText || eldata.options.endText">
      <div class="start-text hint-text-container">
        <div class="hint-text">
          {{eldata.options.startText}}
        </div>
      </div>
      <div class="end-text hint-text-container">
        <div class="hint-text">
          {{eldata.options.endText}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LikertBar",
  props: ["eldata", "value", "color"],
  data() {
    return {
      selectedOption: this.value,
      actionOption: null,
      endSurvey: false,
      options: []
    };
  },
  mounted() {
    this.options = []
    for (let i = this.eldata.options.from; i <= this.eldata.options.to; i++) {
      this.options.push(i)
    }
    if (this.value != null) this.selectedOption = this.value
  },
  watch: {
    selectedOption: function (val, oldVal) {
      this.$emit('input', val);
    }
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
      }

      input[type='radio']:checked ~ .checkmark {
          background: #009688;
          label {
            color: white;
          }
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
