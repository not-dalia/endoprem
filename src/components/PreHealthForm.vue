<template>
  <div class="ph-form">
    <form
      v-if="formData"
      id="ph-form"
      ref="phform"
      name="pre-health"
    >
      <ProgressBar
        :progress="(currentPage / formData[currentSection].length) * 100"
        :total-sections="formData.length - 1"
        :section="currentSection"
      />
      <PageComponent
        :id="`section-${currentSection}`"
        :key="currentSection"
        v-model="results"
        :section="formData[currentSection]"
        :current-section="currentSection"
        :current-page="currentPage"
        :progress-to-next="progressToNext"
      />
      <div class="progress-buttons">
        <div
          v-show="isOnStartingPage && hasSavedResults"
          class="progress-buttons-row"
          style="margin-bottom: 10px; justify-content: flex-end;"
        >
          <div class="btn-container">
            <button
              id="continue-save-btn"
              type="button"
              tabindex="0"
              @click="startFromSave()"
            >
              <span style="margin-right: 10px;">Continue saved survey</span>
              <i class="fas fa-caret-right" />
            </button>
          </div>
        </div>
        <div class="progress-buttons-row">
          <div class="btn-container prev">
            <button
              v-if="!isOnStartingPage && !isSubmitted"
              id="prev-btn"
              ref="prevbtn"
              type="button"
              tabindex="0"
              @click="prevPage()"
            >
              <i class="fas fa-caret-left" />
              <span style="margin-left: 10px">Back</span>
            </button>
          </div>
          <div class="btn-container next">
            <button
              v-if="!isOnStartingPage && !isOnLastPage"
              id="next-btn"
              ref="nextbtn"
              tabindex="0"
              type="button"
              :disabled="!enableNext"
              @click="requestNextPage()"
            >
              <span style="margin-right: 10px">Next</span>
              <i class="fas fa-caret-right" />
            </button>

            <button
              v-if="isOnStartingPage"
              id="start-new-btn"
              type="button"
              :disabled="!enableNext"
              @click="startNew()"
            >
              <span style="margin-right: 10px">Start new survey</span>
              <i class="fas fa-caret-right" />
            </button>

            <button
              v-if="!isOnStartingPage && isOnLastPage && isSubmitted"
              id="submit-btn"
              ref="submitbtn"
              type="button"
              :style="{ marginRight: '10px' }"
              @click="downloadCSV()"
            >
              <span>Download CSV</span>
            </button>
            <button
              v-if="!isOnStartingPage && isOnLastPage"
              id="submit-btn"
              ref="submitbtn"
              type="button"
              :disabled="!enableNext || isSubmitted"
              @click="submit()"
            >
              <span>{{ isSubmitted ? "Thanks!" : "Submit Answers" }}</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import PageComponent from "@/components/PageComponent.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import FormData from "@/data/";
import { /*postSurvey,*/ getDownload } from "@/api.js";

