import React, { useRef, useEffect } from 'react';
import { from } from 'rxjs';
import setScroll from '../../utils/scroll';
import classNames from 'classnames';
import ScrollHelper from '../shared/ScrollHelper';
import Chatbot from '../shared/Chatbot';

const ScrollLayout = ({ children, className }) => {
  const scrollContentRef = useRef();
  const classes = classNames('', className);

  useEffect(() => {
    const body = document.body;

    let offsetLeft = 0;

    // Section positioning
    const sectionList$ = from(Array.from(document.getElementsByClassName('js-scroll-section')));

    sectionList$.subscribe(
      section => {
        const dim = section.getBoundingClientRect();

        section.style.left = `${offsetLeft}px`;
        offsetLeft = offsetLeft + dim.width;
      },
      null,
      () => {
        body.style.height = `${offsetLeft}px`;
        scrollContentRef.current.style.width = `${offsetLeft}px`;
        setScroll(scrollContentRef.current);
      }
    );
  }, []);

  return (
    <div data-scroll className={classes}>
      <div ref={scrollContentRef} data-scroll-content>
        {children}
      </div>
      <Chatbot />
      <ScrollHelper />
    </div>
  );
};

export default ScrollLayout;
