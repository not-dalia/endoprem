<template>
  <div
    class="progress-bar"
    role="progressbar"
    :aria-valuemin="0"
    :aria-valuenow="getWidth()"
    :aria-valuemax="100"
  >
    <div class="bar-container">
      <div
        class="bar-fill"
        :style="{width: getWidth()}"
      />
      <div
        v-for="i in totalSections"
        :key="`progress-section-${i - 1}`"
        :class="{'section-number': true, done: i - 1 < section}"
        :style="{left: `${(i - 1) * (100 / (totalSections - 1))}%`}"
      >
        <div
          v-if="i != totalSections"
          :aria-current="section == i ? 'step': null"
        >
          {{ i }}
        </div>
        <div v-if="i == totalSections">
          <i class="fas fa-check" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    progress: {
      type: Number,
      required: true
    },
    section: {
      type: Number,
      required: true
    },
    totalSections: {
      type: Number,
      required: true
    },
  },
  methods: {
    getWidth() {
      let width = (this.progress / (this.totalSections - 1)) + ((this.section - 1) * 100/(this.totalSections - 1));
      return `${width}%`
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

  .progress-bar {
    max-width: 1000px;
    padding: 20px 50px;
    width: 100%;
    margin: 0 auto;
  }

  .bar-container {
    width: 100%;
    height: 10px;
    background: #ccc;
    box-sizing: border-box;
    position: relative;
  }

  .bar-fill {
    height: 10px;
    background: $theme-color;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
  }

  .section-number {
    height: 26px;
    width: 26px;
    border-radius: 26px;
    background: #ccc;
    box-sizing: border-box;
    color: #777;
    text-align: center;
    font-size: 16px;
    line-height: 26px;
    font-weight: 500;
    position: absolute;
    top: 0;
    bottom: 0;
    transform: translate(-50%, -8px);

    &.done {
      background: $theme-color;
      color: white;
    }
  }

  @media only screen and (max-width: 600px)  {
  .progress-bar {
    padding 15px 30px
  }
}
  

</style>
