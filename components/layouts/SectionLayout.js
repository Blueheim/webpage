import React from 'react';
import classNames from 'classnames';

const SectionLayout = ({ children, id, className }) => {
  const classes = classNames('js-scroll-section', className);

  return (
    <section id={id} data-scroll-section className={classes}>
      {children}
    </section>
  );
};

export default SectionLayout;
