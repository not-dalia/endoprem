<template>
  <div class="builder-question">
    <div class="order-control-container">
      <div
        class="order-control"
        @click="moveUp"
      >
        🠭
      </div>
      <div
        class="order-control"
        @click="moveDown"
      >
        🠯
      </div>
    </div>
    <div class="question-container">
      <div class="question-title">
        <span
          class="fold-control"
          @click="toggleFold"
        >{{ isFolded ? '[+]' : '[–]' }}</span><span :style="{ color }">Question {{ questionNumber }}</span><span
          v-if="isFolded"
          class="question-type"
        >({{ question.type }})</span><span
          v-if="isFolded && question.name"
          class="question-type"
        >({{ question.name }})</span>
      </div>
      <div
        v-if="isFolded"
        class="folded-question"
      >
        <div class="first-page-title">
          {{ questionText }}
        </div>
        <div
          class="dots-decoration"
          @click="toggleFold"
        >
          ●●●
        </div>
      </div>
      <div
        v-else
        class="question-details"
      >
        <builderInputRow
          label="Question Type"
          name="question-type"
        >
          <select
            v-model="question.type"
            name="question-type"
            style="width: 100%"
          >
            <option
              v-for="questionType in questionTypes"
              :key="`builder-question-type-${questionType}`"
              :value="questionType"
            >
              {{ questionType }}
            </option>
          </select>
        </builderInputRow>
        <builderInputRow
          label="Unique ID"
          name="question-id"
        >
          <input
            v-model="question.name"
            type="text"
            name="question-id"
            style="width: 100%"
          >
        </builderInputRow>
        <builderInputRow
          label="Question Text"
          name="question-text"
        >
          <input
            v-model="question.question"
            type="text"
            name="question-text"
            style="width: 100%"
          >
        </builderInputRow>
        <builderInputRow
          label="Question description"
          name="question-description"
        >
          <textarea
            v-model="question.description"
            name="question-description"
            style="width: 100%"
          />
        </builderInputRow>
        <builderInputRow
          label="Question help"
          name="question-help"
        >
          <textarea
            v-model="question.help"
            name="question-help"
            style="width: 100%"
          />
        </builderInputRow>
        <builderInputRow
          v-if="question.validationRules"
          label="Required"
          name="question-required"
        >
          <input
            v-model="question.validationRules.required"
            type="checkbox"
            name="question-required"
          >
        </builderInputRow>
        <keep-alive>
          <component
            :is="questionComponent"
            :question="question"
          />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import builderInputRow from "@/components/formBuilderElements/InputRow.vue";
const ImageHolder = () => import("@/components/formBuilderElements/questionTypes/ImageHolder.vue")
const VideoHolder = () => import("@/components/formBuilderElements/questionTypes/VideoHolder.vue")
const TextQuestion = () => import("@/components/formBuilderElements/questionTypes/TextQuestion.vue")
const DateQuestion = () => import("@/components/formBuilderElements/questionTypes/DateQuestion.vue")
const NumberQuestion = () => import("@/components/formBuilderElements/questionTypes/NumberQuestion.vue")
const RadioQuestion = () => import("@/components/formBuilderElements/questionTypes/RadioQuestion.vue")
export default {
  name: 'BuilderQuestion',
  components: {
    builderInputRow
  },
  props: ['question', 'color', 'question-number', 'isFolded'],
  data () {
    return {
      questionText: null,
      questionTypes: [
        'date', 'number', 'text', 'long-text', 'radio', 'likert-table', 'likert-bar', 'checkbox', 'image', 'video', 'separator', 'section'
      ]
    }
  },
  computed: {
    questionComponent () {
      switch (this.question.type) {
        case 'image':
          return ImageHolder
        case 'video':
          return VideoHolder
        case 'text': case 'long-text':
          return TextQuestion
        case 'number':
          return NumberQuestion
        case 'date':
          return DateQuestion
        case 'radio': case 'checkbox':
          return RadioQuestion
        default: 
          return ImageHolder
      }
    }
  },
  watch: {
    question: {
      deep: true,
      handler (val) {
        if (!val) return;
        this.questionText = val.question;
      }
    }
  },
  mounted () {
    this.questionText = this.question && this.question.question
    if (!this.question.validationRules) this.question.validationRules = {}
  },
  methods: {
    toggleFold () {
      this.$emit('toggleFold');
    },
    moveUp () {
      this.$emit('moveUp');
    },
    moveDown () {
      this.$emit('moveDown');
    }
  }
}
</script>

<style lang="stylus" scoped>
.builder-question {
  width: 100%;
  text-align: left;
  margin: 20px 0 10px 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  .question-container {
    text-align: left;
    padding: 10px 10px;
    border: 1px solid lightgray;
    border-radius: 3px;
    position: relative;
    flex: 1;
  }

  .order-control-container {
    margin-right: 5px;
    .order-control {
      width: 20px;
      height: 20px;
      line-height: 20px;
      background: gray;
      color: white;
      text-align: center;
      margin-bottom: 2px;
      border-radius: 3px;
      cursor: pointer;
      &:hover {
        background: darkgrey;
      }
    }
  }

  .question-title {
    position: absolute;
    color: grey;
    font-weight: 400;
    top: 0;
    left: 5px;
    background: white;
    transform: translate(0, -50%);
    padding: 0 2px;
    display: flex;
    align-items: center;
  }

  .fold-control {
    margin-right: 5px;
    font-size: smaller;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  .question-type {
    font-size: small;
    margin-left: 5px;
  }

  .folded-question {
    padding: 3px 5px 0 18px;
    .first-page-title {
      font-size: larger;
      font-weight: 400;
      color: grey;
    }
    .dots-decoration {
      color: white;
      background: lightgrey;
      border-radius: 9in;
      padding: 0 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: fit-content;
      cursor:pointer;
      &:hover {
        background: gray;
      }
    }
  }
}
</style>
