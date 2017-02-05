<template>
  <div id="app" class="container">
    <h1>ConvCond Tracker</h1>
    <div class="row">
      <timer class="col-md-6"></timer>
      <metronome class="col-md-6"></metronome>
    </div>
  </div>
</template>

<script>
import Timer from './components/Timer.vue';
import Metronome from './components/Metronome.vue';

export default {
  name: 'app',
  components: {
    Timer,
    Metronome,
  },
};
</script>

<style lang="scss">

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 20px;
}

</style>
