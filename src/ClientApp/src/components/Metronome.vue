<template>
    <div class="section">
        <p>Metronome</p>
        <input type="number" :value="bpm" @change="updateBpm" min="10" max="480" />
        <div class="btn" @click="toggleMetronome">{{ buttonText }}</div>
    </div>
</template>

<script>
import Beeper from '../common/beeper';

const minuteMs = 60000;
const beepToneFrequency = 500;
const beepLengthMs = 50;

export default {
  name: 'metronome',
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
  },
  computed: {
    buttonText() {
      return this.isRunning ? 'Stop' : 'Start';
    },
  },
  methods: {
    toggleMetronome() {
      if (!this.isRunning) {
        this.start();
      } else {
        this.stop();
      }
    },
    updateBpm(e) {
      this.bpm = e.target.value;
      this.updateWorkerBpm();
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
  },
};
</script>
