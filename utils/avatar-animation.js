import { TimelineMax, Power4, Back } from 'gsap';

// document.getElementById("text-anim").classList.add("o-dp-no");
// document.getElementById("header-box").classList.add("o-op-1");

let avatarBox = null;
let avatarGroup = null;
let headGroup = null;
let eyes = null;

const clearStage = () => {
  const clearTl = new TimelineMax();
  clearTl.set(avatarGroup, { y: 600, opacity: 0 });
  return clearTl;
};

const avatarAnimation = () => {
  const avatarTl = new TimelineMax();

  avatarTl
    .set(avatarBox, { opacity: 1 })
    .to(avatarGroup, 1, {
      y: 230,
      opacity: 1,
      ease: Power4.easeInOut,
    })
    .set(eyes, { opacity: 0 })
    .set(eyes, { opacity: 1 }, '+=0.2')
    .set(eyes, { opacity: 0 }, '+=0.3')
    .set(eyes, { opacity: 1 }, '+=0.2')
    .to(avatarGroup, 1, {
      y: 0,
      opacity: 1,
      ease: Back.easeOut,
      delay: 1,
    })
    .to(headGroup, 1, {
      rotation: 1,
      transformOrigin: 'center center',
      ease: Power4.easeInOut,
    })
    .to(headGroup, 1, {
      rotation: 0,
      transformOrigin: 'center center',
      ease: Power4.easeInOut,
      onComplete: startMoving,
    });

  return avatarTl;

  function startMoving() {
    const blinkingTl = new TimelineMax({ repeat: -1, repeatDelay: 10 });

    blinkingTl
      .set(eyes, { opacity: 0 })
      .set(eyes, { opacity: 1 }, '+=0.2')
      .set(eyes, { opacity: 0 }, '+=2')
      .set(eyes, { opacity: 1 }, '+=0.2');
  }
};

const initDom = () => {
  avatarBox = document.getElementById('avatar-box');
  avatarGroup = document.getElementById('svga-group-wrapper');
  headGroup = document.getElementById('svga-group-head');
  eyes = document.querySelectorAll('.eye');
};

const startAnimation = () => {
  const masterTl = new TimelineMax();
  masterTl.add(clearStage(), 'clearStage').add(avatarAnimation(), 'animAvatar');
};

export { initDom, startAnimation };
