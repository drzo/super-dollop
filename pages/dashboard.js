import { useState, useEffect } from 'react';
import { Page, Layout, Card, Banner, Text, Button } from '@shopify/polaris';
import AppLayout from '../components/AppLayout';
import Dashboard from '../components/Dashboard';
import { fetchShopifyData } from '../utils/shopify';
import { getConnectedStores } from '../utils/database';
import { useRouter } from 'next/router';

export default function DashboardPage() {
  const [shopsData, setShopsData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const connectedStores = await getConnectedStores();
        if (!connectedStores || connectedStores.length === 0) {
          router.push('/');
          return;
        }
        const data = await fetchShopifyData(connectedStores);
        setShopsData(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Unable to fetch store data. Please try again.');
      }
    }
    fetchData();
  }, [router]);

  return (
    <AppLayout>
      <Page title="Store Dashboard">
        <Layout>
          <Layout.Section>
            <Button onClick={() => router.push('/')}>Back to Home</Button>
          </Layout.Section>
          <Layout.Section>
            {error && (
              <Banner status="critical">
                <p>{error}</p>
              </Banner>
            )}
            {shopsData ? (
              <Dashboard data={shopsData} />
            ) : (
              <Card sectioned>
                <Text>Loading shop data...</Text>
              </Card>
            )}
          </Layout.Section>
        </Layout>
      </Page>
    </AppLayout>
  );
}
