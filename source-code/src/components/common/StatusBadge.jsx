import React from 'react';
import './StatusBadge.css';

const statusMap = {
  // Project statuses
  'Active': 'green',
  'Completed': 'blue',
  'Delayed': 'red',
  'Planning': 'orange',
  'On Hold': 'purple',
  // Task statuses
  'Assigned': 'blue',
  'Accepted': 'teal',
  'In Progress': 'teal',
  'Blocked': 'red',
  'Submitted': 'purple',
  'Awaiting Verification': 'purple',
  'Verified': 'green',
  'Overdue': 'red',
  'Returned for Correction': 'orange',
  // Material/Inventory
  'In-use': 'teal',
  'Not in-use': 'gray',
  'In-transit': 'blue',
  'In Use': 'teal',
  'Not in Use': 'gray',
  'In Transit': 'blue',
  'Maintenance Required': 'orange',
  'Repair Required': 'red',
  // PO statuses
  'Draft': 'gray',
  'Pending Approval': 'orange',
  'Approved': 'green',
  'Dispatched': 'blue',
  'Partially Received': 'purple',
  'Received': 'green',
  'Closed': 'gray',
  'Cancelled': 'red',
  // Delivery
  'In Transit': 'blue',
  'Delivered': 'green',
  // Invoice
  'Pending Verification': 'orange',
  'Pending': 'orange',
  'Verified': 'green',
  'Partially Paid': 'purple',
  'Paid': 'green',
  'Unpaid': 'red',
  'Overdue': 'red',
  'Rejected / Disputed': 'red',
  'Rejected': 'red',
  // Issue
  'Open': 'red',
  'In Review': 'orange',
  'Escalated': 'red',
  'Resolved': 'green',
  // Drawing
  'Revision Required': 'orange',
  'Superseded': 'gray',
  'Archived': 'gray',
  'Submitted for Review': 'purple',
  // Lead
  'New': 'blue',
  'Contacted': 'teal',
  'Qualified': 'green',
  'Proposal Sent': 'purple',
  'Follow-up': 'orange',
  'Converted': 'green',
  'Lost': 'red',
  // Employee
  'Inactive': 'gray',
  // Expense
  'Approved': 'green',
  // Vendor
  'Supplier': 'blue',
  'Contractor': 'purple',
  // Booking
  'Pending Confirmation': 'orange',
  'Confirmed': 'green',
  'Agreement in Progress': 'purple',
  'Payment Pending': 'orange',
  // Receivable
  'Outstanding': 'orange',
  'Collected': 'green',
  'Due': 'orange',
  // Work assignment
  'Scheduled': 'blue',
  // Report
  'Reviewed': 'green',
  // General
  'In Stock': 'green',
  'Out of Stock': 'red',
  'Low Stock': 'orange',
  'Awaiting Response': 'orange',
  'Sent': 'blue',
  'Accepted': 'green',
  'Expired': 'gray',
  'Signed': 'green',
  'Upcoming': 'blue',
  'Fulfilled': 'green',
  'Ordered': 'teal',
  'Ready for Procurement': 'purple',
  'Pending Review': 'orange',
  'Responded': 'green',
};

const colorClass = {
  'green': 'badge green',
  'blue': 'badge blue',
  'red': 'badge red',
  'orange': 'badge orange',
  'purple': 'badge purple',
  'teal': 'badge teal',
  'gray': 'badge gray',
};

export default function StatusBadge({ status }) {
  const color = statusMap[status] || 'gray';
  return <span className={colorClass[color] || 'badge gray'}>{status}</span>;
}
