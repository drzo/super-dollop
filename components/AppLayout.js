import React from 'react';
import { Frame } from '@shopify/polaris';
import Head from 'next/head';

const AppLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Shopify Multi-Store App</title>
        <meta name="description" content="Shopify App using Next.js and Polaris" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Frame>{children}</Frame>
    </>
  );
};

export default AppLayout;
