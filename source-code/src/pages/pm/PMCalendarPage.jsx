import React, { useState } from 'react';
import { useApp } from '../../store/AppContext';
import PageHeader from '../../components/common/PageHeader';
import { Calendar as CalendarIcon, Clock, CheckCircle2 } from 'lucide-react';

export default function PMCalendarPage() {
  const { state } = useApp();
  const myProjectIds = state.projects.filter(p => p.pm === 'EMP-002' || p.pmName === 'Rahul Mehta').map(p => p.id);
  const myTasks = state.tasks.filter(t => myProjectIds.includes(t.projectId));

  return (
    <>
      <PageHeader title="Milestone & Activity Calendar" subtitle="Chronological timeline of task deadlines, concrete pours, and milestone inspections." />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {myTasks.map(task => (
          <div key={task.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ padding: '10px', background: 'var(--color-blue-light)', borderRadius: '8px', color: 'var(--color-blue)' }}>
                <CalendarIcon size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{task.title} ({task.taskCode})</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Site: {task.siteId} • Planned: {task.plannedStart} to {task.plannedEnd}</div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Due: {task.dueDate}</div>
              <span className="badge blue">{task.status}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
