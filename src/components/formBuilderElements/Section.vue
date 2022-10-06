<template>
  <div class="builder-section">
    <div class="order-control-container">
      <div class="order-control" @click="moveUp">🠭</div>
      <div class="order-control" @click="moveDown">🠯</div>
    </div>
    <div class="section-container">
      <div class="section-title">
        <span class="fold-control" @click="toggleFold">{{ isFolded ? '[+]' : '[–]'}}</span><span :style="{ color }">{{sectionTitle}}</span><span class="page-counts">({{section.length}} page{{section.length > 1 ? 's' : ''}})</span>
      </div>
      <div class="folded-section" v-if="isFolded">
        <div class="first-page-title">
          {{ firstPageTitle }}
        </div>
        <div class="dots-decoration" @click="toggleFold">
          ●●●
        </div>
      </div>
      <div class="pages" v-else>
        <div class="section-folding-control">
          <a @click="expandAllPages" class="fold-button">[+] Expand All</a>
          <span>|</span>
          <a @click="foldAllPages" class="fold-button">[–] Fold All</a>
        </div>
        <builderPage 
          v-for="(page, i) in section" 
          v-bind:key="`builder-page-${i}`" 
          :page="page" 
          :pageNumber="i" 
          :color="color"
          :isFolded="pageFolds[i]"
          @toggleFold="() => togglePageFold(i)"
          @moveUp="() => movePageUp(i)"
          @moveDown="() => movePageDown(i)"
        />
      </div>
      
    </div>
  </div>
</template>

<script>
import builderPage from "@/components/formBuilderElements/Page.vue";
export default {
  name: 'builderSection',
  props: ['section', 'color', 'sectionTitle', 'isFolded'],
  components: {
    builderPage
  },
  data () {
    return {
      firstPageTitle: null,
      pageFolds: []
    }
  },
  watch: {
    section: {
      deep: true,
      handler (val) {
        if (!val) return;
        this.firstPageTitle = val[0].title;
      }
    }
  },
  mounted () {
    this.firstPageTitle = this.section && this.section[0].title
    this.pageFolds = this.section.map(() => false)
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
    expandAllPages () {
      this.pageFolds = this.pageFolds.map(() => false)
    },
    foldAllPages () {
      this.pageFolds = this.pageFolds.map(() => true)
    },
    togglePageFold (i) {
      this.pageFolds[i] = !this.pageFolds[i]
      this.pageFolds = [...this.pageFolds]
    },
    movePageUp (i) {
      if (i == 0) return;
      let pageFolds = [...this.pageFolds];
      this.section.splice(i - 1, 0, this.section.splice(i, 1)[0]);
      pageFolds.splice(i - 1, 0, pageFolds.splice(i, 1)[0]);
      this.pageFolds = pageFolds;
    },
    movePageDown (i) {
      if (i >= this.section.length) return;
      let pageFolds = [...this.pageFolds];
      this.section.splice(i + 1, 0, this.section.splice(i, 1)[0]);
      pageFolds.splice(i + 1, 0, pageFolds.splice(i, 1)[0]);
      this.pageFolds = pageFolds;
    }
  }
}
</script>

<style lang="stylus" scoped>
.builder-section {
  width: 100%;
  text-align: left;
  margin: 20px 0 10px 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  .section-container {
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

  .section-title {
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

  .page-counts {
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
