<template>
  <div
    class="form-element"
    :class="{ 'sub-element': subelement, 'sub-section': formel.subsection }"
    :value="value"
    ref="formElement"
  >
    <div class="error">
      {{ error }}
    </div>
    <Separator v-if="formel.type === 'separator'" />
    <TextField
      v-if="formel.type === 'text'"
      :eldata="formel"
      :color="color"
      v-model="elementValue"
    />
    <NumberField
      v-if="formel.type === 'number'"
      :eldata="formel"
      :color="color"
      v-model="elementValue"
    />
    <TextArea
      v-if="formel.type === 'long-text'"
      :eldata="formel"
      :color="color"
      v-model="elementValue"
    />
    <DateField
      v-if="formel.type === 'date'"
      :eldata="formel"
      :color="color"
      v-model="elementValue"
    />
    <RadioGroup
      v-if="formel.type === 'radio'"
      :eldata="formel"
      :color="color"
      v-model="elementValue"
    />
    <LikertTable
      v-if="formel.type === 'likert-table'"
      :eldata="formel"
      :color="color"
      v-model="elementValue"
    />
    <LikertBar
      v-if="formel.type === 'likert-bar'"
      :eldata="formel"
      :color="color"
      v-model="elementValue"
    />
    <CheckboxGroup
      v-if="formel.type === 'checkbox'"
      :eldata="formel"
      :color="color"
      v-model="elementValue"
    />
    <Section
      v-if="formel.type === 'section'"
      :eldata="formel"
      :color="color"
      v-model="elementValue"
      :isSectionValid="isSectionValid"
    />
    <FormImage
      v-if="formel.type === 'image'"
      :eldata="formel"
      :color="color"
      v-model="elementValue"
    />
    <FormVideo
      v-if="formel.type === 'video'"
      :eldata="formel"
      :color="color"
      v-model="elementValue"
    />
  </div>
</template>

<script>
import { object, string, date, number, array, boolean } from "yup";
import {
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
  FormVideo,
} from "@/components/formElements/index.js";
export default {
  name: "FormElement",
  props: ["formel", "subelement", "value", "color", "isValid"],
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
    FormVideo,
  },
  data() {
    return {
      elementValue: this.value,
      error: "",
      validationSchema: {},
    };
  },
  mounted() {
    if (document.querySelector("input"))
      document.querySelector("input").focus();
    else if (document.querySelector("textarea"))
      document.querySelector("textarea").focus();

    this.buildValidationSchema();
  },
  created(){
    this.$root.$on('validate', this.validate)
  },
  beforeDestroy(){
    this.$root.$off('validate', this.validate)
  },
  methods: {
    async validate() {
      let o = {}
      o[this.formel.name] = this.elementValue
      try {
        if (this.formel.type != 'section') {
          let v = await this.validationSchema.validate(this.elementValue)
          console.log(v)
          this.isValid(true)
          this.error = ""
        } 
      } catch (err) {
        // console.error(err)
        this.error = err.message
        this.isValid(false)
      }
    },
    dateAdd(date, value, type) {
      var d = new Date(date);
      switch (type) {
        case "day":
        case "days":
          return d.setDate(d.getDate() + value);
        case "month":
        case "months":
          return d.getMonth(d.getMonth() + value);
        case "year":
        case "years":
          return d.setFullYear(d.getFullYear() + value);
        default:
          return d;
      }
    },
    isSectionValid(name, value) {
      this.isValid(value);
      this.error = value ? "" : "Section Invalid";
    },
    buildValidationSchema() {
      let validationRules = this.formel.validationRules;
      if (!validationRules) { 
        this.validationSchema = object().nullable();
        return;
      }
      let elementType = this.formel.type;
      let validationSchema = {};
      switch (elementType) {
        case "date":
            validationSchema = object({
              day: number().min(1).max(31),
              month: number().min(1).max(12),
              year: number().transform(value => (isNaN(value) ? undefined : value)).min(validationRules.max? new Date().getFullYear() - validationRules.max : new Date().getFullYear() - 120).max(validationRules.min? new Date().getFullYear() - validationRules.min : new Date().getFullYear())
            })
          break;
        case "text": case "long-text":
          validationSchema = string();
          if (validationRules.required) validationSchema = validationSchema.required();
          else validationSchema = validationSchema.notRequired();
          if (validationRules.min) validationSchema = validationSchema.min(validationRules.min)
          if (validationRules.max) validationSchema = validationSchema.max(validationRules.max)
          if (validationRules.length) validationSchema = validationSchema.length(validationRules.length)
          break;
        case "number":
          validationSchema = number().transform(value => (isNaN(value) ? undefined : value))
          if (validationRules.required) validationSchema = validationSchema.required()
          if (validationRules.min) validationSchema = validationSchema.min(validationRules.min)
          if (validationRules.max) validationSchema = validationSchema.max(validationRules.max)
          if (validationRules.length) validationSchema = validationSchema.length(validationRules.length)
          break;
        case "likert-table":
          validationSchema = array().of(number().transform(value => (isNaN(value) ? 0 : value)).min(0).max(this.formel.options.length))
          if (validationRules.required) {
            validationSchema = validationSchema.required().length(this.formel.prompts.length);
          }
          break;
        case "likert-bar":
          validationSchema = number().transform(value => (isNaN(value) ? -1 : value))
          if (validationRules.required) validationSchema = validationSchema.required()
          if (this.formel.options.from) validationSchema = validationSchema.min(this.formel.options.from)
          if (this.formel.options.to) validationSchema = validationSchema.max(this.formel.options.to)
          break;
        case "radio": case "checkbox":
          validationSchema = string()
          if (validationRules.required) validationSchema = validationSchema.required();
          break;
        case "section":
          validationSchema = object({ isSectionValid: boolean() })
          break;
        default: 
          this.validationSchema = object().nullable();
          break;
      }
      return this.validationSchema = validationSchema;
    },
  },
  watch: {
    elementValue: {
      handler: function (val, oldVal) {
        this.$emit("input", val);
      },
      deep: true,
    },
    value: {
      handler: function (val, oldVal) {
        this.elementValue = val;
      },
      deep: true,
    },
  },
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

.error {
  text-align: left;
  font-size: 0.8rem;
  font-weight: 500;
  color: crimson;
}

@media only screen and (max-width: 600px) {
  .form-element {
    padding: 5px 10px 10px 10px;
  }
}
</style>
