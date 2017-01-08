export default class Beeper {
  constructor() {
    this.audioCtx = Beeper.buildAudio();
  }

  scheduleTone(toneFrequency, toneLengthMs, startInMs = 0) {
    const oscillator = this.audioCtx.createOscillator();
    oscillator.frequency.value = toneFrequency;
    oscillator.connect(this.audioCtx.destination);

    const audioStartTime = this.audioCtx.currentTime + (startInMs / 1000);
    oscillator.start(audioStartTime);

    const audioStopTime = audioStartTime + (toneLengthMs / 1000);
    oscillator.stop(audioStopTime);
  }

  static buildAudio() {
    // eslint-disable-next-line no-undef
    return new (window.AudioContext || window.webkitAudioContext)();
  }
}
