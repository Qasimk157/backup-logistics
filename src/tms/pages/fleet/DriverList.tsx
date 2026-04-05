import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Chip, TextField, MenuItem, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef, ICellRendererParams } from 'ag-grid-community';
import { RootState } from '../../store';
import { deleteDriver } from '../../store/tmsSlice';
import StatusBadge from '../../components/StatusBadge';

ModuleRegistry.registerModules([AllCommunityModule]);

const DriverList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const drivers = useSelector((state: RootState) => state.tms.drivers);
  const loads = useSelector((state: RootState) => state.tms.loads);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchText, setSearchText] = useState('');

  const filteredDrivers = useMemo(() => {
    return drivers.filter(d => {
      if (statusFilter !== 'all' && d.status !== statusFilter) return false;
      if (searchText) {
        const s = searchText.toLowerCase();
        return d.fullName.toLowerCase().includes(s) || d.email.toLowerCase().includes(s) || d.cdlNumber.toLowerCase().includes(s);
      }
      return true;
    });
  }, [drivers, statusFilter, searchText]);

  const columnDefs: ColDef[] = [
    { headerName: 'Name', field: 'fullName', width: 170, cellStyle: { fontWeight: 600 } },
    { headerName: 'Phone', field: 'phone', width: 140 },
    { headerName: 'Email', field: 'email', width: 200 },
    { headerName: 'CDL #', field: 'cdlNumber', width: 150 },
    { headerName: 'CDL Expiry', field: 'cdlExpiry', width: 120 },
    {
      headerName: 'Status', field: 'status', width: 120,
      cellRenderer: (params: ICellRendererParams) => {
        const container = document.createElement('div');
        import('react-dom/client').then(({ createRoot }) => {
          createRoot(container).render(<StatusBadge status={params.value} />);
        });
        return container;
      },
    },
    {
      headerName: 'Current Load', width: 130,
      valueGetter: (params: any) => {
        if (!params.data.currentLoadId) return '—';
        const load = loads.find((l: any) => l.id === params.data.currentLoadId);
        return load?.loadNumber || '—';
      },
      cellStyle: { color: '#064422', fontWeight: 600 },
    },
    {
      headerName: 'Actions', width: 100, sortable: false, filter: false,
      cellRenderer: (params: ICellRendererParams) => {
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.gap = '4px';
        import('react-dom/client').then(({ createRoot }) => {
          createRoot(container).render(
            <>
              <IconButton size="small" onClick={() => navigate(`/drivers/${params.data.id}/edit`)} title="Edit"><EditIcon fontSize="small" /></IconButton>
              <IconButton size="small" onClick={() => dispatch(deleteDriver(params.data.id))} title="Delete" color="error"><DeleteIcon fontSize="small" /></IconButton>
            </>
          );
        });
        return container;
      },
    },
  ];

  return (
    <Box>
      <div className="tms-page-header">
        <div>
          <h1 className="tms-page-title">Drivers</h1>
          <p className="tms-page-subtitle">{drivers.length} total drivers</p>
        </div>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/drivers/new')} className="tms-btn-primary">
          Add Driver
        </Button>
      </div>

      <div className="tms-grid-wrapper">
        <div className="tms-grid-toolbar">
          <div className="tms-grid-filters">
            <TextField size="small" placeholder="Search drivers..." value={searchText} onChange={e => setSearchText(e.target.value)} sx={{ width: 250 }} />
            <TextField select size="small" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} sx={{ width: 150 }}>
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="on_leave">On Leave</MenuItem>
            </TextField>
          </div>
          <Chip label={`${filteredDrivers.length} drivers`} size="small" />
        </div>
        <div style={{ height: 480 }}>
          <AgGridReact
            rowData={filteredDrivers}
            columnDefs={columnDefs}
            defaultColDef={{ sortable: true, filter: true, resizable: true }}
            rowHeight={44}
            headerHeight={40}
            animateRows
            pagination
            paginationPageSize={10}
          />
        </div>
      </div>
    </Box>
  );
};

export default DriverList;
