<template>
  <div id="home">
    <PreHealthForm :type="$route.params.type"/>
  </div>
</template>

<script>
import PreHealthForm from '../components/PreHealthForm.vue'

export default {
  name: 'home',
  components: {
    PreHealthForm
  }
}
</script>

<style lang="stylus">
home {
  // background-color #607d8b
  min-height: 100vh;
}

@media only screen and (max-width: 600px)  {
  body {
    // background-color #607d8b
    // padding 30px 0
  }
}
</style>
