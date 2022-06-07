class Clock {
  constructor() {
    this.el = document.querySelector(".time");

    this.render();
  }

  getTime() {
    const date = new Date();

    let hours = this.padTime(date.getHours());
    let minutes = this.padTime(date.getMinutes());
    let seconds = this.padTime(date.getSeconds());

    return `${hours}:${minutes}:${seconds}`;
  }

  padTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  render() {
    this.el.textContent = this.getTime();

    requestAnimationFrame(() => this.render());
  }
}

export default Clock;
