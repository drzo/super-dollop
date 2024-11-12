import { Card, DataTable, Text, Tabs, TextContainer, Page, Layout, Banner } from '@shopify/polaris';
import { useState } from 'react';
import { aggregateStoreData } from '../utils/dataAggregation';

const Dashboard = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const storesData = Array.isArray(data) ? data : [data];

  const tabs = storesData.map((store, index) => ({
    id: `store-${index}`,
    content: store.shop.name,
    accessibilityLabel: `Store ${store.shop.name}`,
    panelID: `store-panel-${index}`,
  }));

  const currentStore = storesData[selectedTab];

  // Aggregate data across all stores
  const aggregatedData = aggregateStoreData(storesData);

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Banner title="Aggregated Data" status="info">
            <p>Total Products: {aggregatedData.totalProducts}</p>
            <p>Total Orders: {aggregatedData.totalOrders}</p>
            <p>Total Revenue: ${aggregatedData.totalRevenue.toFixed(2)}</p>
          </Banner>
        </Layout.Section>

        {storesData.length > 1 && (
          <Layout.Section>
            <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab} />
          </Layout.Section>
        )}
        
        <Layout.Section>
          <Card title="Shop Information" sectioned>
            <TextContainer>
              <Text variant="bodyMd">
                <strong>Name:</strong> {currentStore.shop.name}
              </Text>
              <Text variant="bodyMd">
                <strong>Domain:</strong> {currentStore.shop.domain}
              </Text>
            </TextContainer>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card title="Products" sectioned>
            <DataTable
              columnContentTypes={['text', 'numeric', 'numeric']}
              headings={['Product', 'Inventory', 'Price']}
              rows={currentStore.products.map(product => [
                product.title,
                product.variants[0].inventory_quantity || 'N/A',
                `$${product.variants[0].price}`
              ])}
            />
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card title="Recent Orders" sectioned>
            <DataTable
              columnContentTypes={['text', 'text', 'numeric']}
              headings={['Order ID', 'Date', 'Total']}
              rows={currentStore.orders.map(order => [
                order.name,
                new Date(order.created_at).toLocaleDateString(),
                `$${order.total_price}`
              ])}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Dashboard;
