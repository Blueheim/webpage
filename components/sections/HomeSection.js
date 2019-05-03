import React from 'react';
import Typed from 'react-typed';
import SectionLayout from '../layouts/SectionLayout';

const HomeSection = () => {
  return (
    <SectionLayout id="home" className="m-tx-white m-bg-gd-primary-r m-fx-cl-c-c">
      <div className="m-fx-c-c o-wd-100">
        <div className="title-box m-fx-cl-c-c">
          <h1 className="m-tx-c m-tx-up">
            <span className="title m-fs-lg m-ls-xt m-wt-300">Xavier Deroeux</span>
            <span className="title m-fs-sm m-wt-700">Développeur web full stack passionné</span>
          </h1>
          <Typed
            loop
            typeSpeed={60}
            backSpeed={30}
            strings={[
              'Design',
              'Code',
              'Agilité',
              'Passion',
              'Curiosité',
              'JavaScript ES6+',
              'HTML5',
              'Sass',
              'React.js',
              'Next.js',
              'D3.js',
              'Rx.js',
              'Node.js',
              'Express',
              'MongoDB',
            ]}
            backDelay={1000}
            loopCount={0}
            showCursor
            className="m-fs-sm m-tx-alert m-wt-900"
            cursorChar="|"
          />
        </div>
      </div>
    </SectionLayout>
  );
};

export default HomeSection;
