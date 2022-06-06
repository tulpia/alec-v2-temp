import LocomotiveScroll from "locomotive-scroll";
import Clock from "./clock";

class Home {
  scroll = null;
  clock = null;

  constructor() {
    this.initScroll();
    this.initClock();
  }

  initScroll() {
    this.scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      lerp: 0.075,
    });
  }

  initClock() {
    this.clock = new Clock();
  }
}

export default Home;
