import { select, event } from 'd3-selection';
import { format } from 'd3-format';
import { startAnimation } from './avatar-animation';

const _elemsToAnim = [];

const loop = ($elToTransform, latestKnownScrollY) => {
  const handlerSelection = select('.js-scroll-handler');

  let elToTransformSelection = select($elToTransform);
  const contentWidth = $elToTransform.getBoundingClientRect().width;
  const clientWidth = document.body.clientWidth;

  //Scrollbar width
  //console.log($window.innerWidth - document.body.clientWidth);

  //latestKnownScrollY = $window.scrollY;

  if (!latestKnownScrollY) {
    // The user don't have scroll yet, we show scroll indicator
    select('[data-scroll-indicator]').classed('m-dp-no', false);
  } else {
    select('[data-scroll-indicator]').classed('m-dp-no', true);
  }

  if (latestKnownScrollY > contentWidth - clientWidth) {
    latestKnownScrollY = contentWidth - clientWidth;
  }

  let scaleValue = latestKnownScrollY / (contentWidth - clientWidth);
  handlerSelection.style('transform', `scaleX(${format('.6f')(scaleValue)}`);
  elToTransformSelection.style('transform', `translate3d(${-latestKnownScrollY}px, 0px, 0px)`);

  for (let elem of _elemsToAnim) {
    const position = elem.$el.getBoundingClientRect();
    if (position.x < elem.xTrigger && !elem.triggered) {
      elem.cb();
      elem.triggered = true;
    }
  }
};

// Control click scrolling to element
// Select all link starting by #
const setScroll = $elToTransform => {
  let latestKnownScrollY = 0;
  let ticking = false;

  // Detect request animation frame
  const scroll =
    window.requestAnimationFrame ||
    // IE Fallback
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };

  select(window).on('scroll', function() {
    const $window = select(this).node();
    latestKnownScrollY = $window.scrollY;

    if (!ticking) {
      scroll(() => {
        loop($elToTransform, latestKnownScrollY);
        ticking = false;
      });
    }

    ticking = true;
  });
};

const setElemsToAnim = () => {
  const $avatar = select('[data-trigger-anim="avatar"]').node();
  const $presentationTitle = select('[data-trigger-anim="presentation-title"]').node();
  const $presentationFeatures = select('[data-trigger-anim="presentation-features"]').node();
  const $designTitle = select('[data-trigger-anim="design-title"]').node();
  const $designFeatures = select('[data-trigger-anim="design-features"]').node();
  const $stackTitle = select('[data-trigger-anim="stack-title"]').node();
  const $stackFeatures = select('[data-trigger-anim="stack-features"]').node();
  const $projectTitle = select('[data-trigger-anim="project-title"]').node();
  const $projectFeatures = select('[data-trigger-anim="project-features"]').node();
  const $contactTitle = select('[data-trigger-anim="contact-title"]').node();

  _elemsToAnim.push({
    $el: $avatar,
    xTrigger: document.body.clientWidth / 2,
    cb: () => startAnimation(),
  });

  _elemsToAnim.push({
    $el: $presentationTitle,
    xTrigger: document.body.clientWidth / 2,
    cb: () => {
      $presentationTitle.classList.add('trigger-anim');
    },
  });

  _elemsToAnim.push({
    $el: $presentationFeatures,
    xTrigger: document.body.clientWidth / 2,
    cb: () => {
      $presentationFeatures.classList.add('trigger-anim');
    },
  });

  _elemsToAnim.push({
    $el: $designTitle,
    xTrigger: document.body.clientWidth,
    cb: () => {
      $designTitle.classList.add('trigger-anim');
    },
  });

  _elemsToAnim.push({
    $el: $designFeatures,
    xTrigger: document.body.clientWidth / 2,
    cb: () => {
      $designFeatures.classList.add('trigger-anim');
    },
  });

  _elemsToAnim.push({
    $el: $stackTitle,
    xTrigger: document.body.clientWidth / 2,
    cb: () => {
      $stackTitle.classList.add('trigger-anim');
    },
  });

  _elemsToAnim.push({
    $el: $stackFeatures,
    xTrigger: document.body.clientWidth / 2,
    cb: () => {
      $stackFeatures.classList.add('trigger-anim');
    },
  });

  _elemsToAnim.push({
    $el: $projectTitle,
    xTrigger: document.body.clientWidth / 2,
    cb: () => {
      $projectTitle.classList.add('trigger-anim');
    },
  });

  _elemsToAnim.push({
    $el: $projectFeatures,
    xTrigger: document.body.clientWidth / 2,
    cb: () => {
      $projectFeatures.classList.add('trigger-anim');
    },
  });

  _elemsToAnim.push({
    $el: $contactTitle,
    xTrigger: document.body.clientWidth / 2,
    cb: () => {
      $contactTitle.classList.add('trigger-anim');
    },
  });
};

export { setElemsToAnim, setScroll };
