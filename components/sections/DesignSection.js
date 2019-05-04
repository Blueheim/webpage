import React from 'react';
import SectionLayout from '../layouts/SectionLayout';

const DesignSection = () => {
  return (
    <SectionLayout id="design" className="section-design m-bg-gd-primary-r">
      <div className="title-box m-bg-alert m-fx-cl-en-st">
        <h2 className="m-fs-xl m-tx-primary m-wt-900">Design</h2>
      </div>
      <div className="content-box m-tx-white m-fx m-fs-ty">
        <p>
          Je porte un intérêt croissant à l'expérience utilisateur
          <br /> enjeu capital pour se démarquer et obtenir un produit unique, adapté à l'utilisateur et ayant une forte
          identité. J'ai par exemple conçu ce site de présentation en essayant de respecter une tendance actuelle de
          l'UX qui est le strorytelling.
        </p>
      </div>
      <div className="features-box m-tx-white m-fs-sm">
        <ul className="m-fx-cl-c-c">
          <li className="m-mg-xt-b">Entrevues utilisateurs</li>
          <li className="m-mg-xt-b">Contexte B2B</li>
          <li className="m-mg-xt-b">Divulgation progressive</li>
          <li className="m-mg-xt-b">Design d'interface</li>
        </ul>
      </div>
      <div className="image-box">
        <img src="../../static/images/using-tablet.jpg" className="image" />
      </div>
    </SectionLayout>
  );
};

export default DesignSection;
