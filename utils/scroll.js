import { select, selectAll, event } from 'd3-selection';
import { interpolateNumber } from 'd3-interpolate';
import { transition } from 'd3-transition';

const scrollTween = targetPosition => {
  return function() {
    //Save current (starting position)
    let currentPosition = window.pageYOffset || document.documentElement.scrollTop;
    // Create interpolator from current to target position ( = current + relative top position of the element)
    var i = interpolateNumber(currentPosition, currentPosition + targetPosition.top);
    return function(t) {
      // window.scrollTo(currentPosition, i(t));
      window.scrollTo(0, i(t));
    };
  };
};

// Control click scrolling to element
// Select all link starting by #
const setScroll = $elToTransform => {
  let latestKnownScrollY = 0;
  let elToTransformSelection = select($elToTransform);

  select(window).on('scroll', function() {
    const windowSelection = select(this);
    const $window = windowSelection.node();

    const contentWidth = $elToTransform.getBoundingClientRect().width;
    const clientWidth = document.body.clientWidth;
    //Scrollbar width
    //console.log($window.innerWidth - document.body.clientWidth);

    latestKnownScrollY = $window.scrollY;
    if (latestKnownScrollY > contentWidth - clientWidth) {
      latestKnownScrollY = contentWidth - clientWidth;
    }

    elToTransformSelection.style('transform', `translate3d(${-latestKnownScrollY}px, 0px, 0px)`);
  });
};

export default setScroll;
