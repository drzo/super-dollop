import { Page, Layout, Button } from '@shopify/polaris';
import AppLayout from '../components/AppLayout';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <AppLayout>
      <Page title="Shopify Multi-Store App">
        <Layout>
          <Layout.Section>
            <Button onClick={() => router.push('/shopify-setup')}>Shopify App Setup</Button>
            <Button onClick={() => router.push('/store-connections')}>Connect Stores</Button>
            <Button onClick={() => router.push('/dashboard')}>View Dashboard</Button>
            <Button onClick={() => router.push('/analytics')}>View Analytics</Button>
            <Button onClick={() => router.push('/admin')}>Admin Dashboard</Button>
          </Layout.Section>
        </Layout>
      </Page>
    </AppLayout>
  );
}
