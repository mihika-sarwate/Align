import React from 'react';
import InventoryMasterView from '../../components/InventoryMasterView';
import PageHeader from '../../components/common/PageHeader';

export default function InventoryPage() {
  return (
    <>
      <PageHeader
        title="Inventory Operations & Stock Control"
        subtitle="Live tracking of site stock, forthcoming requirement dates, surplus/deficit ratios, and replenishment actions."
      />
      <InventoryMasterView
        role="admin"
        canPlaceOrder={true}
        canRaiseIssue={true}
        canAdjustStock={true}
        showTransactionHistory={true}
      />
    </>
  );
}
