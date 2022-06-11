import { gsap } from "gsap";

class SectionIndicator {
  constructor(el) {
    this.el = el;

    this.timeline();
  }

  timeline() {
    this.tl = gsap.timeline({ paused: true });
    const text = this.el.querySelector(".text");
    const line = this.el.querySelector(".line");

    this.tl.to(line, {
      width: 45,
      duration: 1,
      ease: "expo.inOut",
    });
    this.tl.to(
      text,
      {
        opacity: 1,
        x: 2,
        duration: 0.5,
      },
      "-=.5"
    );
  }

  play() {
    this.tl.play();
  }
}

export default SectionIndicator;
