import SplitType from "split-type";
import { gsap } from "gsap";
import SectionIndicator from "./section-indicator";
import LocomotiveScroll from "locomotive-scroll";

class Animations {
  constructor() {
    this.scroll = null;

    this.initScroll();
    this.landing();
    this.works();
    this.contact();
  }

  initScroll() {
    this.scroll = new LocomotiveScroll({
      el: document.querySelector("[data-scroll-container]"),
      smooth: true,
      lerp: 0.05,
    });
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

  works() {
    // création de l'animation
    const worksTl = gsap.timeline({ paused: true });
    const worksContainers = document.querySelectorAll(".projects-list li");
    const worksLines = document.querySelectorAll(".projects-list li .line");
    const sectionWorks = document.querySelector(".projects .section-indicator");
    const sectionWorksAnimation = new SectionIndicator(sectionWorks);

    worksTl.fromTo(
      worksContainers,
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        ease: "power4.inOut",
        duration: 0.75,
        stagger: 0.15,
      }
    );
    worksTl.fromTo(
      worksLines,
      {
        width: "0%",
      },
      {
        width: "100%",
        duration: 0.8,
        ease: "expo.inOut",
        stagger: 0.1,
      },
      "-=1"
    );

    // trigger de l'animation au scroll
    this.scroll.on("call", (section) => {
      if (section && section === "works") {
        worksTl.play();

        setTimeout(() => {
          sectionWorksAnimation.play();
        }, 750);
      }
    });
  }

  contact() {
    const contactTl = gsap.timeline({ paused: true });
    const sectionContact = document.querySelector(
      ".contact .section-indicator"
    );
    const sectionContactAnimation = new SectionIndicator(sectionContact);
    const contactTitle = document.querySelector(".contact .title");
    const contactLine = document.querySelector(".contact__infos .line");
    const contactInfos = document.querySelectorAll(".contact__infos li");

    contactTl.fromTo(
      contactLine,
      {
        width: "0%",
      },
      {
        width: "100%",
        duration: 0.75,
        ease: "expo.inOut",
      }
    );
    contactTl.fromTo(
      contactInfos,
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power4.inOut",
      },
      "-=1"
    );

    // trigger de l'animation au scroll
    this.scroll.on("call", (section) => {
      if (section && section === "contact") {
        setTimeout(() => {
          contactTitle.classList.add("is-ready");

          setTimeout(() => {
            contactTl.play();
            sectionContactAnimation.play();
          }, 250);
        }, 300);
      }
    });
  }
}

export default Animations;
