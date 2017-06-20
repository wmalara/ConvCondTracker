<template>
  <v-layout row class="metronome">
    <v-flex xs6>
      <v-text-field type="number" class="metronome-bpm form-control" v-model="bpm" min="10" max="480" />
    </v-flex>
    <v-flex xs6>
      <v-btn primary light @click.native="toggleMetronome">
        <v-icon light>{{ isRunning ? "stop" : "play_arrow" }}</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import Beeper from '../common/beeper';

const minuteMs = 60000;
const beepToneFrequency = 500;
const beepLengthMs = 50;

export default {
  name: 'metronome',
  props: {
    volume: Number,
  },
  data() {
    return {
      beeper: null,
      timerWorker: null,
      isRunning: false,
      bpm: 60,
    };
  },
  created() {
    this.beeper = new Beeper();
    this.setupWorker();
    this.updateVolume();
  },
  methods: {
    toggleMetronome() {
      if (!this.isRunning) {
        this.start();
      } else {
        this.stop();
      }
    },
    updateWorkerBpm() {
      this.timerWorker.postMessage({ interval: minuteMs / this.bpm });
    },
    start() {
      this.isRunning = true;
      this.timerWorker.postMessage('start');
    },
    stop() {
      this.isRunning = false;
      this.timerWorker.postMessage('stop');
    },
    beep() {
      this.beeper.scheduleTone(beepToneFrequency, beepLengthMs);
    },
    setupWorker() {
      /*eslint-disable */
      const Worker = require('worker!../common/tickworker.js');
      /*eslint-enable */
      this.timerWorker = new Worker();

      this.timerWorker.onmessage = e => {
        if (e.data === 'tick') {
          this.beep();
        }
      };

      this.updateWorkerBpm();
    },
    updateVolume() {
      this.beeper.setVolumePercent(this.volume);
    },
  },
  watch: {
    bpm() {
      this.updateWorkerBpm();
    },
    volume() {
      this.updateVolume();
    },
  },
};
</script>

<style lang="scss">

</style>
