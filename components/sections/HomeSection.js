import React, { useEffect } from 'react';
import Typed from 'react-typed';
import SectionLayout from '../layouts/SectionLayout';
import lazyLoad from '../../utils/lazyLoad';

const HomeSection = () => {
  useEffect(() => {
    lazyLoad();
  }, []);

  return (
    <SectionLayout id="home" className="home m-tx-white m-fx-cl-c-c">
      <div className="m-fx-c-c o-wd-100">
        <div className="title-box m-fx-cl-c-c">
          <h1 className="m-tx-c m-tx-up m-fx-cl-c-c">
            <span className="title primary-title m-fs-lg m-ls-xt m-wt-300  animate-pop-in">Xavier Deroeux</span>
            <span className="title secondary-title m-fs-sm m-wt-700  animate-pop-in">Full stack web developer</span>
          </h1>
          <Typed
            loop
            typeSpeed={60}
            backSpeed={30}
            strings={[
              'Design',
              'Code',
              'Agility',
              'Passion',
              'Curiosity',
              'Learning',
              'JavaScript',
              'HTML5',
              'CSS/SASS',
              'React',
              'Next',
              'D3',
              'Rx',
              'Node',
              'Express',
              'MongoDB',
            ]}
            backDelay={1000}
            loopCount={0}
            showCursor
            className="typed-title m-fs-sm m-tx-alert m-wt-900 animate-pop-in"
            cursorChar="|"
          />
        </div>
      </div>
    </SectionLayout>
  );
};

export default HomeSection;
