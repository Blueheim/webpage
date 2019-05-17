import React from 'react';
import SectionLayout from '../layouts/SectionLayout';

const ProjectSection = () => {
  return (
    <SectionLayout id="project" className="section-project m-bg-gd-primary-r">
      <div data-trigger-anim="project-title" className="title-box m-fx-cl-en-st">
        <h2 className="m-fs-xl m-tx-primary m-wt-900">Projects</h2>
      </div>
      <div className="content-box m-tx-white m-fx-cl m-fs-ty">
        <p>Learning a new technnology or concept involves practice in building functionality or app projects.</p> <br />
        <p>
          Projects like a chatbot connected to a Google AI, a burger menu configurator with React, a chat app powered by
          socket.io, a cryptocurrency dashboard using D3.js...
        </p>
        <br />
        <p>Websites like Udemy, Stackoverflow, Medium or newsletters allow me to access quality content.</p>
        <br />
        <p>#Doer-mindset</p>
      </div>
      <div data-trigger-anim="project-features" className="features-box m-tx-white m-fs-sm">
        <ul className="m-fx-cl-c-c">
          <li className="m-mg-xt-b">Technological watch</li>
          <li className="m-mg-xt-b">Practical projects</li>
        </ul>
      </div>
      <div className="gallery-box">
        <div className="composition">
          <img
            data-src="/static/images/cryptodashboard.png"
            alt="Project - Cryptocurrency dashboard"
            className="composition__photo composition__photo--p1"
          />
          <img
            data-src="/static/images/menumaker.png"
            alt="Project - Burger menu maker"
            className="composition__photo composition__photo--p2"
          />
          <img
            data-src="/static/images/chat.png"
            alt="Project - Chat"
            className="composition__photo composition__photo--p3"
          />
        </div>
      </div>
    </SectionLayout>
  );
};

export default ProjectSection;
