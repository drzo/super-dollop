import { useState } from 'react';
import { Card, Tabs, DataTable, TextContainer, Text } from '@shopify/polaris';

const UserPage = ({ userData }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const tabs = [
    {
      id: 'orders',
      content: 'Orders',
      accessibilityLabel: 'Orders',
      panelID: 'orders-content',
    },
    {
      id: 'products',
      content: 'Products',
      accessibilityLabel: 'Products',
      panelID: 'products-content',
    },
  ];

  const renderOrdersTable = () => {
    const rows = userData.orders.map((order) => [
      order.name,
      order.total_price,
      new Date(order.created_at).toLocaleDateString(),
      order.line_items.length.toString(),
    ]);

    return (
      <DataTable
        columnContentTypes={['text', 'numeric', 'date', 'numeric']}
        headings={['Order', 'Total', 'Date', 'Items']}
        rows={rows}
      />
    );
  };

  const renderProductsTable = () => {
    const rows = userData.products.map((product) => [
      product.title,
      product.variants[0].price,
      product.variants[0].inventory_quantity.toString(),
      product.product_type,
    ]);

    return (
      <DataTable
        columnContentTypes={['text', 'numeric', 'numeric', 'text']}
        headings={['Product', 'Price', 'Inventory', 'Type']}
        rows={rows}
      />
    );
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return renderOrdersTable();
      case 1:
        return renderProductsTable();
      default:
        return null;
    }
  };

  return (
    <Card>
      <Card.Section>
        <TextContainer>
          <Text variant="headingMd">User Details</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Total Orders: {userData.orders.length}</Text>
          <Text>Total Spent: ${userData.orders.reduce((sum, order) => sum + parseFloat(order.total_price), 0).toFixed(2)}</Text>
        </TextContainer>
      </Card.Section>
      <Card.Section>
        <Tabs tabs={tabs} selected={selectedTab} onSelect={setSelectedTab}>
          <div style={{ padding: '16px' }}>
            {renderTabContent()}
          </div>
        </Tabs>
      </Card.Section>
    </Card>
  );
};

export default UserPage;
