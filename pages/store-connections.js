import { Page, Layout, Button } from '@shopify/polaris';
import AppLayout from '../components/AppLayout';
import StoreConnectionForm from '../components/StoreConnectionForm';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { fetchShopifyData } from '../utils/shopify';
import { getConnectedStores } from '../utils/database';

export default function StoreConnections() {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleConnection = async (newStores) => {
    try {
      const allStores = await getConnectedStores();
      const data = await fetchShopifyData(allStores);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AppLayout>
      <Page title="Connect Stores">
        <Layout>
          <Layout.Section>
            <Button onClick={() => router.push('/')}>Back to Home</Button>
          </Layout.Section>
          <Layout.Section>
            <StoreConnectionForm onConnection={handleConnection} />
            {error && <p style={{color: 'red'}}>Error: {error}</p>}
          </Layout.Section>
        </Layout>
      </Page>
    </AppLayout>
  );
}
