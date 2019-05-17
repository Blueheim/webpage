import React, { useEffect } from 'react';
import Head from 'next/head';
import BaseLayout from '../components/layouts/BaseLayout';
import StackSection from '../components/sections/StackSection';
import DesignSection from '../components/sections/DesignSection';
import HomeSection from '../components/sections/HomeSection';
import PresentationSection from '../components/sections/PresentationSection';
import ContactSection from '../components/sections/ContactSection';
import ProjectSection from '../components/sections/ProjectsSection';

const Index = () => {
  return (
    <BaseLayout>
      <Head>
        <title>Xavier Deroeux - Full Stack Web Developer</title>
      </Head>
      <HomeSection />
      <PresentationSection />
      <DesignSection />
      <StackSection />
      <ProjectSection />
      <ContactSection />
    </BaseLayout>
  );
};

// Index.getInitialProps = async ({ req }) => {
//   const res = await fetch('https://api.github.com/repos/zeit/next.js')
//   const json = await res.json()
//   return { stars: json.stargazers_count }
// }

export default Index;
