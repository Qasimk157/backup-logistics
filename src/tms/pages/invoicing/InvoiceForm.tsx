import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, MenuItem, Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { RootState } from '../../store';
import { addInvoice, updateLoad } from '../../store/tmsSlice';
import { Invoice, InvoiceLineItem } from '../../types';

const lineItemSchema = yup.object({
  description: yup.string().required('Description is required'),
  quantity: yup.number().min(1).required('Qty is required'),
  unitPrice: yup.number().min(0).required('Price is required'),
});

const schema = yup.object({
  loadId: yup.string().required('Select a load'),
  customerName: yup.string().required('Customer name is required'),
  customerEmail: yup.string().email('Invalid email').required('Email is required'),
  dueDate: yup.string().required('Due date is required'),
  notes: yup.string(),
  lineItems: yup.array().of(lineItemSchema).min(1, 'At least one line item is required'),
});

type FormData = yup.InferType<typeof schema>;

const InvoiceForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loads = useSelector((state: RootState) => state.tms.loads);
  const invoices = useSelector((state: RootState) => state.tms.invoices);

  // Only show delivered loads that aren't already invoiced
  const invoicedLoadIds = new Set(invoices.map(i => i.loadId));
  const deliveredLoads = loads.filter(l => l.status === 'delivered' && !invoicedLoadIds.has(l.id));

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      loadId: '',
      customerName: '',
      customerEmail: '',
      dueDate: '',
      notes: '',
      lineItems: [{ description: '', quantity: 1, unitPrice: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: 'lineItems' as any });
  const watchLoadId = watch('loadId');
  const watchLineItems = watch('lineItems');

  // Auto-populate when load is selected
  useEffect(() => {
    if (watchLoadId) {
      const load = loads.find(l => l.id === watchLoadId);
      if (load) {
        setValue('customerName', load.customerName);
        setValue('customerEmail', load.customerEmail);
        // Set due date 30 days from now
        const due = new Date();
        due.setDate(due.getDate() + 30);
        setValue('dueDate', due.toISOString().split('T')[0]);
        // Set default line item with freight charge
        setValue('lineItems', [
          { description: `Freight Charge - ${load.origin.city} to ${load.destination.city}`, quantity: 1, unitPrice: load.rate },
          { description: 'Fuel Surcharge', quantity: 1, unitPrice: Math.round(load.rate * 0.1) },
        ]);
      }
    }
  }, [watchLoadId, loads, setValue]);

  const subtotal = (watchLineItems || []).reduce((sum, item) => {
    return sum + ((item?.quantity || 0) * (item?.unitPrice || 0));
  }, 0);

  const onSubmit = (data: FormData) => {
    const load = loads.find(l => l.id === data.loadId);
    if (!load) return;

    const lineItems: InvoiceLineItem[] = (data.lineItems || []).map(item => ({
      description: item!.description!,
      quantity: item!.quantity!,
      unitPrice: item!.unitPrice!,
      amount: item!.quantity! * item!.unitPrice!,
    }));

    const invoice: Invoice = {
      id: `inv${Date.now()}`,
      invoiceNumber: `INV-2026-${String(invoices.length + 1).padStart(3, '0')}`,
      loadId: data.loadId,
      loadNumber: load.loadNumber,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      lineItems,
      subtotal,
      tax: 0,
      total: subtotal,
      status: 'draft',
      dueDate: data.dueDate,
      createdAt: new Date().toISOString().split('T')[0],
      paidAt: null,
      notes: data.notes || '',
    };

    dispatch(addInvoice(invoice));
    dispatch(updateLoad({ ...load, status: 'invoiced' }));
    navigate(`/invoices/${invoice.id}`);
  };

  return (
    <Box>
      <div className="tms-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/invoices')} className="tms-btn-secondary">Back</Button>
          <div>
            <h1 className="tms-page-title">New Invoice</h1>
            <p className="tms-page-subtitle">Generate invoice from a delivered load</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="tms-form-card">
        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>Select Load</Typography>
        <div className="tms-form-grid">
          <Controller name="loadId" control={control} render={({ field }) => (
            <TextField {...field} select label="Delivered Load" size="small" error={!!errors.loadId} helperText={errors.loadId?.message} sx={{ minWidth: 400 }}>
              <MenuItem value="">Select a load...</MenuItem>
              {deliveredLoads.map(l => (
                <MenuItem key={l.id} value={l.id}>
                  {l.loadNumber} — {l.origin.city} to {l.destination.city} (${l.rate.toLocaleString()})
                </MenuItem>
              ))}
            </TextField>
          )} />
        </div>

        <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 3, mb: 2 }}>Customer</Typography>
        <div className="tms-form-grid">
          <Controller name="customerName" control={control} render={({ field }) => (
            <TextField {...field} label="Customer Name" size="small" error={!!errors.customerName} helperText={errors.customerName?.message} />
          )} />
          <Controller name="customerEmail" control={control} render={({ field }) => (
            <TextField {...field} label="Customer Email" size="small" error={!!errors.customerEmail} helperText={errors.customerEmail?.message} />
          )} />
          <Controller name="dueDate" control={control} render={({ field }) => (
            <TextField {...field} label="Due Date" type="date" size="small" InputLabelProps={{ shrink: true }} error={!!errors.dueDate} helperText={errors.dueDate?.message} />
          )} />
        </div>

        <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 3, mb: 2 }}>Line Items</Typography>
        <table className="tms-invoice-table">
          <thead>
            <tr>
              <th>Description</th>
              <th style={{ width: 80 }}>Qty</th>
              <th style={{ width: 120 }}>Unit Price</th>
              <th style={{ width: 120 }}>Amount</th>
              <th style={{ width: 50 }}></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((field, index) => {
              const qty = watchLineItems?.[index]?.quantity || 0;
              const price = watchLineItems?.[index]?.unitPrice || 0;
              return (
                <tr key={field.id}>
                  <td>
                    <Controller name={`lineItems.${index}.description` as any} control={control} render={({ field }) => (
                      <TextField {...field} size="small" fullWidth placeholder="Description" />
                    )} />
                  </td>
                  <td>
                    <Controller name={`lineItems.${index}.quantity` as any} control={control} render={({ field }) => (
                      <TextField {...field} size="small" type="number" fullWidth />
                    )} />
                  </td>
                  <td>
                    <Controller name={`lineItems.${index}.unitPrice` as any} control={control} render={({ field }) => (
                      <TextField {...field} size="small" type="number" fullWidth />
                    )} />
                  </td>
                  <td style={{ fontWeight: 600, textAlign: 'right' }}>${(qty * price).toLocaleString()}</td>
                  <td>
                    {fields.length > 1 && (
                      <IconButton size="small" onClick={() => remove(index)} color="error">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Button
          size="small"
          startIcon={<AddIcon />}
          onClick={() => append({ description: '', quantity: 1, unitPrice: 0 })}
          sx={{ mt: 1, color: '#064422' }}
        >
          Add Line Item
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, mb: 2 }}>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="text.secondary">Subtotal: <strong>${subtotal.toLocaleString()}</strong></Typography>
            <Typography variant="h6" fontWeight={700} sx={{ mt: 0.5 }}>Total: ${subtotal.toLocaleString()}</Typography>
          </Box>
        </Box>

        <Controller name="notes" control={control} render={({ field }) => (
          <TextField {...field} label="Notes" multiline rows={2} size="small" fullWidth sx={{ mt: 1 }} />
        )} />

        <div className="tms-form-actions">
          <Button type="submit" variant="contained" className="tms-btn-primary">Create Invoice</Button>
          <Button onClick={() => navigate('/invoices')} className="tms-btn-secondary">Cancel</Button>
        </div>
      </form>
    </Box>
  );
};

export default InvoiceForm;