export default {
  name: "PreHealthForm",
  components: {
    PageComponent,
    ProgressBar,
  },
  data() {
    return {
      formData: null,
      originalFormData: null,
      currentSection: 0,
      currentPage: 0,
      results: {},
      isSurveyEnd: false,
      pagesToSkip: [],
      endSurveyLocation: { section: null, page: null },
      enableNext: true,
      hasSavedResults: false,
      isSubmitted: false,
      pdfUrl: null,
      submissionId: 0,
    };
  },
  computed: {
    isOnStartingPage () {
      return this.currentSection === 0 && this.currentPage === 0
    },
    isOnLastPage () {
      return this.currentSection >= this.formData.length - 1 && this.currentPage >= this.formData[this.currentSection].length - 1
    } 
  },
  watch: {
    results: {
      handler: function () {
        this.saveForm();
      },
      deep: true,
    },
  },
  mounted() {
    this.hasSavedResults = !!localStorage.results && Object.keys(JSON.parse(localStorage.results)).length > 0;
    this.formData = FormData.sections;
  },
  created() {
    this.$root.$on("endSurvey", this.endSurvey);
  },
  destroyed() {
    this.$root.$off("endSurvey", this.endSurvey);
  },
  methods: {
    arrayToCsv(data) {
      return data
        .map(
          (row) =>
            row
              .map((v) => (v || ""))
              .map(String) // convert every value to String
              .map((v) => v.replaceAll('"', '""')) // escape double colons
              .map((v) => `"${v}"`) // quote it
              .join(",") // comma-separated
        )
        .join("\r\n"); // rows starting on new lines
    },
    downloadCSV() {
      let finalResults = this.generateFinalResults(FormData, this.results)
      let titleArray = []
      let contentArray = []
      for (let k in finalResults) {
        titleArray.push(k)
      }
      titleArray = titleArray.sort((a, b) => {
        //string locale sort
        // A9 should come before A10
        return a.localeCompare(b, undefined, { numeric: true })
      })
      for (let i = 0; i < titleArray.length; i++) {
        contentArray.push(finalResults[titleArray[i]])
      }

      let content = this.arrayToCsv([titleArray, contentArray])

      var blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
      var url = URL.createObjectURL(blob);

      var pom = document.createElement("a");
      pom.href = url;
      pom.setAttribute("download", `endoprem_${Date.now()}`);
      pom.click();
    },
    downloadCopy() {
      let url = getDownload(
        this.submissionId,
        `${this.results.studyId.code1}${this.results.studyId.code2}${this.results.studyId.code3}`
      );
      window.open(url);
    },
    async submit() {
      console.log("results");
      console.log(JSON.stringify(this.results));

      // TODO: Uncomment when releasing
      /* let isSubmitted = await postSurvey({
        data: JSON.stringify(this.results),
        studyId: `${this.results.studyId.code1}${this.results.studyId.code2}${this.results.studyId.code3}`,
        email: this.results.email,
        sessionId: this.$cookies.get("endoprem_si"),
      }); */
      let isSubmitted = true;
      if (isSubmitted) {
        this.submissionId = isSubmitted;
        this.isSubmitted = true;

        // TODO: Uncomment when releasing
        /* localStorage.removeItem("location");
        localStorage.removeItem("results"); */
        this.hasSavedResults = false;
        console.log("success");
      }
    },
    startNew() {
      this.results = {};
      this.requestNextPage();
    },
    startFromSave() {
      if (localStorage.results) this.results = JSON.parse(localStorage.results);
      if (localStorage.location) {
        let location = JSON.parse(localStorage.location);
        this.currentSection = location.section;
        this.currentPage = location.page;
        this.enableNext = true;
      } 
      else this.requestNextPage();
    },
    saveForm() {
      localStorage.results = JSON.stringify(this.results);
      localStorage.flattenedResults = JSON.stringify(
        this.generateFinalResults(FormData, this.results)
      );
      this.saveCurrentPageToLocalStorage()
    },
    saveCurrentPageToLocalStorage () {
      if (!this.isOnStartingPage) {
        localStorage.location = JSON.stringify({
          section: this.currentSection,
          page: this.currentPage,
        });
      }
    },
    generateFinalResults(questionnaire, results) {
      // Flattens the results into a single level
      let finalResult = {};
      let pages = questionnaire.sections.flat();
      pages.forEach((page) => {
        let questions = page.questions;
        if (!questions) return;
        let questionResults = this.generateResultsFromQuestions(
          questions,
          results,
          true
        );
        finalResult = { ...questionResults, ...finalResult };
      });
      for (let k in finalResult) {
        // execute function questions and replace with resulting values
        if (typeof finalResult[k] === "object" && finalResult[k] !== null) {
          let inputs =
            (finalResult[k].input &&
              finalResult[k].input.map((e) => finalResult[e])) ||
            [];
          try {
            let result =
              finalResult[k].handler && finalResult[k].handler(...inputs);
            finalResult[k] = result || finalResult[k].missingValue;
          } catch (error) {
            console.warn(error);
            finalResult[k] = finalResult[k].missingValue;
          }
        }
      }
      return finalResult;
    },
    generateResultsFromQuestions(questions, results, isPageValid) {
      let finalResult = {};
      questions.forEach((question) => {
        if (
          ["separator", "image", "video"].includes(question.type) ||
          !question.name
        )
          return;
        if (question.type == "section") {
          let sectionResults = this.generateResultsFromQuestions(
            question.questions,
            results[question.name],
            results[question.name] && results[question.name].isSectionValid
          );
          finalResult = { ...finalResult, ...sectionResults };
        } else if (["text", "long-text"].includes(question.type)) {
          finalResult[question.name] =
            (isPageValid &&
              results[question.name] &&
              results[question.name].text) ||
            question.missingValue;
        } else if (["likert-table"].includes(question.type)) {
          for (let k in question.prompts) {
            let prompt = question.prompts[k];
            let questionName = prompt.name || question.name + "_" + k;
            finalResult[questionName] =
              (isPageValid &&
                results[question.name] &&
                results[question.name][prompt.name || k]) ||
              prompt.missingValue ||
              question.missingValue;
          }
        } else if (["function"].includes(question.type)) {
          finalResult[question.name] = (!isPageValid &&
            question.missingValue) || { ...question };
        } else {
          {
            finalResult[question.name] =
              (isPageValid && results[question.name]) || question.missingValue;
          }
        }
      });
      return finalResult;
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    requestNextPage() {
      this.enableNext = false;
      this.$root.$emit("validate");
    },
    progressToNext(canProgress) {
      this.enableNext = true;
      if (!canProgress) {
        return;
      }
      if (this.isOnLastPage)
        return;

      // If a question triggers end of survey, go to last page
      if (
        this.isSurveyEnd &&
        this.currentSection == this.endSurveyLocation.section &&
        this.currentPage == this.endSurveyLocation.page
      ) {
        this.currentSection = this.formData.length - 1;
        this.currentPage = this.formData[this.currentSection].length - 1;
        return;
      }

      if (this.currentPage < this.formData[this.currentSection].length - 1) {
        this.currentPage++;
      } else {
        this.currentPage = 0;
        this.currentSection++;
      }
      this.scrollToTop();
      this.saveCurrentPageToLocalStorage()
    },
    prevPage() {
      this.enableNext = true;
      if (this.isOnStartingPage) return;

      // if a question triggers survey end, pressing Back returns us to that question
      if (this.isSurveyEnd && this.currentSection == this.formData.length - 1) {
        this.currentSection = this.endSurveyLocation.section;
        this.currentPage = this.endSurveyLocation.page;
        return;
      }

      if (this.currentPage > 0) {
        this.currentPage--;
      } else {
        this.currentSection--;
        this.currentPage = this.formData[this.currentSection].length - 1;
      }
      this.scrollToTop();
      this.saveCurrentPageToLocalStorage()
    },
    endSurvey: function (isSurveyEnd) {
      this.isSurveyEnd = isSurveyEnd;
      this.endSurveyLocation = {
        section: isSurveyEnd ? this.currentSection : null,
        page: isSurveyEnd ? this.currentPage : null,
      };
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

.ph-form {
  // color: white
  min-height: 100vh;
}

#ph-form {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 30px 10px;
}

button {
  // box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border: none;
  padding: 14px 30px;
  font-size: 1rem;
  // font-family: canada-type-gibson, Helvetica, Arial, sans-serif;
  border-radius: 50px;
  font-weight: 800;
  cursor: pointer;
  color: white;
  background: $theme-color;

  &#prev-btn {
    background: #6B768A;
    &:hover {
      // background: #607d8b !important;
      background: darken(#6B768A, 20%) !important;
    }
  }

  &:hover {
    // background: #607d8b !important;
    background: darken($theme-color, 20%) !important;
  }

  &:focus, &:active {
    outline: medium solid #f90;
    outline-offset: 2px;
  }

  &:disabled {
    background: #666 !important;
  }
}

.progress-buttons {
  .progress-buttons-row {
    max-width: 1000px;
    padding: 0 35px;
    box-sizing: border-box;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .page-num {
    margin: 10px auto;
  }
}

@media only screen and (max-width: 600px) {
  .progress-buttons {
    .progress-buttons-row {
      max-width: 100%;
      padding: 0 15px;
    }

    button {
      padding: 15px 15px;
      font-size: 0.9rem;
    }
  }
}
</style>

