import React, { useState } from 'react';
import { Form, FormLayout, TextField, Button, Card, Stack, Layout } from '@shopify/polaris';

const StoreConnectionForm = ({ onConnection }) => {
  const [stores, setStores] = useState([{ url: '', accessToken: '' }]);

  const handleAddStore = () => {
    setStores([...stores, { url: '', accessToken: '' }]);
  };

  const handleRemoveStore = (index) => {
    const updatedStores = stores.filter((_, i) => i !== index);
    setStores(updatedStores);
  };

  const handleStoreChange = (index, field, value) => {
    const updatedStores = [...stores];
    updatedStores[index][field] = value;
    setStores(updatedStores);
  };

  const handleSubmit = () => {
    onConnection(stores);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Layout>
        {stores.map((store, index) => (
          <Layout.Section key={index}>
            <Card sectioned>
              <FormLayout>
                <TextField
                  value={store.url}
                  onChange={(value) => handleStoreChange(index, 'url', value)}
                  label={`Store URL ${index + 1}`}
                  type="text"
                  helpText="Enter your Shopify store URL (e.g., mystore.myshopify.com)"
                />
                <TextField
                  value={store.accessToken}
                  onChange={(value) => handleStoreChange(index, 'accessToken', value)}
                  label={`Admin API Access Token ${index + 1}`}
                  type="password"
                  helpText="Enter your Shopify Admin API access token"
                />
                {stores.length > 1 && (
                  <Button onClick={() => handleRemoveStore(index)} destructive>
                    Remove Store
                  </Button>
                )}
              </FormLayout>
            </Card>
          </Layout.Section>
        ))}
        <Layout.Section>
          <Stack distribution="equalSpacing">
            <Button onClick={handleAddStore}>Add Another Store</Button>
            <Button submit primary>
              Connect Store{stores.length > 1 ? 's' : ''}
            </Button>
          </Stack>
        </Layout.Section>
      </Layout>
    </Form>
  );
};

export default StoreConnectionForm;
