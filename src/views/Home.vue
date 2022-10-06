<template>
  <div id="home">
    <div class="test-banner">
      <div class="test-banner-text">This is a test version of ENDOPREM</div>
    </div>
    <PreHealthForm />
    <footer>
      <div class="footer-content">
        <div>What goes in a footer?</div>
        <div>
          <router-link to="/privacy">Privacy Policy</router-link>
        </div>
      </div>
    </footer>
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

.test-banner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.test-banner-text {
  color: white;
  background: maroon;
  padding: 2px 10px;
  font-size: 0.9rem;
}

footer {
  padding: 0 20px;
  .footer-content {
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    font-size: 0.9rem;
    color: grey;
    border-top: 1px solid #e4e4e4;
    &>div {
      margin: 0 10px;
    }
  }

}

@media only screen and (max-width: 600px)  {
  body {
    // background-color #607d8b
    // padding 30px 0
  }
}
</style>
