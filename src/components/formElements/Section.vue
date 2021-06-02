<template>
  <div class="question-section" :id="`form-el-${eldata.name}`" v-bind:value="value" :class="{subsection: eldata.subsection }">
    <transition name="slide-fade">
      <div v-if="show">
        <div class="title-row">
          <div class="title" v-if="eldata.title">{{eldata.title}}</div>
          <HelpText :text="eldata.help" />
        </div>
        <div class="desc" v-if="eldata.description">{{eldata.description}}</div>
        <FormElement v-for="(q, j) in eldata.questions" v-bind:key="`sub-form-el-${j}`" :formel="q" :subelement="true" v-model="result[q.name]" />
      </div>
    </transition>
  </div>
</template>

<script>
import HelpText from "@/components/HelpText.vue"
export default {
  name: "Section",
  props: ["eldata", "value"],
  components: {
    FormElement: () => import("@/components/FormElement.vue"),
    HelpText
  },
  data() {
    return {
      show: true,
      result: this.value || {}
    };
  },
  watch: {
    result: {
      handler: function(val, oldVal) {
        this.$emit('input', val)
      }, 
      deep: true
    }
  },
  created () {
    this.$root.$on('toggleElement', this.toggleShow);
  },
  beforeDestroy() {
    this.$root.$off('toggleElement', this.toggleShow)
  },
  methods: {
    toggleShow: function(data) {
      if (data.element == this.eldata.name) {
        this.show = data.show
        if (!data.show) {
          this.result = {}
        }
      }
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

.question-section {
  .title {
    text-align: left;
    padding: 5px 0;
    font-weight: 500;
    color: #555;
  }

  .desc {
    font-weight: 300;
    font-size: 1rem;
    text-align: left;
    color: #333333;
    margin-top: 5px;
    white-space: pre-line;
  }
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all 0s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(-10px);
  opacity: 0;
}

.subsection {
  border: 1px dashed #ccc;
}

</style>
