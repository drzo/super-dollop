// Client-side storage utility using localStorage

export async function saveConnectedStores(stores) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('connectedStores', JSON.stringify(stores));
  }
}

export async function getConnectedStores() {
  if (typeof window !== 'undefined') {
    const stores = localStorage.getItem('connectedStores');
    return stores ? JSON.parse(stores) : [];
  }
  return [];
}

export async function removeConnectedStore(storeUrl) {
  if (typeof window !== 'undefined') {
    const stores = await getConnectedStores();
    const updatedStores = stores.filter(store => store.url !== storeUrl);
    await saveConnectedStores(updatedStores);
  }
}
