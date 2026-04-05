import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PeopleIcon from '@mui/icons-material/People';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import MapIcon from '@mui/icons-material/Map';
import StatsCard from '../components/StatsCard';
import StatusBadge from '../components/StatusBadge';
import { RootState } from '../store';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { loads, drivers, vehicles, invoices } = useSelector((state: RootState) => state.tms);

  const activeLoads = loads.filter(l => ['dispatched', 'picked_up', 'in_transit'].includes(l.status)).length;
  const availableDrivers = drivers.filter(d => d.status === 'active' && !d.currentLoadId).length;
  const activeVehicles = vehicles.filter(v => v.status === 'active').length;
  const totalVehicles = vehicles.length;
  const revenue = invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.total, 0);

  const recentLoads = [...loads].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 8);

  return (
    <Box>
      <div className="tms-page-header">
        <div>
          <h1 className="tms-page-title">Dashboard</h1>
          <p className="tms-page-subtitle">Overview of your trucking operations</p>
        </div>
        <div className="tms-quick-actions">
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/loads/new')} className="tms-btn-primary">
            New Load
          </Button>
          <Button variant="outlined" startIcon={<MapIcon />} onClick={() => navigate('/dispatch')} className="tms-btn-secondary">
            Dispatch Board
          </Button>
        </div>
      </div>

      <div className="tms-stats-grid">
        <StatsCard title="Active Loads" value={activeLoads} subtitle={`${loads.length} total loads`} icon={<LocalShippingIcon />} color="#1565c0" />
        <StatsCard title="Available Drivers" value={availableDrivers} subtitle={`${drivers.filter(d => d.status === 'active').length} active drivers`} icon={<PeopleIcon />} color="#2e7d32" />
        <StatsCard title="Fleet Utilization" value={`${Math.round((activeVehicles / totalVehicles) * 100)}%`} subtitle={`${activeVehicles}/${totalVehicles} vehicles active`} icon={<DirectionsCarIcon />} color="#e65100" />
        <StatsCard title="Revenue (Paid)" value={`$${revenue.toLocaleString()}`} subtitle={`${invoices.filter(i => i.status === 'paid').length} paid invoices`} icon={<AttachMoneyIcon />} color="#7b1fa2" />
      </div>

      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #e0e0e0', overflow: 'hidden' }}>
        <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight={700}>Recent Loads</Typography>
          <Button size="small" onClick={() => navigate('/loads')} sx={{ color: '#064422' }}>View All</Button>
        </Box>
        <Box sx={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9f9f9' }}>
                <th style={{ textAlign: 'left', padding: '10px 16px', fontSize: 12, fontWeight: 700, color: '#888' }}>LOAD #</th>
                <th style={{ textAlign: 'left', padding: '10px 16px', fontSize: 12, fontWeight: 700, color: '#888' }}>ORIGIN</th>
                <th style={{ textAlign: 'left', padding: '10px 16px', fontSize: 12, fontWeight: 700, color: '#888' }}>DESTINATION</th>
                <th style={{ textAlign: 'left', padding: '10px 16px', fontSize: 12, fontWeight: 700, color: '#888' }}>STATUS</th>
                <th style={{ textAlign: 'right', padding: '10px 16px', fontSize: 12, fontWeight: 700, color: '#888' }}>RATE</th>
                <th style={{ textAlign: 'left', padding: '10px 16px', fontSize: 12, fontWeight: 700, color: '#888' }}>PICKUP</th>
              </tr>
            </thead>
            <tbody>
              {recentLoads.map(load => (
                <tr
                  key={load.id}
                  onClick={() => navigate(`/loads/${load.id}`)}
                  style={{ cursor: 'pointer', borderBottom: '1px solid #f0f0f0' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#f8f9fa')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '10px 16px', fontSize: 14, fontWeight: 600, color: '#064422' }}>{load.loadNumber}</td>
                  <td style={{ padding: '10px 16px', fontSize: 13 }}>{load.origin.city}, {load.origin.state}</td>
                  <td style={{ padding: '10px 16px', fontSize: 13 }}>{load.destination.city}, {load.destination.state}</td>
                  <td style={{ padding: '10px 16px' }}><StatusBadge status={load.status} /></td>
                  <td style={{ padding: '10px 16px', fontSize: 13, fontWeight: 600, textAlign: 'right' }}>${load.rate.toLocaleString()}</td>
                  <td style={{ padding: '10px 16px', fontSize: 13, color: '#666' }}>{load.pickupDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Paper>
    </Box>
  );
};

export default Dashboard;
