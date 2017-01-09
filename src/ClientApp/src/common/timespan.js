import leftPad from './utils';

const msInHour = 3600000;
const msInMinute = 60000;
const msInSecond = 1000;

export default class TimeSpan {
  constructor(totalMilliseconds = 0) {
    this.totalMilliseconds = totalMilliseconds;
  }

  // String has to be in format 'hh:mm:ss.SSS'
  static parse(str) {
    const hStr = str.substr(0, 2);
    const mStr = str.substr(3, 2);
    const sStr = str.substr(6, 2);
    const msStr = str.substr(9, 3);

    const hours = Number(hStr) || 0;
    const minutes = Number(mStr) || 0;
    const seconds = Number(sStr) || 0;
    const milliseconds = Number(msStr) || 0;

    return TimeSpan.fromTimeParts(hours, minutes, seconds, milliseconds);
  }

  static fromTotalMilliseconds(totalMilliseconds) {
    return new TimeSpan(totalMilliseconds);
  }

  static fromTimeParts(hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
    const totalMilliseconds = (hours * msInHour)
                            + (minutes * msInMinute)
                            + (seconds * msInSecond)
                            + milliseconds;

    return new TimeSpan(totalMilliseconds);
  }

  get hours() {
    return Math.floor(this.totalMilliseconds / msInHour);
  }

  get minutes() {
    return Math.floor((this.totalMilliseconds % msInHour) / msInMinute);
  }

  get seconds() {
    return Math.floor((this.totalMilliseconds % msInMinute) / msInSecond);
  }

  get milliseconds() {
    return Math.floor(this.totalMilliseconds % msInSecond);
  }

  toString() {
    const hStr = leftPad(this.hours.toString(), 2, '0');
    const mStr = leftPad(this.minutes.toString(), 2, '0');
    const sStr = leftPad(this.seconds.toString(), 2, '0');
    const msStr = leftPad(this.milliseconds.toString(), 3, '0');

    return `${hStr}:${mStr}:${sStr}.${msStr}`;
  }
}
