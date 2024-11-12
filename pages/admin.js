import { useState, useEffect } from 'react';
import { Page, Layout, Card, Tabs, DataTable, Button, TextContainer, Text, Select } from '@shopify/polaris';
import AppLayout from '../components/AppLayout';
import SingleStoreAdmin from '../components/SingleStoreAdmin';
import MultiStoreAdmin from '../components/MultiStoreAdmin';
import SingleOrgAdmin from '../components/SingleOrgAdmin';
import MultiOrgAdmin from '../components/MultiOrgAdmin';
import EnterpriseAdmin from '../components/EnterpriseAdmin';
import { fetchShopifyData } from '../utils/shopify';
import { getConnectedStores } from '../utils/database';
import { useRouter } from 'next/router';

export default function AdminPage() {
  const [shopsData, setShopsData] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);
  const [adminType, setAdminType] = useState('single-store');
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        console.log('Fetching connected stores...');
        const connectedStores = await getConnectedStores();
        console.log('Connected stores:', connectedStores);
        
        if (!connectedStores || connectedStores.length === 0) {
          console.log('No connected stores found');
          setError('No connected stores found');
          return;
        }
        
        console.log('Fetching Shopify data...');
        const data = await fetchShopifyData(connectedStores);
        console.log('Shopify data:', data);
        
        setShopsData(data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Unable to fetch store data. Please try again.');
      }
    }
    fetchData();
  }, []);

  const handleAdminTypeChange = (value) => {
    setAdminType(value);
  };

  const renderAdminDashboard = () => {
    switch (adminType) {
      case 'single-store':
        return <SingleStoreAdmin />;
      case 'multi-store':
        return <MultiStoreAdmin />;
      case 'single-org':
        return <SingleOrgAdmin />;
      case 'multi-org':
        return <MultiOrgAdmin />;
      case 'enterprise':
        return <EnterpriseAdmin />;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <Page
        title="Admin Dashboard"
        primaryAction={
          <Button onClick={() => router.push('/')}>Back to Home</Button>
        }
      >
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <Select
                label="Select Admin Type"
                options={[
                  {label: 'Single-Store Admin', value: 'single-store'},
                  {label: 'Multi-Store Admin', value: 'multi-store'},
                  {label: 'Single-Org Admin', value: 'single-org'},
                  {label: 'Multi-Org Admin', value: 'multi-org'},
                  {label: 'Enterprise Admin', value: 'enterprise'},
                ]}
                onChange={handleAdminTypeChange}
                value={adminType}
              />
            </Card>
          </Layout.Section>
          <Layout.Section>
            {error ? (
              <Card>
                <p>{error}</p>
              </Card>
            ) : (
              renderAdminDashboard()
            )}
          </Layout.Section>
        </Layout>
      </Page>
    </AppLayout>
  );
}
