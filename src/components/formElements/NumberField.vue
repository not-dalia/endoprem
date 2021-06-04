<template>
  <div class="text-field" :class="{subsection: eldata.subsection }"  :id="`form-el-${eldata.name}`">
    <div class="title-row">
      <label :for="eldata.name" class="title">
        <span>{{ eldata.question }} {{ eldata.validationRules && eldata.validationRules.required? '(*)' : '' }}</span>
      
      </label>
      <HelpText :text="eldata.help" />
    </div>
    <div class="desc" v-if="eldata.description">{{ eldata.description }}</div>
    <div class="input-container">
      <input type="number" :name="eldata.name" :id="eldata.name" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" min="0"/>
    </div>
  </div>
</template>

<script>
import HelpText from "@/components/HelpText.vue"
export default {
  name: "TextField",
  props: ["eldata", "value"],
  components: {
    HelpText
  },
  data() {
    return {};
  },
  created() {
  },
  mounted() {
    if (this.value !== '' && this.value !== null) {
      this.$emit('input', this.value)
    }
  },
  methods: {}
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

.text-field {
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
    width: 75px;
    margin-top: 10px;
    padding: 10px 10px 10px 10px;
    border-radius: 3px;
    box-sizing: border-box;
    background: #f8f8f8;
    border: 1px solid #9d9d9d;
    font-size: 1rem;
  }

  .input-container {
    position: relative;
    width: fit-content;
  }

  .mic {
    position: absolute;
    right: 3px;
    top: 0;
    bottom: 0;
    margin: auto;
    height: 36px;
    padding: 5px 8px 5px 8px;
    border-radius: 3px;
    background: #607d8b;
    display: flex;
    flex-direction: row;
    align-items: center; 
    cursor pointer

    .record-title{
      font-size: 0.9rem;
      color: #fff;
      margin: auto 5px;
      display: none;
    }

    &:hover {
      background: #2c3e50;

      .record-title{
        display:inline-block
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
