<template>
    <div class="section">
        <p>Timer</p>
        <input type="text" :disabled="isRunning" :value="timeInputValue" @change="updateTimeValue" v-inputmask="maskOptions" />
        <div class="btn" @click="toggleTimer">{{ buttonText }}</div>
        <span class="timer-display">{{ timeLeftFormatted }}</span>
    </div>
</template>
<script>
import TimerService from '../common/timerService';
import TimeSpan from '../common/timespan';

export default {
  name: 'timer',
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
    };
  },
  created() {
    this.timerService = new TimerService();
    this.timerService.setTime(this.timeValue);
    this.timerService.setProgressCallback(timeLeft => this.setTimeLeft(timeLeft));
  },
  computed: {
    timeInputValue() {
      return this.timeValue.toString();
    },
    buttonText() {
      return this.isRunning ? 'Stop' : 'Start';
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
  },
};

</script>
