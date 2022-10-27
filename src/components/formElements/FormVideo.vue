<template>
  <div class="form-video-container">
    <iframe
      width="800"
      height="450"
      :src="'https://www.youtube.com/embed/'+eldata.youtubeId"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  </div>
</template>

<script>
export default {
  name: "FormVideo",
  props: ["eldata", "value"],
  data() {
    return {
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .form-video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
    margin-top: 20px;
  }
  
  .form-video-container iframe {
    max-width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
