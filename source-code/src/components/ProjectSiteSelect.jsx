import React from 'react';
import { useApp } from '../store/AppContext';

/**
 * Combined Project/Site Dropdown Component (Section 2.4, 2.5, 3.2)
 *
 * Displays Project and Site hand-in-hand in a single clean selector:
 * "[Project Name] — [Site Name] (PRJ-XXX / SIT-YYY)"
 *
 * Can report both value (siteId or composite) and split onChange ({ projectId, siteId }).
 */
export default function ProjectSiteSelect({
  value,
  onChange,
  filterProjectIds = null,
  includeAllOption = false,
  allLabel = 'All Projects / Sites',
  style = {},
  className = '',
  required = false,
  id = 'project-site-select',
  disabled = false
}) {
  const { state } = useApp();

  let sites = state.sites || [];
  if (filterProjectIds && filterProjectIds.length > 0) {
    sites = sites.filter(s => filterProjectIds.includes(s.projectId));
  }

  const handleChange = (e) => {
    const selectedSiteId = e.target.value;
    if (!selectedSiteId) {
      onChange({ siteId: '', projectId: '', projectName: '', siteName: '' });
      return;
    }
    const site = sites.find(s => s.id === selectedSiteId);
    const project = site ? state.projects.find(p => p.id === site.projectId) : null;
    onChange({
      siteId: selectedSiteId,
      projectId: site?.projectId || '',
      projectName: project?.name || site?.projectName || '',
      siteName: site?.name || ''
    });
  };

  return (
    <select
      id={id}
      value={value || ''}
      onChange={handleChange}
      required={required}
      disabled={disabled}
      className={className}
      style={{
        padding: '8px 12px',
        borderRadius: '6px',
        border: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-card, #ffffff)',
        color: 'var(--text-primary)',
        fontSize: '0.85rem',
        ...style
      }}
    >
      {includeAllOption && <option value="">{allLabel}</option>}
      {sites.map(s => {
        const p = state.projects.find(prj => prj.id === s.projectId);
        const pName = p?.name || s.projectName || 'Project';
        return (
          <option key={s.id} value={s.id}>
            {pName} — {s.name} ({s.id})
          </option>
        );
      })}
    </select>
  );
}
