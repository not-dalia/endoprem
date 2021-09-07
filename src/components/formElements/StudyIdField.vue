<template>
  <div class="date-field" :class="{subsection: eldata.subsection }"  :id="`form-el-${eldata.name}`" v-bind:value="value">
    <div class="title-row">
      <label class="title">
        <span>{{ eldata.question }} {{ eldata.validationRules && eldata.validationRules.required? '(*)' : '' }}</span>
      </label>
      <HelpText :text="eldata.help" :name="eldata.name"/>
    </div>

    <div class="desc" v-if="eldata.description">{{ eldata.description }}</div>
    <div class="date-row">
      <div class="date-col">
        <label :for="`${eldata.name}-code1`"></label>
        <input
          type="text"
          maxlength="2"
          placeholder="XX"
          :name="`${eldata.name}-code1`"
          :id="`${eldata.name}-code1`"
          v-model="selectedDate.code1"
          @input="($event) => onCodeInput($event, 'code1')"
          style="width: 2em;"
        />
      </div>
      <div class="date-col">
        <label :for="`${eldata.name}-code2`"></label>
        <input
          type="number"
          placeholder="000000"
          size="6"
          maxlength="6"
          :name="`${eldata.name}-code2`"
          :id="`${eldata.name}-code2`"
          v-model="selectedDate.code2"
          @input="($event) => onCodeInput($event, 'code2')"
          style="width: 6em;"
        />
      </div>
      <div class="date-col">
        <label :for="`${eldata.name}-code3`"></label>
        <input
          type="number"
          placeholder="000000000"
          size="9"
          maxlength="9"
          :name="`${eldata.name}-code3`"
          :id="`${eldata.name}-code3`"
          v-model="selectedDate.code3"
          @input="($event) => onCodeInput($event, 'code3')"
          style="width: 9rem;"
        />
      </div>
    </div>
  </div>
</template>

<script>
import HelpText from "@/components/HelpText.vue"
export default {
  name: "StudyIdField",
  props: ["eldata", "value"],
  components: {
    HelpText
  },
  data() {
    return {
      today: new Date(),
      selectedDate: {
        code1: this.value? this.value.code1 : null,
        code2: this.value? this.value.code2 : null,
        code3: this.value? this.value.code3 : null
      }
    };
  },
  mounted() {
  },
  methods: {
    onCodeInput ($event, codeNum) {
      let element = $event.target
      var maxLen = element.maxLength;
      var currentLen = element.value.length;

      // if (maxLen <= currentLen && codeNum !== 'code3')
      // {
      // this.selectedDate[codeNum] = this.selectedDate[codeNum] && this.selectedDate[codeNum].substr(0, maxLen)
        // this.focusNext(element)
      // }
    },
    focusNext(el) {
      const currentIndex = Array.from(el.form.elements).indexOf(el);
      el.form.elements.item(
        currentIndex < el.form.elements.length - 1 ?
        currentIndex + 1 :
        0
      ).focus();
    }
  }, 
  watch: {
    selectedDate: {
      handler: function (val, oldVal) {
        this.$emit('input', val);
      },
      deep: true
    }, 
    value: {
      handler: function (val, oldVal) {
        if (!val) return;
        this.selectedDate.day = val.day;
        this.selectedDate.month = val.month;
        this.selectedDate.year = val.year;
      },
      deep: true
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

.title-row {
  font-size: 1.1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.title {
  font-size: 1.1rem;
}

.date-field {
  text-align: left;
  padding: 5px 0;
  font-weight: 500;
  color: #555;

  &.subsection {
    padding: 5px 10px;
    font-weight: 300 !important;
  }

  input[type='number'], input[type='text'] {
    display: block;
    min-width: 4rem;
    margin-top: 5px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 3px;
    background: #f8f8f8;
    border: 1px solid #9d9d9d;
    font-size: 1rem;
  }

  .date-row {
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .date-col {
      margin: 5px 15px 5px 0;
      label {
        font-weight: 300;
        font-size: 0.9rem;
        text-align: left;
        color: #333333;
        font-weight: 500;
        margin-top: 10px;
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
