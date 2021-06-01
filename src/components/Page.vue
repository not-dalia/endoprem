<template>
  <div class="page" :value="value" ref="page">
    <div class="section">
      <div class="title" :style="{color: color}">{{page[currentQuestion].title}}</div>
      <!-- <div class="separator"></div> -->
      <div class="description" v-if="page[currentQuestion].description">{{page[currentQuestion].description}}</div>
      <FormElement :id="`form-el-${currentQuestion}-${j}`" v-for="(q, j) in page[currentQuestion].questions" v-bind:key="`form-el-${currentQuestion}-${j}`" :formel="q" v-model="value[q.name]" :color="color"/>
    </div>

    <!-- <div v-for="(section, i) in page" v-bind:key="`section-${i}`" class="section">
      <div class="title">{{section.title}}</div>
      <div class="description" v-if="section.description">{{section.description}}</div>
      <FormElement :id="`form-el-${i}-${j}`" v-for="(q, j) in section.questions" v-bind:key="`form-el-${i}-${j}`" :formel="q" v-model="value[q.name]"/>
    </div> -->
  </div>
</template>

<script>
import formData from '@/data/formData-pre.js'
import FormElement from '@/components/FormElement.vue'
export default {
  name: 'Page',
  props: ['page', 'value', 'currentQuestion', 'color'], 
  components: {
    FormElement
  },
  data () {
    return {
      formData: null, 
      currentPage: 0,
      result: null,
      defaultValues: {}
    }
  },
  mounted () {
    this.formData = formData
    if (this.$attrs.value != null) this.defaultValues = {...this.$attrs.value} 
  },
  watch: {
    currentQuestion: function (val, oldVal) {
      
    },
    defaultValues: {
      handler: function (val, oldVal) {
        this.$emit('input', this.defaultValues)
      },
      deep: true
    }, 
    value: {
      handler: function (val, oldVal) {
        // console.log('result changed to: ' + val)
      },
      deep: true
    }
  },
  methods: {
    
  }
}
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

.page {
  flex: 1 1 auto;
}

.section {
  box-sizing: border-box;
  background white
  padding 20px 50px
  max-width 1000px
  margin 25px auto
  // filter drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.16))
  color: #555;
}

.title {
  font-weight: 500;
  font-size: 1.8rem;
  text-align: left;
  color: #009688;
  margin-bottom: 1rem;
}

.separator {
  height: 1px;
  width: 100%;
  border-top: 2px dashed #607d8b;
  margin: 10px 0;
}

.description {
  font-weight: 300;
  font-size: 1rem;
  text-align: left;
  color: #333;
  margin-bottom: 15px;
  white-space: pre-line;
  line-height: 1.6rem;
}

@media only screen and (max-width: 600px)  {
  .section {
    background white
    padding 15px
    max-width 100%
    margin 25px auto
    // filter drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.16))
    color: #555;
  }
}

</style>
