import React from 'react';
import { Card, DataTable } from '@shopify/polaris';

const EnterpriseAdmin = () => {
  const rows = [
    ['Ent-0', '', '', '9', '900'],
    ['---', 'Org-1', '', '3', '300'],
    ['---', '---', 'Sto-1-1', '1', '100'],
    ['---', '---', 'Sto-1-2', '1', '100'],
    ['---', '---', 'Sto-1-3', '1', '100'],
    ['---', 'Org-2', '', '3', '300'],
    ['---', '---', 'Sto-2-1', '1', '100'],
    ['---', '---', 'Sto-2-2', '1', '100'],
    ['---', '---', 'Sto-2-3', '1', '100'],
    ['---', 'Org-3', '', '3', '300'],
    ['---', '---', 'Sto-3-1', '1', '100'],
    ['---', '---', 'Sto-3-2', '1', '100'],
    ['---', '---', 'Sto-3-3', '1', '100'],
  ];

  return (
    <Card title="Enterprise Admin Dashboard" sectioned>
      <DataTable
        columnContentTypes={['text', 'text', 'text', 'numeric', 'numeric']}
        headings={['Enter.', 'Organ.', 'Stores', 'Tot. Order', 'Tot. Sales']}
        rows={rows}
      />
    </Card>
  );
};

export default EnterpriseAdmin;
