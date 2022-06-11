import Clock from "./clock";
import Noise from "./noise";
import Animations from "./animations";

class Home {
  constructor() {
    this.clock = null;

    this.initClock();
    this.initNoise();
    this.initAnimations();
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
