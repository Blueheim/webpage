import React from 'react';

const ScrollHelper = () => {
  return (
    <div data-scroll-helper className="scroll-helper">
      <div data-scroll-handler className="scroll-helper__handler js-scroll-handler" />
    </div>
  );
};

export default ScrollHelper;
