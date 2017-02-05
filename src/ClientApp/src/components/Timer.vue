<template>
  <div class="timer">
    <div class="timer-leftcontainer">
      <input type="text" class="timer-input form-control" :disabled="isRunning" :value="timeInputValue" @change="updateTimeValue" v-inputmask="maskOptions" />
      <div class="timer-timeleft">{{ timeLeftFormatted }}</div>
    </div>
    <button type="button" class="timer-button btn btn-primary" @click="toggleTimer">{{ buttonText }}</button>
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
        showAlert: true,
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

<style lang="scss">
.timer{
  display: flex;
  /*max-width: 200px;*/
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 5px;

  &-leftcontainer{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 80px;
    flex-basis: 50%;
  }

  &-input{
    font-size: 18px;
    text-align: center;
  }

  &-timeleft{
    font-size: 24px;
  }

  &-button{
    flex-basis: 50%;
    cursor: pointer;
  }
}
</style>
