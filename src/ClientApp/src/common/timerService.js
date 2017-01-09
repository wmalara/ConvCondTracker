import TimeSpan from './timespan';
import Beeper from './beeper';

const beepToneFrequency = 600;
const beepLengthMs = 50;
const beepStartIntervalMs = 200;
const numberOfBeeps = 4;
const timerProbingMs = 50;

export default class TimerService {
  constructor() {
    this.timeSpan = new TimeSpan();
    this.isRunning = false;
    this.timerId = null;
    this.beeper = new Beeper();
    this.progressCallback = null;
  }

  toggleTimer() {
    if (!this.isRunning) {
      this.start();
    } else {
      this.stop();
    }
  }

  start() {
    if (this.isRunning) {
      throw new Error('Timer has already started');
    }

    const startTime = new Date();
    this.timerId = setInterval(() => this.checkTime(startTime), timerProbingMs);
    this.isRunning = true;
  }

  stop() {
    clearInterval(this.timerId);
    this.isRunning = false;
  }

  checkTime(startTime) {
    const timeDiff = new Date() - startTime;
    const timeLeftMs = Math.max(this.timeSpan.totalMilliseconds - timeDiff, 0);

    if (timeLeftMs === 0) {
      this.stop();
      this.playAlarm();
    }

    if (this.progressCallback) {
      this.progressCallback(TimeSpan.fromTotalMilliseconds(timeLeftMs));
    }
  }

  setTime(timeSpan) {
    this.timeSpan = timeSpan;
  }

  setProgressCallback(callback) {
    this.progressCallback = callback;
  }

  playAlarm() {
    for (let i = 0; i < numberOfBeeps; i += 1) {
      this.beeper.scheduleTone(beepToneFrequency, beepLengthMs, i * beepStartIntervalMs);
    }
  }
}
