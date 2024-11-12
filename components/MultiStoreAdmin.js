import React from 'react';
import { Card, DataTable } from '@shopify/polaris';

const MultiStoreAdmin = () => {
  const rows = [
    ['---', '---', 'Sto-1-1', '1', '100'],
    ['---', '---', 'Sto-1-2', '1', '100'],
  ];

  return (
    <Card title="Multi-Store Admin Dashboard" sectioned>
      <DataTable
        columnContentTypes={['text', 'text', 'text', 'numeric', 'numeric']}
        headings={['Enter.', 'Organ.', 'Stores', 'Tot. Order', 'Tot. Sales']}
        rows={rows}
      />
    </Card>
  );
};

export default MultiStoreAdmin;
