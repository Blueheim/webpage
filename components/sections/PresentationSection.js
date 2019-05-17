import React, { useEffect } from 'react';
import SectionLayout from '../layouts/SectionLayout';
import { initDom } from '../../utils/avatar-animation';
import { svg } from 'd3-fetch';
import { select } from 'd3-selection';

const PresentationSection = () => {
  useEffect(() => {
    svg('/static/images/avatar-me-new.svg').then(svgDoc => {
      const avatarBox = select('#avatar-box');
      const svgEl = svgDoc.querySelector('svg');
      avatarBox.node().appendChild(svgEl);
      select('#avatar').lower();
      initDom();
    });
  }, []);

  return (
    <SectionLayout id="presentation" className="section-presentation m-bg-gd-primary-l">
      <div data-trigger-anim="presentation-title" className="title-box m-fx-cl-en-en">
        <h2 className="m-fs-xl m-tx-primary m-wt-900">Hello</h2>
      </div>
      <div data-trigger-anim="avatar" className="content-box m-tx-white m-fx m-fs-ty">
        <p>
          {' '}
          My name is Xavier, I'm a french web and tech enthusiast. I love taking a daily bath in the turbulent waters of
          the JavaScript ecosystem. The pace of change has never been this fast, we have already entered the era of
          continuous learning.
          <br />
          As an eternal student, I'm curious about present and future technological evolutions with a practical mindset.
        </p>
      </div>
      <div className="image-box">
        <div id="avatar-box" className="svg-container m-op-0">
          {/* <svg>
            <image xlinkHref="/static/images/avatar-me.svg" x="0" y="0" width="100%" />
          </svg> */}
        </div>
      </div>
      <div data-trigger-anim="presentation-features" className="features-box m-tx-white m-fs-sm">
        <ul className="m-fx-cl-c-c">
          <li className="m-mg-xt-b">Curiosity</li>
          <li className="m-mg-xt-b">Creativity</li>
          <li className="m-mg-xt-b">Adaptability</li>
          <li className="m-mg-xt-b">Self-learning</li>
        </ul>
      </div>
    </SectionLayout>
  );
};

export default PresentationSection;
