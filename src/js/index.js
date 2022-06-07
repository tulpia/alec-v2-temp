import LocomotiveScroll from "locomotive-scroll";
import Clock from "./clock";
import Noise from "./noise";
import Animations from "./animations";

class Home {
  scroll = null;
  clock = null;

  constructor() {
    this.initScroll();
    this.initClock();
    this.initNoise();
    this.initAnimations();
  }

  initScroll() {
    this.scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      lerp: 0.05,
    });
  }

  initClock() {
    this.clock = new Clock();
  }

  initNoise() {
    new Noise();
  }

  initAnimations() {
    new Animations();
  }
}

export default Home;
