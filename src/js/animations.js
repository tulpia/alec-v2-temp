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

    // Animation du header
    const tlHeader = gsap.timeline({ paused: true });
    const headerLogo = document.querySelector("header img");
    const headerTime = document.querySelector("header .time");

    tlHeader.fromTo(
      headerLogo,
      {
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
      }
    );
    tlHeader.fromTo(
      headerTime,
      {
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
      },
      "-=0.4"
    );

    setTimeout(() => {
      title.classList.add("is-ready");

      setTimeout(() => {
        sectionLandingAnimation.play();

        setTimeout(() => {
          tlHeader.play();
        }, 750);
      }, 100);
    }, 1000);
  }
}

export default Animations;
