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
import { deleteVehicle } from '../../store/tmsSlice';
import StatusBadge from '../../components/StatusBadge';

ModuleRegistry.registerModules([AllCommunityModule]);

const VehicleList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const vehicles = useSelector((state: RootState) => state.tms.vehicles);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchText, setSearchText] = useState('');

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      if (statusFilter !== 'all' && v.status !== statusFilter) return false;
      if (typeFilter !== 'all' && v.type !== typeFilter) return false;
      if (searchText) {
        const s = searchText.toLowerCase();
        return v.unitNumber.toLowerCase().includes(s) || v.make.toLowerCase().includes(s) || v.model.toLowerCase().includes(s) || v.vin.toLowerCase().includes(s);
      }
      return true;
    });
  }, [vehicles, statusFilter, typeFilter, searchText]);

  const columnDefs: ColDef[] = [
    { headerName: 'Unit #', field: 'unitNumber', width: 110, cellStyle: { fontWeight: 600, color: '#064422' } },
    { headerName: 'Type', field: 'type', width: 90 },
    { headerName: 'Make', field: 'make', width: 120 },
    { headerName: 'Model', field: 'model', width: 120 },
    { headerName: 'Year', field: 'year', width: 80 },
    {
      headerName: 'Status', field: 'status', width: 140,
      cellRenderer: (params: ICellRendererParams) => {
        const container = document.createElement('div');
        import('react-dom/client').then(({ createRoot }) => {
          createRoot(container).render(<StatusBadge status={params.value} />);
        });
        return container;
      },
    },
    {
      headerName: 'Mileage', field: 'mileage', width: 110,
      valueFormatter: (params: any) => params.value?.toLocaleString(),
    },
    { headerName: 'License', field: 'licensePlate', width: 100 },
    { headerName: 'Next Service', field: 'nextServiceDue', width: 120 },
    {
      headerName: 'Actions', width: 100, sortable: false, filter: false,
      cellRenderer: (params: ICellRendererParams) => {
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.gap = '4px';
        import('react-dom/client').then(({ createRoot }) => {
          createRoot(container).render(
            <>
              <IconButton size="small" onClick={() => navigate(`/vehicles/${params.data.id}/edit`)} title="Edit"><EditIcon fontSize="small" /></IconButton>
              <IconButton size="small" onClick={() => dispatch(deleteVehicle(params.data.id))} title="Delete" color="error"><DeleteIcon fontSize="small" /></IconButton>
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
          <h1 className="tms-page-title">Vehicles</h1>
          <p className="tms-page-subtitle">{vehicles.length} total vehicles</p>
        </div>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/vehicles/new')} className="tms-btn-primary">
          Add Vehicle
        </Button>
      </div>

      <div className="tms-grid-wrapper">
        <div className="tms-grid-toolbar">
          <div className="tms-grid-filters">
            <TextField size="small" placeholder="Search vehicles..." value={searchText} onChange={e => setSearchText(e.target.value)} sx={{ width: 250 }} />
            <TextField select size="small" value={typeFilter} onChange={e => setTypeFilter(e.target.value)} sx={{ width: 130 }}>
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="Truck">Truck</MenuItem>
              <MenuItem value="Trailer">Trailer</MenuItem>
            </TextField>
            <TextField select size="small" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} sx={{ width: 160 }}>
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="maintenance">Maintenance</MenuItem>
              <MenuItem value="out_of_service">Out of Service</MenuItem>
            </TextField>
          </div>
          <Chip label={`${filteredVehicles.length} vehicles`} size="small" />
        </div>
        <div style={{ height: 480 }}>
          <AgGridReact
            rowData={filteredVehicles}
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

export default VehicleList;
