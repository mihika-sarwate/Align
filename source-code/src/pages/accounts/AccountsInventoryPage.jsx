import React from 'react';
import InventoryMasterView from '../../components/InventoryMasterView';

export default function AccountsInventoryPage() {
  return (
    <div>
      <div style={{ marginBottom: '16px' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Inventory Management (Accounts View)
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
          Real-time stock valuation, physical inventory balances, material surplus/deficit indicators, and transaction audit trails.
        </p>
      </div>

      <InventoryMasterView readOnly={true} />
    </div>
  );
}
