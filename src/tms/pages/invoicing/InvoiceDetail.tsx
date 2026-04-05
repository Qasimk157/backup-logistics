import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PrintIcon from '@mui/icons-material/Print';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { RootState } from '../../store';
import { updateInvoice } from '../../store/tmsSlice';
import StatusBadge from '../../components/StatusBadge';

const InvoiceDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const invoice = useSelector((state: RootState) => state.tms.invoices.find(i => i.id === id));

  if (!invoice) {
    return (
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h6">Invoice not found</Typography>
        <Button onClick={() => navigate('/invoices')} sx={{ mt: 2 }}>Back to Invoices</Button>
      </Box>
    );
  }

  const markAsSent = () => {
    dispatch(updateInvoice({ ...invoice, status: 'sent' }));
  };

  const markAsPaid = () => {
    dispatch(updateInvoice({ ...invoice, status: 'paid', paidAt: new Date().toISOString().split('T')[0] }));
  };

  return (
    <Box>
      <div className="tms-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/invoices')} className="tms-btn-secondary">Back</Button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h1 className="tms-page-title">{invoice.invoiceNumber}</h1>
              <StatusBadge status={invoice.status} />
            </div>
            <p className="tms-page-subtitle">Load: {invoice.loadNumber} &middot; {invoice.customerName}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {invoice.status === 'draft' && (
            <Button variant="contained" startIcon={<SendIcon />} onClick={markAsSent} className="tms-btn-primary">
              Mark as Sent
            </Button>
          )}
          {(invoice.status === 'sent' || invoice.status === 'overdue') && (
            <Button variant="contained" startIcon={<CheckCircleIcon />} onClick={markAsPaid} className="tms-btn-primary">
              Mark as Paid
            </Button>
          )}
          <Button startIcon={<PrintIcon />} onClick={() => window.print()} className="tms-btn-secondary">
            Print
          </Button>
        </div>
      </div>

      <div className="tms-invoice-preview">
        {/* Header */}
        <div className="tms-invoice-header">
          <div>
            <Typography variant="h5" fontWeight={800} sx={{ color: '#064422' }}>Backup Logistics LLC</Typography>
            <Typography variant="body2" color="text.secondary">Houston, TX</Typography>
            <Typography variant="body2" color="text.secondary">info@backuplogistics.us</Typography>
            <Typography variant="body2" color="text.secondary">(713) 555-0100</Typography>
          </div>
          <div style={{ textAlign: 'right' }}>
            <Typography variant="h4" fontWeight={800} sx={{ color: '#064422' }}>INVOICE</Typography>
            <Typography variant="body1" fontWeight={600}>{invoice.invoiceNumber}</Typography>
            <Typography variant="body2" color="text.secondary">Date: {invoice.createdAt}</Typography>
            <Typography variant="body2" color="text.secondary">Due: {invoice.dueDate}</Typography>
          </div>
        </div>

        {/* Bill To */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="overline" fontWeight={700} color="text.secondary">Bill To</Typography>
          <Typography variant="body1" fontWeight={600}>{invoice.customerName}</Typography>
          <Typography variant="body2" color="text.secondary">{invoice.customerEmail}</Typography>
        </Box>

        {/* Load Reference */}
        <Box sx={{ mb: 3, p: 2, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
          <Typography variant="body2">
            <strong>Load Reference:</strong> {invoice.loadNumber}
          </Typography>
        </Box>

        {/* Line Items */}
        <table className="tms-invoice-table">
          <thead>
            <tr>
              <th>Description</th>
              <th style={{ width: 80 }}>Qty</th>
              <th style={{ width: 120 }}>Unit Price</th>
              <th style={{ width: 120 }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.lineItems.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>${item.unitPrice.toLocaleString()}</td>
                <td>${item.amount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="tms-invoice-totals">
          <table>
            <tbody>
              <tr>
                <td style={{ textAlign: 'right', color: '#666' }}>Subtotal:</td>
                <td style={{ fontWeight: 600 }}>${invoice.subtotal.toLocaleString()}</td>
              </tr>
              <tr>
                <td style={{ textAlign: 'right', color: '#666' }}>Tax:</td>
                <td>${invoice.tax.toLocaleString()}</td>
              </tr>
              <tr className="total-row">
                <td style={{ textAlign: 'right' }}>Total:</td>
                <td>${invoice.total.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Payment Status */}
        {invoice.paidAt && (
          <Box sx={{ mt: 3, p: 2, backgroundColor: '#e8f5e9', borderRadius: 2, textAlign: 'center' }}>
            <Typography variant="body1" fontWeight={700} sx={{ color: '#2e7d32' }}>
              PAID on {invoice.paidAt}
            </Typography>
          </Box>
        )}

        {/* Notes */}
        {invoice.notes && (
          <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #eee' }}>
            <Typography variant="overline" fontWeight={700} color="text.secondary">Notes</Typography>
            <Typography variant="body2">{invoice.notes}</Typography>
          </Box>
        )}

        {/* Footer */}
        <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid #eee', textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Backup Logistics LLC &middot; Houston, TX &middot; Thank you for your business!
          </Typography>
        </Box>
      </div>
    </Box>
  );
};

export default InvoiceDetail;
