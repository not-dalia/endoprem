<template>
  <div class="ph-form">
    <form ref="phform" name="pre-health" id="ph-form">
      <!-- <div class="page-num">Page {{currentPage + 1}} of {{formData.length}}</div> -->
      <ProgressBar
        :progress="(currentQuestion / formData[currentPage].length) * 100"
        :totalPages="formData.length - 1"
        :page="currentPage"
      />
      <Page
        :id="`page-${currentPage}`"
        :page="formData[currentPage]"
        v-model="results"
        v-bind:key="currentPage"
        :currentPage="currentPage"
        :current-question="currentQuestion"
        :progressToNext="progressToNext"
      />
      <div class="footer">
        <div
          class="footer-nav"
          style="margin-bottom: 10px; justify-content: flex-end;"
          v-show="!(currentPage > 0 || currentQuestion > 0) && hasSavedResults"
        >
          <div class="btn-container">
            <button
              id="clear-btn"
              ref="clearbtn"
              v-on:click="startFromSave()"
              type="button"
              tabindex="0"
              v-if="!(currentPage > 0 || currentQuestion > 0)"
            >
              <span style="margin-right: 10px;">Continue saved survey</span>
              <i class="fas fa-caret-right"></i>
            </button>
          </div>
        </div>
        <div class="footer-nav">
          <div class="btn-container prev">
            <button
              id="prev-btn"
              ref="prevbtn"
              v-if="(currentPage > 0 || currentQuestion > 0) && !isSubmitted"
              v-on:click="prevPage()"
              type="button"
              tabindex="0"
            >
              <i class="fas fa-caret-left"></i>
              <span style="margin-left: 10px">Back</span>
            </button>
          </div>
                    <div class="btn-container next">
            <button
              id="next-btn"
              ref="nextbtn"
              v-if="
                (currentPage > 0 || currentQuestion > 0) &&
                (currentPage < formData.length - 1 ||
                  currentQuestion < formData[currentPage].length - 1)
              "
              v-on:click="nextPage()"
              tabindex="0"
              type="button"
              :disabled="!enableNext"
            >
              <span style="margin-right: 10px">Next</span>
              <i class="fas fa-caret-right"></i>
            </button>

            <button
              id="next-btn"
              ref="nextbtn"
              v-if="!(currentPage > 0 || currentQuestion > 0)"
              v-on:click="startNew()"
              type="button"
              :disabled="!enableNext"
            >
              <span style="margin-right: 10px">Start new survey</span>
              <i class="fas fa-caret-right"></i>
            </button>

            <button
              id="submit-btn"
              ref="submitbtn"
              v-if="
                (currentPage > 0 || currentQuestion > 0) &&
                !(
                  currentPage < formData.length - 1 ||
                  currentQuestion < formData[currentPage].length - 1
                ) &&
                isSubmitted &&
                submissionId
              "
              v-on:click="downloadCSV()"
              type="button"
              :style="{ marginRight: '10px' }"
            >
              <span>Download CSV</span>
            </button>

            <button
              id="submit-btn"
              ref="submitbtn"
              v-if="
                (currentPage > 0 || currentQuestion > 0) &&
                !(
                  currentPage < formData.length - 1 ||
                  currentQuestion < formData[currentPage].length - 1
                )
              "
              v-on:click="submit()"
              type="button"
              :disabled="!enableNext || isSubmitted"
            >
              <span>{{ isSubmitted ? "Thanks!" : "Submit Answers" }}</span>
            </button>
          </div>
        </div>
        <!-- <div class="page-num">
          Page {{ currentPage + 1 }} of {{ formData.length }}
        </div> -->
      </div>
    </form>
  </div>
</template>

<script>
import Page from "@/components/Page.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import FormData from "@/data/";
import { postSurvey, getDownload } from "@/api.js";

