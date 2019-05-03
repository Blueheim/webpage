import { select, selectAll, event } from 'd3-selection';
import { format } from 'd3-format';

// Control click scrolling to element
// Select all link starting by #
const setScroll = $elToTransform => {
  let latestKnownScrollY = 0;
  let elToTransformSelection = select($elToTransform);

  select(window).on('scroll', function() {
    const windowSelection = select(this);
    const $window = windowSelection.node();

    const handlerSelection = select('.js-scroll-handler');

    const contentWidth = $elToTransform.getBoundingClientRect().width;
    const clientWidth = document.body.clientWidth;
    //Scrollbar width
    //console.log($window.innerWidth - document.body.clientWidth);

    latestKnownScrollY = $window.scrollY;
    if (latestKnownScrollY > contentWidth - clientWidth) {
      latestKnownScrollY = contentWidth - clientWidth;
    }

    let scaleValue = latestKnownScrollY / (contentWidth - clientWidth);

    handlerSelection.style('transform', `scaleX(${format('.6f')(scaleValue)}`);

    elToTransformSelection.style('transform', `translate3d(${-latestKnownScrollY}px, 0px, 0px)`);
  });
};

export default setScroll;
