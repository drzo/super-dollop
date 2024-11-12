import React from 'react';
import { Card, DataTable } from '@shopify/polaris';

const SingleStoreAdmin = () => {
  const rows = [
    ['---', '---', 'Sto-1-1', '1', '100'],
  ];

  return (
    <Card title="Single-Store Admin Dashboard" sectioned>
      <DataTable
        columnContentTypes={['text', 'text', 'text', 'numeric', 'numeric']}
        headings={['Enter.', 'Organ.', 'Stores', 'Tot. Order', 'Tot. Sales']}
        rows={rows}
      />
    </Card>
  );
};

export default SingleStoreAdmin;
