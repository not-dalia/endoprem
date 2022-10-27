<template>
  <div
    :id="`form-el-${eldata.name}`"
    class="date-field"
    :class="{subsection: eldata.subsection }"
    :value="value"
  >
    <div class="title-row">
      <label class="title">
        <span>{{ eldata.question }} {{ eldata.validationRules && eldata.validationRules.required? '(*)' : '' }}</span>
      </label>
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
    <div class="date-row">
      <div class="date-col">
        <label :for="`${eldata.name}-day`">Day</label>
        <input
          :id="`${eldata.name}-day`"
          v-model="selectedDate.day"
          type="number"
          size="4"
          :name="`${eldata.name}-day`"
          min="1"
          max="31"
        >
      </div>
      <div class="date-col">
        <label :for="`${eldata.name}-month`">Month</label>
        <input
          :id="`${eldata.name}-month`"
          v-model="selectedDate.month"
          type="number"
          size="4"
          :name="`${eldata.name}-month`"
          min="1"
          max="12"
        >
      </div>
      <div class="date-col">
        <label :for="`${eldata.name}-year`">Year</label>
        <input
          :id="`${eldata.name}-year`"
          v-model="selectedDate.year"
          type="number"
          size="4"
          :name="`${eldata.name}-year`"
          min="1900"
          :max="getYear()"
        >
      </div>
    </div>
  </div>
</template>

<script>
import HelpText from "@/components/HelpText.vue"
export default {
  name: "DateField",
  components: {
    HelpText
  },
  props: ["eldata", "value"],
  data() {
    return {
      today: new Date(),
      selectedDate: {
        day: this.value? this.value.day : null,
        month: this.value? this.value.month : null,
        year: this.value? this.value.year : null
      }
    };
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
  },
  mounted() {
  },
  methods: {
    getYear() {
      return this.today.getFullYear();
    },
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

  input[type='number'] {
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
