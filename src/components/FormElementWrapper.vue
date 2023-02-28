<template>
  <div
    v-if="elementData.type != 'function'"
    ref="elementData"
    class="form-element"
    :class="{ 'sub-element': subelement, 'sub-section': elementData.subsection }"
    :value="value"
    @focusout="handleFocusOut"
  >
    <div class="error">
      {{ error }}
    </div>
    <FormSeparator v-if="elementData.type === 'separator'" />
    <TextField
      v-if="elementData.type === 'text'"
      v-model="elementValue"
      :eldata="elementData"
    />
    <NumberField
      v-if="elementData.type === 'number'"
      v-model="elementValue"
      :eldata="elementData"
    />
    <TextArea
      v-if="elementData.type === 'long-text'"
      v-model="elementValue"
      :eldata="elementData"
    />
    <DateField
      v-if="elementData.type === 'date'"
      v-model="elementValue"
      :eldata="elementData"
    />
    <RadioGroup
      v-if="elementData.type === 'radio'"
      v-model="elementValue"
      :eldata="elementData"
    />
    <LikertTable
      v-if="elementData.type === 'likert-table'"
      v-model="elementValue"
      :eldata="elementData"
    />
    <LikertBar
      v-if="elementData.type === 'likert-bar'"
      v-model="elementValue"
      :eldata="elementData"
    />
    <CheckboxGroup
      v-if="elementData.type === 'checkbox'"
      v-model="elementValue"
      :eldata="elementData"
    />
    <FormSection
      v-if="elementData.type === 'section'"
      v-model="elementValue"
      :eldata="elementData"
      :is-section-valid="isSectionValid"
    />
    <FormImage
      v-if="elementData.type === 'image'"
      v-model="elementValue"
      :eldata="elementData"
    />
    <FormVideo
      v-if="elementData.type === 'video'"
      v-model="elementValue"
      :eldata="elementData"
    />
    <StudyIdField
      v-if="elementData.type === 'studyid'"
      v-model="elementValue"
      :eldata="elementData"
    />
  </div>
</template>

<script>
import epLogger from "@/logger.js"
import { object, string, number, array, boolean } from "yup";
import {
  FormSeparator,
  TextField,
  NumberField,
  TextArea,
  DateField,
  RadioGroup,
  LikertTable,
  LikertBar,
  CheckboxGroup,
  FormSection,
  FormImage,
  FormVideo,
  StudyIdField,
} from "@/components/formElements/index.js";
export default {
  name: "FormElementWrapper",
  components: {
    FormSeparator,
    TextField,
    NumberField,
    TextArea,
    DateField,
    RadioGroup,
    LikertTable,
    LikertBar,
    CheckboxGroup,
    FormSection,
    FormImage,
    FormVideo,
    StudyIdField
  },
  props: ["elementData", "subelement", "value", "isValid"],
  data() {
    return {
      elementValue: this.value,
      error: "",
      validationSchema: {},
    };
  },
  watch: {
    elementValue: {
      handler: function (val) {
        this.$emit("input", val);
      },
      deep: true,
    },
    value: {
      handler: function (val) {
        this.elementValue = val;
      },
      deep: true,
    },
  },
  mounted() {
    this.buildValidationSchema();
  },
  created(){
    this.$root.$on('validate', this.validate)
  },
  beforeDestroy(){
    this.$root.$off('validate', this.validate)
  },
  methods: {
    handleFocusOut() {
      epLogger(this.$cookies.get('endoprem_si'), {question: this.elementData.name}, 'question_blur')
    },
    async validate() {
      let o = {}
      o[this.elementData.name] = this.elementValue
      try {
        if (this.elementData.type != 'section') {
          await this.validationSchema.validate(this.elementValue)
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
      let validationRules = this.elementData.validationRules;
      if (!validationRules) { 
        this.validationSchema = object().nullable();
        return;
      }
      let elementType = this.elementData.type;
      let validationSchema = {};
      switch (elementType) {
        case "studyid": {
          let code1 = string().length(2, 'Invalid study ID.')
          let code2 = string().length(6, 'Invalid study ID.')
          let code3 = string().length(9, 'Invalid study ID.')
          if (validationRules.required) {
            code1 = code1.required('Study ID is required.')
            code2 = code2.required('Study ID is required.')
            code3 = code3.required('Study ID is required.')
          }
            validationSchema = object({
              code1,
              code2,
              code3
            })
          break;
        }
        case "date":
            validationSchema = object({
              day: number().transform(value => (isNaN(value) ? undefined : value)).min(1).max(31),
              month: number().transform(value => (isNaN(value) ? undefined : value)).min(1).max(12),
              year: number().transform(value => (isNaN(value) ? undefined : value)).min(validationRules.max? new Date().getFullYear() - validationRules.max : new Date().getFullYear() - 120).max(validationRules.min? new Date().getFullYear() - validationRules.min : new Date().getFullYear())
            })
          break;
        case "text":
          validationSchema = string();
          if (validationRules.required) validationSchema = validationSchema.required();
          else validationSchema = validationSchema.notRequired();
          if (validationRules.min) validationSchema = validationSchema.min(validationRules.min)
          if (validationRules.max) validationSchema = validationSchema.max(validationRules.max)
          if (validationRules.length) validationSchema = validationSchema.length(validationRules.length)
          break;
        case "long-text":
          validationSchema = object({
            text: string().when('audio', ((audio, schema) => {
              if (!audio || audio == "") {
                if (validationRules.min) schema = schema.min(validationRules.min)
                if (validationRules.max) schema = schema.max(validationRules.max)
                if (validationRules.length) schema = schema.length(validationRules.length)
                if (validationRules.required) schema = schema.required();
                else schema = schema.notRequired();
              }
              return schema
            })),
            audio: string().nullable()
          });

          break;
        case "number":
          validationSchema = number().transform(value => (isNaN(value) ? undefined : value))
          if (validationRules.required) validationSchema = validationSchema.required()
          if (validationRules.min) validationSchema = validationSchema.min(validationRules.min)
          if (validationRules.max) validationSchema = validationSchema.max(validationRules.max)
          break;
        case "likert-table":
          validationSchema = array().of(number().transform(value => (isNaN(value) ? 0 : value)).min(0).max(this.elementData.options.length))
          if (validationRules.required) {
            validationSchema = validationSchema.required().length(this.elementData.prompts.length);
          }
          break;
        case "likert-bar":
          validationSchema = number().transform(value => (isNaN(value) ? -1 : value))
          if (validationRules.required) validationSchema = validationSchema.required()
          if (this.elementData.options.from) validationSchema = validationSchema.min(this.elementData.options.from)
          if (this.elementData.options.to) validationSchema = validationSchema.max(this.elementData.options.to)
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
