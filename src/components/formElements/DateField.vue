<template>
  <div class="date-field" :class="{subsection: eldata.subsection }"  :id="`form-el-${eldata.name}`" v-bind:value="value">
    <label class="title">{{ eldata.question }}</label>
    <div class="desc" v-if="eldata.description">{{ eldata.description }}</div>
    <div class="date-row">
      <div class="date-col">
        <label :for="`${eldata.name}-day`">Day</label>
        <input
          type="number"
          size="4"
          :name="`${eldata.name}-day`"
          :id="`${eldata.name}-day`"
          min="1"
          max="31"
          v-model="selectedDate.day"
        />
      </div>
      <div class="date-col">
        <label :for="`${eldata.name}-month`">Month</label>
        <input
          type="number"
          size="4"
          :name="`${eldata.name}-month`"
          :id="`${eldata.name}-month`"
          min="1"
          max="12"
          v-model="selectedDate.month"
        />
      </div>
      <div class="date-col">
        <label :for="`${eldata.name}-year`">Year</label>
        <input
          type="number"
          size="4"
          :name="`${eldata.name}-year`"
          :id="`${eldata.name}-year`"
          min="1900"
          :max="getYear()"
          v-model="selectedDate.year"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DateField",
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
  mounted() {
  },
  methods: {
    getYear() {
      return this.today.getFullYear();
    },
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
