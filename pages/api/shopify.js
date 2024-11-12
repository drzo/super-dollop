import axios from 'axios';

const SHOPIFY_API_VERSION = '2024-10';

export default async function handler(req, res) {
  const { method, body } = req;

  if (method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { url, accessToken } = body;

  const shopifyClient = axios.create({
    baseURL: `https://${url}/admin/api/${SHOPIFY_API_VERSION}`,
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': accessToken,
    },
  });

  try {
    const [shopResponse, productsResponse, ordersResponse] = await Promise.all([
      shopifyClient.get('/shop.json'),
      shopifyClient.get('/products.json'),
      shopifyClient.get('/orders.json'),
    ]);

    res.status(200).json({
      shop: shopResponse.data.shop,
      products: productsResponse.data.products,
      orders: ordersResponse.data.orders,
    });
  } catch (error) {
    console.error('Error fetching Shopify data:', error);
    res.status(500).json({ message: 'Failed to fetch Shopify data', error: error.message });
  }
}
