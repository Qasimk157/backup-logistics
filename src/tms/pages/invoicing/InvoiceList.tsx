import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Chip, TextField, MenuItem, Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, ColDef, ICellRendererParams } from 'ag-grid-community';
import { RootState } from '../../store';
import { deleteInvoice } from '../../store/tmsSlice';
import StatusBadge from '../../components/StatusBadge';

ModuleRegistry.registerModules([AllCommunityModule]);

const InvoiceList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoices = useSelector((state: RootState) => state.tms.invoices);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchText, setSearchText] = useState('');

  const filteredInvoices = useMemo(() => {
    return invoices.filter(i => {
      if (statusFilter !== 'all' && i.status !== statusFilter) return false;
      if (searchText) {
        const s = searchText.toLowerCase();
        return (
          i.invoiceNumber.toLowerCase().includes(s) ||
          i.loadNumber.toLowerCase().includes(s) ||
          i.customerName.toLowerCase().includes(s)
        );
      }
      return true;
    });
  }, [invoices, statusFilter, searchText]);

  const totalOutstanding = invoices
    .filter(i => i.status === 'sent' || i.status === 'overdue')
    .reduce((sum, i) => sum + i.total, 0);

  const columnDefs: ColDef[] = [
    { headerName: 'Invoice #', field: 'invoiceNumber', width: 150, cellStyle: { fontWeight: 600, color: '#064422' } },
    { headerName: 'Load #', field: 'loadNumber', width: 120 },
    { headerName: 'Customer', field: 'customerName', width: 180 },
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
      headerName: 'Total', field: 'total', width: 120,
      valueFormatter: (params: any) => `$${params.value?.toLocaleString()}`,
      cellStyle: { fontWeight: 600 },
    },
    { headerName: 'Due Date', field: 'dueDate', width: 120 },
    { headerName: 'Created', field: 'createdAt', width: 120 },
    {
      headerName: 'Paid', field: 'paidAt', width: 120,
      valueFormatter: (params: any) => params.value || '—',
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
              <IconButton size="small" onClick={() => navigate(`/invoices/${params.data.id}`)} title="View"><VisibilityIcon fontSize="small" /></IconButton>
              <IconButton size="small" onClick={() => dispatch(deleteInvoice(params.data.id))} title="Delete" color="error"><DeleteIcon fontSize="small" /></IconButton>
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
          <h1 className="tms-page-title">Invoices</h1>
          <p className="tms-page-subtitle">
            {invoices.length} total &middot; ${totalOutstanding.toLocaleString()} outstanding
          </p>
        </div>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/invoices/new')} className="tms-btn-primary">
          New Invoice
        </Button>
      </div>

      <div className="tms-grid-wrapper">
        <div className="tms-grid-toolbar">
          <div className="tms-grid-filters">
            <TextField size="small" placeholder="Search invoices..." value={searchText} onChange={e => setSearchText(e.target.value)} sx={{ width: 250 }} />
            <TextField select size="small" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} sx={{ width: 150 }}>
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="sent">Sent</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="overdue">Overdue</MenuItem>
            </TextField>
          </div>
          <Chip label={`${filteredInvoices.length} invoices`} size="small" />
        </div>
        <div style={{ height: 480 }}>
          <AgGridReact
            rowData={filteredInvoices}
            columnDefs={columnDefs}
            defaultColDef={{ sortable: true, filter: true, resizable: true }}
            rowHeight={44}
            headerHeight={40}
            animateRows
            pagination
            paginationPageSize={10}
            onRowDoubleClicked={(e) => navigate(`/invoices/${e.data.id}`)}
          />
        </div>
      </div>
    </Box>
  );
};

export default InvoiceList;
