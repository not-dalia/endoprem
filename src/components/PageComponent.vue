<template>
  <div
    ref="page"
    class="page"
    :value="value"
  >
    <div class="section">
      <h1 class="title">
        {{ page.title }}
      </h1>
      <div
        v-if="page.description"
        class="description"
      >
        {{ page.description }}
      </div>
      <FormElementWrapper
        v-for="(question, j) in page.questions"
        :id="`form-el-${currentPage}-${j}`"
        :key="`form-el-${currentPage}-${j}`"
        v-model="value[question.name]"
        :element-data="question"
        :is-valid="(isValid) => isElementValid(isValid, question.name)"
      />
    </div>
  </div>
</template>

<script>
import FormElementWrapper from "@/components/FormElementWrapper.vue";
import epLogger from "@/logger.js";
export default {
  name: "PageComponent",
  components: {
    FormElementWrapper,
  },
  props: {
    section: {
      type: Array,
      required: true
    },
    value: {
      type: Object,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    currentSection: {
      type: Number,
      required: true
    },
    progressToNext: {
      type: Function,
      required: true,
    }
  },
  data() {
    return {
      result: null,
      defaultValues: {},
      isPageValid: false,
      elementsValidation: {},
      isNextRequested: false,
      isDataValid: false,
      validationCount: -1,
    };
  },
  computed: {
    page () {
      return this.section[this.currentPage];
    }
  },
  watch: {
    currentPage: function (val, oldVal) {
      if (val != oldVal) {
        this.populateValidationObject();
        epLogger(
          this.$cookies.get("endoprem_si"),
          { section: this.currentSection, question: val },
          "page_load"
        );
        document.querySelector('body').focus()
      }
    },
    currentSection: function (val, oldVal) {
      if (val != oldVal) {
        this.populateValidationObject();
      }
    },
    isNextRequested: function (val) {
      if (val && Object.keys(this.elementsValidation).length == 0)
        this.progressToNext(true);
    },
    // elementsValidation: {
    validationCount: {
      handler: function (val) {
        if (val >= Object.keys(this.elementsValidation).length) {
          let isDataValid = true;
          Object.keys(this.elementsValidation).forEach((key) => {
            isDataValid = isDataValid && this.elementsValidation[key];
          });
          this.isDataValid = isDataValid;
          if (this.isNextRequested) {
            if (isDataValid) {
              this.isNextRequested = false;
              this.progressToNext(true);
            } else {
              window.scrollTo(0, 0);
              this.isNextRequested = false;
              this.progressToNext(false);
            }
          }
        }
      },
      deep: true,
    },
    defaultValues: {
      handler: function () {
        this.$emit("input", this.defaultValues);
      },
      deep: true,
    },
  },
  mounted() {
    if (this.$attrs.value != null)
      this.defaultValues = { ...this.$attrs.value };
    epLogger(
      this.$cookies.get("endoprem_si"),
      { section: this.currentSection, page: this.currentPage },
      "page_load"
    );
    this.populateValidationObject();
    document.querySelector('body').focus()
  },
  created() {
    this.$root.$on("validate", this.requestNext);
  },
  beforeDestroy() {
    this.$root.$off("validate", this.requestNext);
  },
  methods: {
    populateValidationObject() {
      let elementsValidation = {};
      this.section[this.currentPage].questions &&
        this.section[this.currentPage].questions.forEach((element) => {
          if (
            !["separator", "image", "video"].includes(element.type) &&
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
    requestNext() {
      if (Object.keys(this.elementsValidation).length == 0) {
        this.progressToNext(true);
        this.isNextRequested = false;
        this.validationCount = -1;
      } else {
        this.isNextRequested = true;
        this.validationCount = -1;
      }
    },
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

.page {
  flex: 1 1 auto;
}

.section {
  box-sizing: border-box;
  background: white;
  padding: 20px 50px;
  max-width: 1000px;
  margin: 25px auto;
  // filter drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.16))
  color: #555;
}

.title {
  font-weight: 500;
  font-size: 1.8rem;
  text-align: left;
  color: $theme-color;
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

@media only screen and (max-width: 600px) {
  .section {
    background: white;
    padding: 15px;
    max-width: 100%;
    margin: 25px auto;
    // filter drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.16))
    color: #555;
  }
}
</style>
