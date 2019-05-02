import React from 'react';
import HeaderLayout from './HeaderLayout';
import ScrollLayout from './ScrollLayout';

const BaseLayout = ({ children }) => {
  return (
    <div className="app">
      <HeaderLayout />
      <ScrollLayout>{children}</ScrollLayout>
    </div>
  );
};

export default BaseLayout;
