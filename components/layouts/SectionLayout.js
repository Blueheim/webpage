import React from 'react';
import classNames from 'classnames';

const SectionLayout = ({ children, id, className }) => {
  const classes = classNames('section js-scroll-section', className);

  return (
    <section id={id} data-scroll-section className={classes}>
      <div className="section__content">{children}</div>
    </section>
  );
};

export default SectionLayout;
