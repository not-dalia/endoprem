<template>
  <div
    class="question-section"
    :id="`form-el-${eldata.name}`"
    v-bind:value="value"
    :class="{ subsection: eldata.subsection }"
  >
    <transition name="slide-fade">
      <div v-if="show">
        <div class="title-row">
          <div class="title" v-if="eldata.title">{{ eldata.title }}</div>
          <HelpText :text="eldata.help" :name="eldata.name"/>
        </div>
        <div class="desc" v-if="eldata.description">
          {{ eldata.description }}
        </div>
        <FormElement
          v-for="(q, j) in eldata.questions"
          v-bind:key="`sub-form-el-${j}`"
          :formel="q"
          :subelement="true"
          v-model="result[q.name]"
          :isValid="(isValid) => isElementValid(isValid, q.name)"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import HelpText from "@/components/HelpText.vue";
export default {
  name: "Section",
  props: ["eldata", "value", "isSectionValid"],
  components: {
    FormElement: () => import("@/components/FormElement.vue"),
    HelpText,
  },
  data() {
    return {
      show: true,
      result: this.value || { isSectionValid: false },
      elementsValidation: {},
      isNextRequested: false,
      validationCount: -1,
    };
  },
  watch: {
    result: {
      handler: function (val, oldVal) {
        this.$emit("input", val);
      },
      deep: true,
    },
    validationCount: function (val, oldVal) {
        if (val >= Object.keys(this.elementsValidation).length) {
          let isDataValid = true;
          Object.keys(this.elementsValidation).forEach((key) => {
            isDataValid = isDataValid && this.elementsValidation[key];
          });
          this.result.isSectionValid = isDataValid;
          this.isSectionValid(this.eldata.name, isDataValid);
        }
    },
  },
  created() {
    this.$root.$on("validate", this.requestValidation);
    this.$root.$on("toggleElement", this.toggleShow);
  },
  beforeDestroy() {
    this.$root.$off("validate", this.requestValidation);
    this.$root.$off("toggleElement", this.toggleShow);
  },
  methods: {
    toggleShow: function (data) {
      if (data.element == this.eldata.name) {
        this.show = data.show;
        if (!data.show) {
          this.result = { isSectionValid: true };
          this.isSectionValid(this.eldata.name, true);
        } /* else {
          this.result.isSectionValid = this.isSectionValid;
        } */
      }
    },
    populateValidationObject() {
      let elementsValidation = {};
      this.page[this.currentQuestion].questions &&
        this.page[this.currentQuestion].questions.forEach((element) => {
          if (
            ["separator", "image", "video"].indexOf(element.type) < 0 &&
            element.name
          )
            elementsValidation[element.name] = false;
        });
      this.elementsValidation = elementsValidation;
    },
    isElementValid(isValid, elementName) {
      if (elementName) {
        this.elementsValidation[elementName] = isValid;
        if (this.validationCount < 0) this.validationCount = 0;
        this.validationCount++;
      }
    },
    requestValidation() {
      if (!this.show) { this.isSectionValid(this.eldata.name, true)}
      else this.validationCount = -1;
    }
  },
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
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0s ease;
}

.slide-fade-enter, .slide-fade-leave-to, {
  transform: translateY(-10px);
  opacity: 0;
}

.subsection {
  border: 1px dashed #ccc;
}
</style>
