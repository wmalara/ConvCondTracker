<template>
  <div id="app">
    <h1>ConvCond Tracker</h1>
    <timer></timer>
    <metronome></metronome>
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

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

.section {
    padding: 15px;
    border: 1px solid lightgray;
}

.btn {
    display: inline-block;
    padding: 10px 15px;
    border-radius: 5px;
    background-color: cornflowerblue;
    cursor: pointer;
}
</style>
