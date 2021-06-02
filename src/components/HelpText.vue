<template>
  <div :class="`help-text ${isOpen? 'open-help-text' : ''}`" @focus="handleFocus"
        @focusout="handleFocusOut"
        tabindex="0" v-show="text">
    <div class="question-mark-help-text">?</div>
    <div v-if="isOpen" class="text-help-text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'HelpText',
  props: ["text"],
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;
    },
    handleFocus() {
      this.isOpen = !this.isOpen;
    },
    handleFocusOut() {
      this.isOpen = false;
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.help-text {
  height: 0.9rem;
  width: 0.9rem;
  min-height: 0.9rem;
  min-width: 0.9rem;
  border-radius: 100%;
  /* border: 1px solid currentColor; */
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 0 5px;
  background: #aaa;
  cursor: pointer;
  color: #fff;
  position: relative;
  font-weight: 500;
}

.help-text:hover, .help-text.open-help-text {
  background: #777;
}

.question-mark-help-text {
  text-align: center;
  font-size: 0.7rem;
}

.text-help-text {
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  border: 1px solid #777;
  font-size: 0.8rem;
  font-weight: normal;
  width: 150px;
  color: #fff;
  border-radius: 3px;
  padding: 10px;
  background: #777;
  z-index: 100;
  text-align: left;
}
</style>
