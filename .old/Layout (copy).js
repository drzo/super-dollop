import { Frame } from '@shopify/polaris';
import Head from 'next/head';

export default function AppLayout({ children }) {
  return (
    <>
      <Head>
        <title>Shopify App</title>
        <meta name="description" content="Shopify App using Next.js and Polaris" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Frame>{children}</Frame>
    </>
  );
}
