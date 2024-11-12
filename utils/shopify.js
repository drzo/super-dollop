import axios from 'axios';

export async function fetchShopifyData(stores) {
  const storesArray = Array.isArray(stores) ? stores : [stores];

  const fetchDataForStore = async (store) => {
    try {
      const response = await axios.post('/api/shopify', {
        url: store.url,
        accessToken: store.accessToken,
      });
      return { ...response.data, storeUrl: store.url };
    } catch (error) {
      console.error(`Error fetching Shopify data for store ${store.url}:`, error);
      throw new Error(`Failed to fetch Shopify data for store ${store.url}`);
    }
  };

  try {
    const storeData = await Promise.all(storesArray.map(fetchDataForStore));
    return storeData;
  } catch (error) {
    console.error('Error fetching Shopify data:', error);
    throw new Error('Failed to fetch Shopify data');
  }
}
