import SplitType from "split-type";
import { gsap } from "gsap";
import SectionIndicator from "./section-indicator";

class Animations {
  constructor() {
    this.landing();
  }

  landing() {
    // Animation du titre
    const title = document.querySelector("h1.title");

    // Animation de la section
    const sectionLanding = document.querySelector(
      ".landing .section-indicator"
    );
    const sectionLandingAnimation = new SectionIndicator(sectionLanding);

    setTimeout(() => {
      title.classList.add("is-ready");

      setTimeout(() => {
        sectionLandingAnimation.play();
      }, 100);
    }, 1000);
  }
}

export default Animations;
