<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { uuid } from 'vue-uuid';
export default {
  provide () {
    return {
      getWindowSize: () => this.windowSize
    }
  },
  data () {
    return {
      windowSize: 0,
    }
  },
  mounted () {
    // Enable cookie setting for logging interactions
    if (process.env.VUE_APP_LOG_INTERACTIONS && !this.$cookies.isKey('endoprem_si')) {
      this.$cookies.set('endoprem_si', uuid.v4());
    }
    
    this.handleWindowSizeChange()
    window.addEventListener("resize", this.handleWindowSizeChange);
  },
  beforeDestroy () {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  },
  methods: {
    handleWindowSizeChange () {
      this.windowSize = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    }
  }
}
</script>

<style lang="stylus">
@import '~@/theme/variables.styl';
#app {
  font-family: canada-type-gibson, Helvetica, Arial, sans-serif;
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

:root {
  font-size: 18px;
}

* {
  box-sizing: border-box;
}

html {
  min-height: 100%;
}

body {
  min-height: 100%;
  margin: 0 !important;
}

.title-row {
  font-size: 1.1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}


div:focus, input:focus {
  outline: 2px solid #f90;
  outline-offset: 2px;
}

@media only screen and (max-width: 600px)  {
  .title-row {
    font-size: 1.1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
  }
}
</style>
