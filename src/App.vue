<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="stylus">
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
  // background-color #607d8b
  // padding 30px 0
  min-height: 100%;
  margin: 0 !important;
}

.title-row {
    font-size: 1.1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

@media only screen and (max-width: 600px)  {
  body {
    // background-color #607d8b
    // padding 30px 0
  }

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
