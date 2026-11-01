import React from 'react';
import { useApp } from '../../store/AppContext';
import InventoryMasterView from '../../components/InventoryMasterView';
import PageHeader from '../../components/common/PageHeader';

export default function PMInventoryPage() {
  const { state } = useApp();

  const myProjects = (state.projects || []).filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta');
  const myProjectIds = myProjects.map(p => p.id);
  const mySites = (state.sites || []).filter(s => myProjectIds.includes(s.projectId));
  const mySiteIds = mySites.map(s => s.id);

  return (
    <>
      <PageHeader
        title="Project & Site Inventory"
        subtitle="View stock levels, forthcoming deliveries, and surplus/deficit ratios for assigned sites in exact 11-column format."
      />
      <InventoryMasterView
        allowedProjectIds={myProjectIds}
        allowedSiteIds={mySiteIds}
        role="pm"
        canPlaceOrder={false}
        canRaiseIssue={true}
        canAdjustStock={false}
        showTransactionHistory={true}
        title="Project Inventory"
        subtitle="Scoped to supervised sites"
      />
    </>
  );
}
