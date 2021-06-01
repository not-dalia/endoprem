<template>
  <div class="form-element" :class="{ 'sub-element' : subelement, 'sub-section': formel.subsection }" :value="value" ref="formElement" >
    <Separator v-if="formel.type==='separator'" />
    <TextField v-if="formel.type==='text'" :eldata="formel" :color="color" v-model="elementValue"/>
    <NumberField v-if="formel.type==='number'" :eldata="formel" :color="color" v-model="elementValue"/>
    <TextArea v-if="formel.type==='long-text'" :eldata="formel" :color="color" v-model="elementValue"/>
    <DateField v-if="formel.type==='date'" :eldata="formel" :color="color" v-model="elementValue"/>
    <RadioGroup v-if="formel.type==='radio'" :eldata="formel" :color="color" v-model="elementValue"/>
    <LikertTable v-if="formel.type==='likert-table'" :eldata="formel" :color="color" v-model="elementValue"/>
    <LikertBar v-if="formel.type==='likert-bar'" :eldata="formel" :color="color" v-model="elementValue"/>
    <CheckboxGroup v-if="formel.type==='checkbox'" :eldata="formel" :color="color" v-model="elementValue"/>
    <Section v-if="formel.type==='section'" :eldata="formel" :color="color" v-model="elementValue"/>
    <FormImage v-if="formel.type==='image'" :eldata="formel" :color="color" v-model="elementValue"/>
    <FormVideo v-if="formel.type==='video'" :eldata="formel" :color="color" v-model="elementValue"/>
  </div>
</template>

<script>
import { Separator, TextField, NumberField, TextArea, DateField, RadioGroup, LikertTable, LikertBar, CheckboxGroup, Section, FormImage, FormVideo } from "@/components/formElements/index.js";
export default {
  name: "FormElement",
  props: ["formel", "subelement", "value", "color"],
  components: {
    Separator,
    TextField,
    NumberField,
    TextArea,
    DateField,
    RadioGroup,
    LikertTable,
    LikertBar,
    CheckboxGroup,
    Section,
    FormImage,
    FormVideo
  },
  data() {
    return {
      elementValue: this.value
    };
  },
  mounted() {
          if (document.querySelector("input"))
        document.querySelector("input").focus();
      else if (document.querySelector("textarea"))
        document.querySelector("textarea").focus();
  },
  methods: {},
  watch: {
    elementValue: {
      handler: function (val, oldVal) {
        this.$emit('input', val)
      },
      deep: true
    },
    value: {
      handler: function (val, oldVal) {
        this.elementValue = val
      },
      deep: true
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.separator {
  height: 1px;
  width: 95%;
  border-top: 2px dashed #607d8b;
  margin: 10px auto;
}

.form-element {
  padding: 5px 20px 1.4rem 20px;
}

.form-element.sub-section {
  margin-top: -1.4rem;
}

.form-element.sub-element {
  padding: 5px 0 10px 0;
}

@media only screen and (max-width: 600px)  {
  .form-element {
    padding: 5px 10px 10px 10px;
  }
}
</style>
