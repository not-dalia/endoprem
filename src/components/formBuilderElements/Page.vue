<template>
  <div class="builder-page">
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
    <div class="page-container">
      <div class="page-title">
        <span
          class="fold-control"
          @click="toggleFold"
        >{{ isFolded ? '[+]' : '[–]' }}</span><span :style="{ color }">Page {{ pageNumber + 1 }}</span><span v-if="isFolded"><span
          v-if="page.questions"
          class="question-counts"
        >({{ page.questions.length }} question{{ page.questions.length > 1 ? 's' : '' }})</span><span
          v-else
          class="question-counts"
        >(no questions)</span></span>
      </div>
      <div
        v-if="isFolded"
        class="folded-section"
      >
        <div class="first-page-title">
          {{ pageTitle }}
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
        class="page-details"
      >
        <settingsContainer title="Page details">
          <builderInputRow
            label="Page title"
            name="page-title"
          >
            <input
              v-model="pageTitle"
              type="text"
              name="page-title"
              style="width: 100%"
            >
          </builderInputRow>
          <builderInputRow
            label="Page description"
            name="page-description"
          >
            <textarea
              v-model="pageDescription"
              name="page-description"
              style="width: 100%"
            />
          </builderInputRow>
        </settingsContainer>

        <settingsContainer title="Questions">
          <div
            v-if="page.questions"
            class="section-folding-control"
          >
            <a
              class="fold-button"
              @click="expandAllQuestions"
            >[+] Expand All</a>
            <span>|</span>
            <a
              class="fold-button"
              @click="foldAllQuestions"
            >[–] Fold All</a>
          </div>
          <builderQuestion 
            v-for="(question, i) in page.questions" 
            :key="`builder-question-${i}`" 
            :question="question" 
            :question-number="i + 1" 
            :color="color" 
            :is-folded="questionFolds[i]"
            @toggleFold="() => toggleQuestionFold(i)"
            @moveUp="() => moveQuestionUp(i)"
            @moveDown="() => moveQuestionDown(i)"
          />
        </settingsContainer>
      </div>
    </div>
  </div>
</template>

<script>
import settingsContainer from "@/components/formBuilderElements/SettingsContainer.vue";
import builderInputRow from "@/components/formBuilderElements/InputRow.vue";
import builderQuestion from "@/components/formBuilderElements/Question.vue";

export default {
  name: 'BuilderPage',
  components: {
    settingsContainer,
    builderInputRow,
    builderQuestion
  },
  props: ['page', 'color', 'pageNumber', 'isFolded'],
  data () {
    return {
      pageTitle: null,
      pageDescription: null,
      questionFolds: []
    }
  },
  watch: {
    page: {
      deep: true,
      handler (val) {
        if (!val) return;
        this.pageTitle = val.title;
        this.pageDescription = val.description;
      }
    }
  },
  mounted () {
    this.pageTitle = this.page && this.page.title
    this.pageDescription = this.page && this.page.description
    this.questionFolds =  this.page.questions && this.page.questions.map(() => true)
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
    },
    expandAllQuestions () {
      this.questionFolds = this.questionFolds.map(() => false)
    },
    foldAllQuestions () {
      this.questionFolds = this.questionFolds.map(() => true)
    },
    toggleQuestionFold (i) {
      this.questionFolds[i] = !this.questionFolds[i]
      this.questionFolds = [...this.questionFolds]
    },
    moveQuestionUp (i) {
      if (i == 0 || !this.page.questions) return;
      let questionFolds = [...this.questionFolds];
      this.page.questions.splice(i - 1, 0, this.page.questions.splice(i, 1)[0]);
      questionFolds.splice(i - 1, 0, questionFolds.splice(i, 1)[0]);
      this.questionFolds = questionFolds;
    },
    moveQuestionDown (i) {
      if (i >= this.page.questions.length || !this.page.questions) return;
      let questionFolds = [...this.questionFolds];
      this.page.questions.splice(i + 1, 0, this.page.questions.splice(i, 1)[0]);
      questionFolds.splice(i + 1, 0, questionFolds.splice(i, 1)[0]);
      this.questionFolds = questionFolds;
    }
  }
}
</script>

<style lang="stylus" scoped>
.builder-page {
  width: 100%;
  text-align: left;
  margin: 20px 0 10px 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  .page-container {
    text-align: left;
    padding: 15px 10px 5px 10px;
    border-left: 3px solid lightgray;
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

  .page-title {
    position: absolute;
    color: grey;
    font-weight: 400;
    top: 0;
    left: 5px;
    background: white;
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

  .question-counts {
    font-size: small;
    margin-left: 5px;
  }

  .folded-section {
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

  .section-folding-control {
    text-align: left;
    font-size: smaller;
    margin-top: 5px;
    .fold-button {
      margin: 0 5px;
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        color: darkgrey;
      }
    }
  }
}
</style>
