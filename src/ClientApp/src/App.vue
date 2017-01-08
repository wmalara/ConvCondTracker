<template>
  <div id="app">
    <img src="./assets/logo.png">
    <metronome></metronome>
  </div>
</template>

<script>
import Metronome from './components/Metronome.vue';

export default {
  name: 'app',
  components: {
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
