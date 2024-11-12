import React, { useState, useEffect } from 'react';
import { Page, Layout, Card, DataTable, Tabs, Button, Banner } from '@shopify/polaris';
import AppLayout from '../components/AppLayout';
import { fetchShopifyData } from '../utils/shopify';
import { getConnectedStores } from '../utils/database';
import { useRouter } from 'next/router';

export default function AdminPage() {
  const [shopsData, setShopsData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const connectedStores = await getConnectedStores();
        if (!connectedStores || connectedStores.length === 0) {
          setError('No connected stores found. Please connect stores first.');
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
  }, []);

  const tabs = [
    {
      id: 'stores',
      content: 'Stores',
      accessibilityLabel: 'Stores',
      panelID: 'stores-panel',
    },
    {
      id: 'products',
      content: 'Products',
      accessibilityLabel: 'Products',
      panelID: 'products-panel',
    },
    {
      id: 'orders',
      content: 'Orders',
      accessibilityLabel: 'Orders',
      panelID: 'orders-panel',
    },
  ];

  const renderStoresTable = () => {
    if (!shopsData) return null;

    const rows = shopsData.map(shop => [
      shop.shop.name,
      shop.shop.domain,
      shop.products.length,
      shop.orders.length,
    ]);

    return (
      <DataTable
        columnContentTypes={['text', 'text', 'numeric', 'numeric']}
        headings={['Store Name', 'Domain', 'Products', 'Orders']}
        rows={rows}
      />
    );
  };

  const renderProductsTable = () => {
    if (!shopsData) return null;

    const rows = shopsData.flatMap(shop =>
      shop.products.map(product => [
        shop.shop.name,
        product.title,
        product.variants[0].inventory_quantity || 'N/A',
        `$${product.variants[0].price}`,
      ])
    );

    return (
      <DataTable
        columnContentTypes={['text', 'text', 'numeric', 'numeric']}
        headings={['Store', 'Product', 'Inventory', 'Price']}
        rows={rows}
      />
    );
  };

  const renderOrdersTable = () => {
    if (!shopsData) return null;

    const rows = shopsData.flatMap(shop =>
      shop.orders.map(order => [
        shop.shop.name,
        order.name,
        new Date(order.created_at).toLocaleDateString(),
        `$${order.total_price}`,
      ])
    );

    return (
      <DataTable
        columnContentTypes={['text', 'text', 'text', 'numeric']}
        headings={['Store', 'Order ID', 'Date', 'Total']}
        rows={rows}
      />
    );
  };

  const renderTabContent = () => {
    const content = {
      0: renderStoresTable,
      1: renderProductsTable,
      2: renderOrdersTable,
    }[selectedTab];

    return content ? content() : <p>No data available</p>;
  };

  return (
    <AppLayout>
      <Page title="Admin Dashboard">
        <Layout>
          <Layout.Section>
            <Button onClick={() => router.push('/')}>Back to Home</Button>
          </Layout.Section>
          {error && (
            <Layout.Section>
              <Banner status="critical">{error}</Banner>
            </Layout.Section>
          )}
          {shopsData && (
            <Layout.Section>
              <Card>
                <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab}>
                  <Card.Section title={tabs[selectedTab].content}>
                    {renderTabContent()}
                  </Card.Section>
                </Tabs>
              </Card>
            </Layout.Section>
          )}
        </Layout>
      </Page>
    </AppLayout>
  );
}
