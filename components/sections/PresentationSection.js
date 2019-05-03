import React from 'react';
import SectionLayout from '../layouts/SectionLayout';

const PresentationSection = () => {
  return (
    <SectionLayout id="presentation" className="section-presentation m-bg-gd-primary-l">
      <div className="title-box m-bg-alert m-fx-cl-en-en">
        <h2 className="m-fs-xl m-tx-primary m-wt-900">Hello</h2>
      </div>
      <div className="content-box m-tx-white m-fx m-fs-ty">
        <p>
          {' '}
          Je m'appelle Xavier et je suis passionné par le web et les nouvelles technologies (blockchain, ia...). J'aime
          prendre un bain quotidien dans les eaux turbulentes de l'écosystème JS.
          <br />
          Mon principe est d'être un éternel étudiant en étant curieux des évolutions technologiques actuelles et
          futures dans une démarche d'apprentissage permanent.
        </p>
      </div>
    </SectionLayout>
  );
};

export default PresentationSection;
