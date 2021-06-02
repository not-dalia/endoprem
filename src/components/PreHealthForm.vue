<template>
  <div class="ph-form">
    <form
      ref="phform"
      name="pre-health"
      id="ph-form"
    >
      <!-- <div class="page-num">Page {{currentPage + 1}} of {{formData.length}}</div> -->
      <ProgressBar
        :progress="(currentQuestion / formData[currentPage].length) * 100"
        :totalPages="formData.length - 1"
        :page="currentPage"
        :color="color" 
      />
      <Page
        :id="`page-${currentPage}`"
        :page="formData[currentPage]"
        :color="color"
        v-model="results"
        v-bind:key="currentPage"
        :current-question="currentQuestion"
      />
      <div class="footer">
        <div class="footer-nav">
          <div class="btn-container prev">
            <button
              id="prev-btn"
              ref="prevbtn"
              v-if="currentPage > 0 || currentQuestion > 0"
              v-on:click="prevPage()"
              type="button"
              tabindex="1"
              :style="{background: color}"
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
                currentPage < formData.length - 1 ||
                currentQuestion < formData[currentPage].length - 1
              "
              v-on:click="nextPage()"
              type="button"
              :style="{background: color}"
            >
              <span style="margin-right: 10px">Next</span>
              <i class="fas fa-caret-right"></i>
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
import FormData from "@/data/"

export default {
  name: "PreHealthForm",
  components: {
    Page,
    ProgressBar,
  },
  props: {
    msg: String,
    type: String
  },
  data() {
    return {
      formData: null,
      originalFormData: null,
      currentPage: 0,
      currentQuestion: 0,
      results: {},
      isSurveyEnd: false,
      color: '#009688',
      pagesToSkip: [],
      endSurveyLocation: {page: null, question: null}
    };
  },
  watch: {
    results: {
      handler: function (val, oldVal) {
        console.log(JSON.stringify(val))
      },
      deep: true,
    },
  },
  mounted() {
    switch( this.type ) {
      case "before":
        this.originalFormData = FormData.before.sections
        this.color = FormData.before.color
        break
      case "during":
        this.originalFormData = FormData.during.sections
        this.color = FormData.during.color
        break
      case "after":
        this.originalFormData = FormData.after.sections
        this.color = FormData.after.color
        break
      case "all":
        this.originalFormData = FormData.all.sections
        this.color = FormData.all.color
        break
      default:
        this.originalFormData = FormData.before.sections
        this.color = FormData.before.color
        break
    }
    this.formData = JSON.parse(JSON.stringify(this.originalFormData))
  },
  created () {
    this.$root.$on('endSurvey', this.endSurvey);
    this.$root.$on('togglePage', this.togglePage);

  },
  destroyed () {
    this.$root.$off('togglePage', this.togglePage);
    this.$root.$off('endSurvey', this.endSurvey)
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    togglePage(data) {
      if (this.pagesToSkip.indexOf(data.page) >= 0 ) {
        this.pagesToSkip.splice(this.pagesToSkip.indexOf(data.page), 1)
        this.formData.splice(data.page, 0, this.originalFormData[data.page])
      } else {
        this.pagesToSkip.push(data.page)
        this.formData.splice(data.page, 1)
      }
    },
    nextPage() {
      if (
        !(
          this.currentPage < this.formData.length - 1 ||
          this.currentQuestion < this.formData[this.currentPage].length - 1
        )
      )
        return;
      
      if (this.isSurveyEnd && this.currentPage == this.endSurveyLocation.page && this.currentQuestion == this.endSurveyLocation.question) {
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
      // if (this.$refs.nextbtn && this.currentPage == 0) this.$refs.nextbtn.focus()
      // if (this.$refs.prevbtn && this.currentPage == this.formData.length - 1) this.$refs.prevbtn.focus()
    },
    prevPage() {
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
    },
    endSurvey: function(isSurveyEnd) {
      this.isSurveyEnd = isSurveyEnd
      this.endSurveyLocation = {page: isSurveyEnd ? this.currentPage : null, question: isSurveyEnd ? this.currentQuestion : null}
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

  &:hover {
    background: #607d8b !important;
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
      // padding: 25px 15px;
    }
  }
}
</style>

