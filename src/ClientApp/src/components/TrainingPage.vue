<template>
  <div>
    <h3>Training</h3>
    <v-layout row wrap>
      <v-flex md6>
        <timer :volume="volume"></timer>
      </v-flex>
      <v-flex md6>
        <metronome :volume="volume"></metronome>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs5 offset-xs6>
        <v-slider prepend-icon="volume_up" dark min="0" max="100" v-model.number="volume"></v-slider>
      </v-flex>
      <v-flex xs1>
        <v-text-field dark v-model.number="volume" type="number"></v-text-field>
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Timer from './Timer.vue';
import Metronome from './Metronome.vue';

export default {
  name: 'training-page',
  components: {
    Timer,
    Metronome,
  },
  data() {
    return {
      volume: 50,
    };
  },
};

</script>

<style lang="scss">

</style>
