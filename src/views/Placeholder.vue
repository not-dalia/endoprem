<template>
  <div id="placeholder">
    <router-link to="/before">Before the test</router-link><br>
    <router-link to="/during">During the test</router-link><br>
    <router-link to="/after">After the test</router-link><br>
    <router-link to="/all">Combined Form</router-link>
  </div>
</template>

<script>

export default {
  name: 'placeholder',
  components: {
    
  }
}
</script>

<style lang="stylus">
body {
  // background-color #607d8b
  // padding 30px 0
}

#placeholder {
  padding: 30px;
}
@media only screen and (max-width: 600px)  {
  body {
    // background-color #607d8b
    // padding 30px 0
  }
}
</style>
