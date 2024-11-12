import { useState, useEffect } from 'react';
import { Form, FormLayout, TextField, Button, Card, Banner } from '@shopify/polaris';
import PropTypes from 'prop-types';
import { saveConnectedStores, getConnectedStores, removeConnectedStore } from '../utils/database';

const StoreConnectionForm = ({ onConnection }) => {
  const [stores, setStores] = useState([{ url: '', accessToken: '' }]);
  const [connectedStores, setConnectedStores] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchConnectedStores() {
      try {
        const stores = await getConnectedStores();
        console.log('Retrieved connected stores:', stores); // Add this line
        setConnectedStores(stores);
      } catch (err) {
        console.error('Error fetching connected stores:', err);
        setError('Unable to load connected stores. Please try again.');
      }
    }
    fetchConnectedStores();
  }, []);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedStores = [...connectedStores, ...stores];
      await saveConnectedStores(updatedStores);
      console.log('Saved connected stores:', updatedStores); // Add this line
      setConnectedStores(updatedStores);
      setStores([{ url: '', accessToken: '' }]);
      onConnection(stores);
    } catch (err) {
      console.error('Error saving connected stores:', err);
      setError('Unable to save connected stores. Please try again.');
    }
  };

  const handleDisconnect = async (storeUrl) => {
    try {
      await removeConnectedStore(storeUrl);
      const updatedStores = connectedStores.filter(store => store.url !== storeUrl);
      console.log('Updated connected stores after disconnection:', updatedStores); // Add this line
      setConnectedStores(updatedStores);
    } catch (err) {
      console.error('Error disconnecting store:', err);
      setError('Unable to disconnect store. Please try again.');
    }
  };

  return (
    <>
      {error && (
        <Banner status="critical" onDismiss={() => setError(null)}>
          <p>{error}</p>
        </Banner>
      )}
      <Card title="Connected Stores" sectioned>
        {connectedStores.map((store, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <TextField
              value={store.url}
              label={`Store URL ${index + 1}`}
              readOnly
            />
            <Button onClick={() => handleDisconnect(store.url)} destructive>
              Disconnect Store
            </Button>
          </div>
        ))}
      </Card>
      <Form onSubmit={handleSubmit}>
        <FormLayout>
          {stores.map((store, index) => (
            <Card key={index} sectioned>
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
            </Card>
          ))}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <Button onClick={handleAddStore}>Add Another Store</Button>
            <Button submit primary>
              Connect Store{stores.length > 1 ? 's' : ''}
            </Button>
          </div>
        </FormLayout>
      </Form>
    </>
  );
};

StoreConnectionForm.propTypes = {
  onConnection: PropTypes.func.isRequired,
};

export default StoreConnectionForm;
