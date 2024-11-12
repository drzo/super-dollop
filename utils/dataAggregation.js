export function aggregateStoreData(storesData) {
  return storesData.reduce((acc, store) => {
    acc.totalProducts += store.products.length;
    acc.totalOrders += store.orders.length;
    acc.totalRevenue += store.orders.reduce((sum, order) => sum + parseFloat(order.total_price), 0);
    return acc;
  }, { totalProducts: 0, totalOrders: 0, totalRevenue: 0 });
}
