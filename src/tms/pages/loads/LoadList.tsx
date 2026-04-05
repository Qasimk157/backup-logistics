import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Chip, TextField, MenuItem, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef, ICellRendererParams } from 'ag-grid-community';
import { RootState } from '../../store';
import { deleteLoad } from '../../store/tmsSlice';
import StatusBadge from '../../components/StatusBadge';
import { LoadStatus } from '../../types';

ModuleRegistry.registerModules([AllCommunityModule]);

const LoadList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loads = useSelector((state: RootState) => state.tms.loads);
  const drivers = useSelector((state: RootState) => state.tms.drivers);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchText, setSearchText] = useState('');

  const filteredLoads = useMemo(() => {
    return loads.filter(l => {
      if (statusFilter !== 'all' && l.status !== statusFilter) return false;
      if (searchText) {
        const search = searchText.toLowerCase();
        return (
          l.loadNumber.toLowerCase().includes(search) ||
          l.origin.city.toLowerCase().includes(search) ||
          l.destination.city.toLowerCase().includes(search) ||
          l.customerName.toLowerCase().includes(search)
        );
      }
      return true;
    });
  }, [loads, statusFilter, searchText]);

  const getDriverName = (driverId: string | null) => {
    if (!driverId) return '—';
    return drivers.find(d => d.id === driverId)?.fullName || '—';
  };

  const columnDefs: ColDef[] = [
    { headerName: 'Load #', field: 'loadNumber', width: 120, cellStyle: { fontWeight: 600, color: '#064422' } },
    {
      headerName: 'Origin', width: 160,
      valueGetter: (params: any) => `${params.data.origin.city}, ${params.data.origin.state}`,
    },
    {
      headerName: 'Destination', width: 160,
      valueGetter: (params: any) => `${params.data.destination.city}, ${params.data.destination.state}`,
    },
    {
      headerName: 'Status', field: 'status', width: 130,
      cellRenderer: (params: ICellRendererParams) => {
        const container = document.createElement('div');
        import('react-dom/client').then(({ createRoot }) => {
          createRoot(container).render(<StatusBadge status={params.value} />);
        });
        return container;
      },
    },
    {
      headerName: 'Driver', width: 150,
      valueGetter: (params: any) => getDriverName(params.data.driverId),
    },
    {
      headerName: 'Rate', field: 'rate', width: 110,
      valueFormatter: (params: any) => `$${params.value?.toLocaleString()}`,
      cellStyle: { fontWeight: 600 },
    },
    { headerName: 'Pickup', field: 'pickupDate', width: 120 },
    { headerName: 'Delivery', field: 'deliveryDate', width: 120 },
    { headerName: 'Equipment', field: 'equipmentType', width: 120 },
    {
      headerName: 'Actions', width: 140, sortable: false, filter: false,
      cellRenderer: (params: ICellRendererParams) => {
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.gap = '4px';
        import('react-dom/client').then(({ createRoot }) => {
          createRoot(container).render(
            <>
              <IconButton size="small" onClick={() => navigate(`/loads/${params.data.id}`)} title="View"><VisibilityIcon fontSize="small" /></IconButton>
              <IconButton size="small" onClick={() => navigate(`/loads/${params.data.id}/edit`)} title="Edit"><EditIcon fontSize="small" /></IconButton>
              <IconButton size="small" onClick={() => dispatch(deleteLoad(params.data.id))} title="Delete" color="error"><DeleteIcon fontSize="small" /></IconButton>
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
          <h1 className="tms-page-title">Loads</h1>
          <p className="tms-page-subtitle">{loads.length} total loads</p>
        </div>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/loads/new')} className="tms-btn-primary">
          New Load
        </Button>
      </div>

      <div className="tms-grid-wrapper">
        <div className="tms-grid-toolbar">
          <div className="tms-grid-filters">
            <TextField
              size="small"
              placeholder="Search loads..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              sx={{ width: 250 }}
            />
            <TextField
              select
              size="small"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              sx={{ width: 160 }}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="posted">Posted</MenuItem>
              <MenuItem value="dispatched">Dispatched</MenuItem>
              <MenuItem value="picked_up">Picked Up</MenuItem>
              <MenuItem value="in_transit">In Transit</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="invoiced">Invoiced</MenuItem>
            </TextField>
          </div>
          <Chip label={`${filteredLoads.length} loads`} size="small" />
        </div>
        <div style={{ height: 520 }}>
          <AgGridReact
            rowData={filteredLoads}
            columnDefs={columnDefs}
            defaultColDef={{ sortable: true, filter: true, resizable: true }}
            rowHeight={44}
            headerHeight={40}
            animateRows
            pagination
            paginationPageSize={10}
            onRowDoubleClicked={(e) => navigate(`/loads/${e.data.id}`)}
          />
        </div>
      </div>
    </Box>
  );
};

export default LoadList;
