import React, { useRef, useState, useEffect } from 'react';
import { from } from 'rxjs';
import { setElemsToAnim, setScroll } from '../../utils/scroll';
import classNames from 'classnames';
import ScrollHelper from '../shared/ScrollHelper';
import Chatbot from '../shared/Chatbot';
import ScrollIndicator from '../shared/ScrollIndicator';
import FakeLoading from '../shared/FakeLoading';

const ScrollLayout = ({ children, className }) => {
  const scrollContentRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const classes = classNames('', className);

  useEffect(() => {
    const body = document.body;

    let offsetLeft = 0;
    let bodyHeight = 0;
    // Section positioning
    const sectionList$ = from(Array.from(document.getElementsByClassName('js-scroll-section')));
    sectionList$.subscribe(
      section => {
        const dim = section.getBoundingClientRect();

        section.style.left = `${offsetLeft}px`;
        offsetLeft = offsetLeft + dim.width;
        if (dim.width > dim.height) {
          bodyHeight = bodyHeight + dim.width;
        } else {
          //bodyHeight = bodyHeight + dim.width + dim.width * (dim.width / dim.height); // On phone if height is greater that width
          bodyHeight = bodyHeight + dim.width + dim.width * 0.15;
        }
      },
      null,
      // Complete
      () => {
        body.style.height = `${bodyHeight}px`;
        scrollContentRef.current.style.width = `${offsetLeft}px`;
        setScroll(scrollContentRef.current);
        setElemsToAnim();
        body.classList.remove('js-loading');
        setIsLoading(false);
      }
    );
  }, []);

  return (
    <>
      {isLoading && <FakeLoading />}
      <div data-scroll className={classes}>
        <div ref={scrollContentRef} data-scroll-content>
          {children}
        </div>
        <Chatbot />
        <ScrollHelper />
        <ScrollIndicator />
      </div>
    </>
  );
};

export default ScrollLayout;
