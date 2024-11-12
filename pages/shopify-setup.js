import { Page, Layout, Card, TextField, Button, Banner } from '@shopify/polaris';
import AppLayout from '../components/AppLayout';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function ShopifySetup() {
  const [apiKey, setApiKey] = useState('');
  const [apiSecretKey, setApiSecretKey] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/save-shopify-credentials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ apiKey, apiSecretKey }),
      });

      if (response.ok) {
        setSuccessMessage('Credentials saved successfully!');
        setTimeout(() => router.push('/'), 2000);
      } else {
        throw new Error('Failed to save credentials');
      }
    } catch (error) {
      console.error('Error saving credentials:', error);
      setSuccessMessage('Failed to save credentials. Please try again.');
    }
  };

  return (
    <AppLayout>
      <Page
        title="Shopify App Setup"
        primaryAction={
          <Button onClick={() => router.push('/')}>Back to Home</Button>
        }
      >
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <h2>Shopify App Setup Instructions</h2>
              <ol>
                <li>Go to the Shopify Partners website (https://partners.shopify.com/) and sign up for a Shopify Partner account if you haven't already.</li>
                <li>Once logged in to your Shopify Partner account, navigate to the "Apps" section in the left sidebar.</li>
                <li>Click on "Create app" to start the app creation process.</li>
                <li>Choose "Public app" as the app type.</li>
                <li>Enter a name for your app (e.g., "Multi-Store Dashboard").</li>
                <li>Set the app URL to your Replit project URL (e.g., https://your-repl-name.your-username.repl.co).</li>
                <li>Set the allowed redirection URL(s) to:
                   <br />- https://your-repl-name.your-username.repl.co/api/auth/callback</li>
                <li>In the "App setup" section, you'll find your API credentials. Make note of the API key and API secret key.</li>
                <li>In the "App settings" section, set the following:
                   <br />- App status: Development
                   <br />- Distribution method: Public app</li>
                <li>Save your changes.</li>
              </ol>
            </Card>
          </Layout.Section>
          <Layout.Section>
            <Card sectioned>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="API Key"
                  value={apiKey}
                  onChange={setApiKey}
                  autoComplete="off"
                />
                <TextField
                  label="API Secret Key"
                  value={apiSecretKey}
                  onChange={setApiSecretKey}
                  type="password"
                  autoComplete="off"
                />
                <Button submit primary>Save Credentials</Button>
              </form>
            </Card>
          </Layout.Section>
          {successMessage && (
            <Layout.Section>
              <Banner status="success" onDismiss={() => setSuccessMessage('')}>
                <p>{successMessage}</p>
              </Banner>
            </Layout.Section>
          )}
        </Layout>
      </Page>
    </AppLayout>
  );
}
