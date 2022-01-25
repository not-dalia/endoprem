<template>
  <div class="form-image-container">
    <img :src="eldata.src" :title="eldata.title" :alt="eldata.alt" class="form-image">
  </div>
</template>

<script>
export default {
  name: "FormImage",
  props: ["eldata", "value"],
  data() {
    return {
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .form-image {
    max-width: 100%;
    margin: 20px 0;
  }
</style>
