const lazyLoad = () => {
  let lazyloadImages = document.querySelectorAll('img[data-src]');
  lazyloadImages.forEach(function(img) {
    img.src = img.dataset.src;
  });
};

export default lazyLoad;
