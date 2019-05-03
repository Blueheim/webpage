import React, { useEffect } from 'react';
import { Link } from '../routes';
import BaseLayout from '../components/layouts/BaseLayout';
import StackSection from '../components/sections/StackSection';
import DesignSection from '../components/sections/DesignSection';
import HomeSection from '../components/sections/HomeSection';
import PresentationSection from '../components/sections/PresentationSection';

const Index = () => {
  return (
    <BaseLayout>
      <HomeSection />
      <PresentationSection />
      <DesignSection />
      <StackSection />
    </BaseLayout>
  );
};

// Index.getInitialProps = async ({ req }) => {
//   const res = await fetch('https://api.github.com/repos/zeit/next.js')
//   const json = await res.json()
//   return { stars: json.stargazers_count }
// }

export default Index;
