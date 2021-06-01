<template>
  <div class="text-field" :class="{subsection: eldata.subsection }"  :id="`form-el-${eldata.name}`">
    <label :for="eldata.name" class="title">{{ eldata.question }}</label>
    <div class="desc" v-if="eldata.description">{{ eldata.description }}</div>
    <div class="input-container">
      <input type="text" :name="eldata.name" :id="eldata.name" v-bind:value="value" v-on:input="$emit('input', $event.target.value)"/>
      <div class="mic"><span class="record-title">Record Audio</span><img src="@/assets/microphone.svg" style="height:1.3rem" alt="Record audio" title="Record audio"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TextField",
  props: ["eldata", "value"],
  data() {
    return {};
  },
  created() {
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

  input[type='text'] {
    display: block;
    width: 100%;
    margin-top: 10px;
    padding: 10px 45px 10px 10px;
    border-radius: 3px;
    box-sizing: border-box;
    background: #f8f8f8;
    border: 1px solid #9d9d9d;
    font-size: 1rem;
  }

  .input-container {
    position: relative;
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
