import { useState, useEffect } from 'react';
import { Page, Layout, Card, Banner, Text, Button } from '@shopify/polaris';
import AppLayout from '../components/AppLayout';
import { fetchShopifyData } from '../utils/shopify';
import { getConnectedStores } from '../utils/database';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function AnalyticsPage() {
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

  const prepareChartData = () => {
    if (!shopsData) return null;

    const productCounts = shopsData.map(shop => ({
      x: shop.shop.name,
      y: shop.products.length
    }));

    const orderCounts = shopsData.map(shop => ({
      x: shop.shop.name,
      y: shop.orders.length
    }));

    return {
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '55%',
            endingShape: 'rounded'
          },
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: shopsData.map(shop => shop.shop.name),
        },
        yaxis: {
          title: {
            text: 'Count'
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return val
            }
          }
        }
      },
      series: [
        {
          name: 'Products',
          data: productCounts
        },
        {
          name: 'Orders',
          data: orderCounts
        }
      ]
    };
  };

  const chartData = prepareChartData();

  return (
    <AppLayout>
      <Page title="Analytics">
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
              <>
                <Card title="Store Comparison" sectioned>
                  {chartData && (
                    <Chart
                      options={chartData.options}
                      series={chartData.series}
                      type="bar"
                      height={350}
                    />
                  )}
                </Card>
                <Card title="Total Statistics" sectioned>
                  <Text variant="headingMd">
                    Total Products: {shopsData.reduce((sum, shop) => sum + shop.products.length, 0)}
                  </Text>
                  <Text variant="headingMd">
                    Total Orders: {shopsData.reduce((sum, shop) => sum + shop.orders.length, 0)}
                  </Text>
                  <Text variant="headingMd">
                    Total Revenue: ${shopsData.reduce((sum, shop) => sum + shop.orders.reduce((orderSum, order) => orderSum + parseFloat(order.total_price), 0), 0).toFixed(2)}
                  </Text>
                </Card>
              </>
            ) : (
              <Card sectioned>
                <Text>Loading analytics data...</Text>
              </Card>
            )}
          </Layout.Section>
        </Layout>
      </Page>
    </AppLayout>
  );
}
