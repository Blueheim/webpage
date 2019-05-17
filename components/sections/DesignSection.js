import React from 'react';
import SectionLayout from '../layouts/SectionLayout';

const DesignSection = () => {
  return (
    <SectionLayout id="design" className="section-design m-bg-gd-primary-r">
      <div data-trigger-anim="design-title" className="title-box m-fx-cl-en-st">
        <h2 className="m-fs-xl m-tx-primary m-wt-900">Design</h2>
      </div>
      <div className="content-box m-tx-white m-fx-cl m-fs-ty">
        <p>
          Besides UI design, I'm more and more interested in User experience (UX) which has become a major challenge for
          standing out from the competition. Having a unique product, user-driven, with a strong identity is essential.
        </p>
        <br />
        <p>
          For example, I tried to build this presentation website respecting a UX current trend which is the
          storytelling.
        </p>
      </div>
      <div data-trigger-anim="design-features" className="features-box m-tx-white m-fs-sm">
        <ul className="m-fx-cl-c-c">
          <li className="m-mg-xt-b">User interviews</li>
          <li className="m-mg-xt-b">B2B Context</li>
          <li className="m-mg-xt-b">Progressive disclosure</li>
          <li className="m-mg-xt-b">Interface design</li>
        </ul>
      </div>
      <div className="image-box">
        <img data-src="/static/images/using-tablet.jpg" alt="Design - People using a tablet" className="image" />
      </div>
    </SectionLayout>
  );
};

export default DesignSection;