export default {
  name: "PreHealthForm",
  components: {
    Page,
    ProgressBar,
  },
  data() {
    return {
      formData: null,
      originalFormData: null,
      currentPage: 0,
      currentQuestion: 0,
      results: {},
      isSurveyEnd: false,
      // color: "#009688",
      pagesToSkip: [],
      endSurveyLocation: { page: null, question: null },
      enableNext: true,
      hasSavedResults: false,
      isSubmitted: false,
      pdfUrl: null,
      submissionId: 0,
    };
  },
  watch: {
    results: {
      handler: function (val, oldVal) {
        this.saveForm();
      },
      deep: true,
    },
  },
  mounted() {
    this.hasSavedResults =
      !!localStorage.results &&
      Object.keys(JSON.parse(localStorage.results)).length > 0;
    this.originalFormData = FormData.sections;
    // this.color = FormData.color;
    this.formData = JSON.parse(JSON.stringify(this.originalFormData));
  },
  created() {
    this.$root.$on("endSurvey", this.endSurvey);
    this.$root.$on("togglePage", this.togglePage);
  },
  destroyed() {
    this.$root.$off("togglePage", this.togglePage);
    this.$root.$off("endSurvey", this.endSurvey);
  },
  methods: {
    arrayToCsv(data) {
      return data
        .map(
          (row) =>
            row
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
        contentArray.push(finalResults[k])
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
        // localStorage.removeItem("location");
        // localStorage.removeItem("results");
        this.hasSavedResults = false;
        console.log("success");
      }
    },
    base64ToBlob(data, contentType = "", sliceSize = 512) {
      const byteCharacters = atob(data.split(",")[1]);
      const byteArrays = [];

      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += sliceSize
      ) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }
      const blob = new Blob(byteArrays, { type: contentType });
      return blob;
    },
    getAudioObject(arr, obj, key = "audio", tempPath = []) {
      let result = null;
      let path = [...tempPath];
      if (obj instanceof Array) {
        for (var i = 0; i < obj.length; i++) {
          path.push(i);
          result = this.getAudioObject(arr, obj[i], key, path);
          if (result) {
            break;
          }
        }
      } else {
        for (let prop in obj) {
          if (prop == "id") {
            if (obj[(prop, path)] == 1) {
              arr.push(obj);
              return obj;
            }
          }
          if (obj[prop] instanceof Object || obj[prop] instanceof Array) {
            if (obj[prop][key]) {
              arr.push([prop, obj[prop], [...path, prop]]);
            }
            result = this.getAudioObject(arr, obj[prop], key, [...path, prop]);
            if (result) {
              break;
            }
          }
        }
      }
      return result;
    },
    startNew() {
      this.results = {};
      this.nextPage();
    },
    startFromSave() {
      if (localStorage.results) this.results = JSON.parse(localStorage.results);
      if (localStorage.location) {
        let location = JSON.parse(localStorage.location);
        this.currentPage = location.page;
        this.currentQuestion = location.question;
        this.enableNext = true;
      } else this.nextPage();
    },
    saveForm() {
      localStorage.results = JSON.stringify(this.results);
      localStorage.flattenedResults = JSON.stringify(
        this.generateFinalResults(FormData, this.results)
      );
      localStorage.location = JSON.stringify({
        page: this.currentPage,
        question: this.currentQuestion,
      });
    },
    generateFinalResults(questionnaire, results) {
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
    togglePage(data) {
      if (this.pagesToSkip.indexOf(data.page) >= 0) {
        this.pagesToSkip.splice(this.pagesToSkip.indexOf(data.page), 1);
        this.formData.splice(data.page, 0, this.originalFormData[data.page]);
      } else {
        this.pagesToSkip.push(data.page);
        this.formData.splice(data.page, 1);
      }
    },
    nextPage() {
      this.enableNext = false;
      this.$root.$emit("validate");
    },
    progressToNext(canProgress) {
      this.enableNext = true;
      if (!canProgress) {
        return;
      }
      if (
        !(
          this.currentPage < this.formData.length - 1 ||
          this.currentQuestion < this.formData[this.currentPage].length - 1
        )
      )
        return;

      if (
        this.isSurveyEnd &&
        this.currentPage == this.endSurveyLocation.page &&
        this.currentQuestion == this.endSurveyLocation.question
      ) {
        this.currentPage = this.formData.length - 1;
        this.currentQuestion = this.formData[this.currentPage].length - 1;
        return;
      }

      if (this.currentQuestion < this.formData[this.currentPage].length - 1) {
        this.currentQuestion++;
      } else {
        this.currentQuestion = 0;
        this.currentPage++;
      }
      this.scrollToTop();
      localStorage.location = JSON.stringify({
        page: this.currentPage,
        question: this.currentQuestion,
      });
      // if (this.$refs.nextbtn && this.currentPage == 0) this.$refs.nextbtn.focus()
      // if (this.$refs.prevbtn && this.currentPage == this.formData.length - 1) this.$refs.prevbtn.focus()
    },
    prevPage() {
      this.enableNext = true;
      if (!(this.currentPage > 0 || this.currentQuestion > 0)) return;

      if (this.isSurveyEnd && this.currentPage == this.formData.length - 1) {
        this.currentPage = this.endSurveyLocation.page;
        this.currentQuestion = this.endSurveyLocation.question;
        return;
      }

      if (this.currentQuestion > 0) {
        this.currentQuestion--;
      } else {
        this.currentPage--;
        this.currentQuestion = this.formData[this.currentPage].length - 1;
      }
      this.scrollToTop();
      localStorage.location = JSON.stringify({
        page: this.currentPage,
        question: this.currentQuestion,
      });
    },
    endSurvey: function (isSurveyEnd) {
      this.isSurveyEnd = isSurveyEnd;
      this.endSurveyLocation = {
        page: isSurveyEnd ? this.currentPage : null,
        question: isSurveyEnd ? this.currentQuestion : null,
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
    background: slategrey;
    &:hover {
      // background: #607d8b !important;
      background: darken(slategrey, 20%) !important;
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

.footer {
  .footer-nav {
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
  .footer {
    .footer-nav {
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

