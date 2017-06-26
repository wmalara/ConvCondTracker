<template>
  <v-layout row class="timer">
    <v-flex xs6 class="timer-leftcontainer">
      <v-text-field class="timer-input form-control" :disabled="isRunning" :value="timeInputValue" @change.native="updateTimeValue" v-inputmask="maskOptions" />
      <span class="timer-timeleft">{{ timeLeftFormatted }}</span>
    </v-flex>
    <v-flex xs6>
      <v-btn primary light @click.native="toggleTimer">
        <v-icon light>{{ isRunning ? "stop" : "play_arrow" }}</v-icon>
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import TimerService from '../common/timerService';
import TimeSpan from '../common/timespan';
import EventBus from '../common/eventBus';

export default {
  name: 'timer',
  props: {
    volume: Number,
  },
  data() {
    return {
      timerService: null,
      timeValue: TimeSpan.fromTimeParts(0, 2),
      isRunning: false,
      timeLeftFormatted: '',
      maskOptions: {
        mask: '99:99:99',
        placeholder: 'hh:mm:ss',
      },
      showAlert: true,
    };
  },
  created() {
    this.timerService = new TimerService();
    this.timerService.setTime(this.timeValue);
    this.timerService.setProgressCallback(timeLeft => this.setTimeLeft(timeLeft));
    this.updateVolume();

    EventBus.$on('keypress-b', () => this.toggleTimer());
  },
  computed: {
    timeInputValue() {
      return this.timeValue.toString();
    },
  },
  methods: {
    toggleTimer() {
      if (!this.isRunning) {
        this.timerService.start();
      } else {
        this.timerService.stop();
      }
      this.isRunning = !this.isRunning;
    },
    updateTimeValue(e) {
      this.timeValue = TimeSpan.parse(e.target.value);
      this.timerService.setTime(this.timeValue);
    },
    setTimeLeft(timeLeft) {
      this.timeLeftFormatted = timeLeft.toString();

      if (timeLeft.totalMilliseconds === 0) {
        this.toggleTimer();
      }
    },
    updateVolume() {
      this.timerService.setVolumePercent(this.volume);
    },
  },
  watch: {
    volume() {
      this.updateVolume();
    },
  },
};

</script>

<style lang="scss">

</style>
