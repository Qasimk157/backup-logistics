import React from 'react';
import { Chip } from '@mui/material';

const statusColors: Record<string, { bg: string; color: string; label: string }> = {
  // Load statuses
  posted: { bg: '#e3f2fd', color: '#1565c0', label: 'Posted' },
  dispatched: { bg: '#fff3e0', color: '#e65100', label: 'Dispatched' },
  picked_up: { bg: '#f3e5f5', color: '#7b1fa2', label: 'Picked Up' },
  in_transit: { bg: '#e8f5e9', color: '#2e7d32', label: 'In Transit' },
  delivered: { bg: '#e0f2f1', color: '#00695c', label: 'Delivered' },
  invoiced: { bg: '#fce4ec', color: '#c62828', label: 'Invoiced' },
  // Driver statuses
  active: { bg: '#e8f5e9', color: '#2e7d32', label: 'Active' },
  inactive: { bg: '#efebe9', color: '#5d4037', label: 'Inactive' },
  on_leave: { bg: '#fff3e0', color: '#e65100', label: 'On Leave' },
  // Vehicle statuses
  maintenance: { bg: '#fff3e0', color: '#e65100', label: 'Maintenance' },
  out_of_service: { bg: '#ffebee', color: '#c62828', label: 'Out of Service' },
  // Invoice statuses
  draft: { bg: '#f5f5f5', color: '#616161', label: 'Draft' },
  sent: { bg: '#e3f2fd', color: '#1565c0', label: 'Sent' },
  paid: { bg: '#e8f5e9', color: '#2e7d32', label: 'Paid' },
  overdue: { bg: '#ffebee', color: '#c62828', label: 'Overdue' },
};

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const config = statusColors[status] || { bg: '#f5f5f5', color: '#616161', label: status };
  return (
    <Chip
      label={config.label}
      size="small"
      sx={{
        backgroundColor: config.bg,
        color: config.color,
        fontWeight: 600,
        fontSize: 12,
      }}
    />
  );
};

export default StatusBadge;
