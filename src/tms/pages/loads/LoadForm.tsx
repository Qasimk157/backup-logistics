import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { RootState } from '../../store';
import { addLoad, updateLoad } from '../../store/tmsSlice';
import { Load, EquipmentType } from '../../types';

const schema = yup.object({
  loadNumber: yup.string().required('Load number is required'),
  originCity: yup.string().required('Origin city is required'),
  originState: yup.string().required('State is required'),
  originZip: yup.string().required('ZIP is required'),
  destinationCity: yup.string().required('Destination city is required'),
  destinationState: yup.string().required('State is required'),
  destinationZip: yup.string().required('ZIP is required'),
  rate: yup.number().positive('Rate must be positive').required('Rate is required'),
  weight: yup.number().positive('Weight must be positive').required('Weight is required'),
  miles: yup.number().positive('Miles must be positive').required('Miles is required'),
  commodity: yup.string().required('Commodity is required'),
  equipmentType: yup.string().required('Equipment type is required'),
  pickupDate: yup.string().required('Pickup date is required'),
  deliveryDate: yup.string().required('Delivery date is required'),
  customerName: yup.string().required('Customer name is required'),
  customerEmail: yup.string().email('Invalid email').required('Customer email is required'),
  driverId: yup.string().nullable(),
  vehicleId: yup.string().nullable(),
  specialInstructions: yup.string(),
});

type FormData = yup.InferType<typeof schema>;

const equipmentTypes: EquipmentType[] = ['Dry Van', 'Reefer', 'Flatbed', 'Step Deck', 'Tanker'];

const LoadForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loads = useSelector((state: RootState) => state.tms.loads);
  const drivers = useSelector((state: RootState) => state.tms.drivers);
  const vehicles = useSelector((state: RootState) => state.tms.vehicles);

  const existingLoad = id ? loads.find(l => l.id === id) : null;
  const isEdit = Boolean(existingLoad);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      loadNumber: '',
      originCity: '',
      originState: '',
      originZip: '',
      destinationCity: '',
      destinationState: '',
      destinationZip: '',
      rate: 0,
      weight: 0,
      miles: 0,
      commodity: '',
      equipmentType: 'Dry Van',
      pickupDate: '',
      deliveryDate: '',
      customerName: '',
      customerEmail: '',
      driverId: '',
      vehicleId: '',
      specialInstructions: '',
    },
  });

  useEffect(() => {
    if (existingLoad) {
      reset({
        loadNumber: existingLoad.loadNumber,
        originCity: existingLoad.origin.city,
        originState: existingLoad.origin.state,
        originZip: existingLoad.origin.zip,
        destinationCity: existingLoad.destination.city,
        destinationState: existingLoad.destination.state,
        destinationZip: existingLoad.destination.zip,
        rate: existingLoad.rate,
        weight: existingLoad.weight,
        miles: existingLoad.miles,
        commodity: existingLoad.commodity,
        equipmentType: existingLoad.equipmentType,
        pickupDate: existingLoad.pickupDate,
        deliveryDate: existingLoad.deliveryDate,
        customerName: existingLoad.customerName,
        customerEmail: existingLoad.customerEmail,
        driverId: existingLoad.driverId || '',
        vehicleId: existingLoad.vehicleId || '',
        specialInstructions: existingLoad.specialInstructions,
      });
    }
  }, [existingLoad, reset]);

  const onSubmit = (data: FormData) => {
    const loadData: Load = {
      id: existingLoad?.id || `l${Date.now()}`,
      loadNumber: data.loadNumber,
      origin: { city: data.originCity, state: data.originState, zip: data.originZip },
      destination: { city: data.destinationCity, state: data.destinationState, zip: data.destinationZip },
      status: existingLoad?.status || 'posted',
      rate: data.rate,
      weight: data.weight,
      miles: data.miles,
      commodity: data.commodity,
      equipmentType: data.equipmentType as EquipmentType,
      pickupDate: data.pickupDate,
      deliveryDate: data.deliveryDate,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      driverId: data.driverId || null,
      vehicleId: data.vehicleId || null,
      specialInstructions: data.specialInstructions || '',
      createdAt: existingLoad?.createdAt || new Date().toISOString().split('T')[0],
    };

    if (isEdit) {
      dispatch(updateLoad(loadData));
    } else {
      dispatch(addLoad(loadData));
    }
    navigate('/loads');
  };

  return (
    <Box>
      <div className="tms-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/loads')} className="tms-btn-secondary">
            Back
          </Button>
          <div>
            <h1 className="tms-page-title">{isEdit ? 'Edit Load' : 'New Load'}</h1>
            <p className="tms-page-subtitle">{isEdit ? `Editing ${existingLoad?.loadNumber}` : 'Create a new load'}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="tms-form-card">
        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2, color: '#333' }}>Load Information</Typography>
        <div className="tms-form-grid">
          <Controller name="loadNumber" control={control} render={({ field }) => (
            <TextField {...field} label="Load Number" size="small" error={!!errors.loadNumber} helperText={errors.loadNumber?.message} />
          )} />
          <Controller name="commodity" control={control} render={({ field }) => (
            <TextField {...field} label="Commodity" size="small" error={!!errors.commodity} helperText={errors.commodity?.message} />
          )} />
          <Controller name="equipmentType" control={control} render={({ field }) => (
            <TextField {...field} select label="Equipment Type" size="small" error={!!errors.equipmentType} helperText={errors.equipmentType?.message}>
              {equipmentTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </TextField>
          )} />
        </div>

        <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 3, mb: 2, color: '#333' }}>Origin</Typography>
        <div className="tms-form-grid">
          <Controller name="originCity" control={control} render={({ field }) => (
            <TextField {...field} label="City" size="small" error={!!errors.originCity} helperText={errors.originCity?.message} />
          )} />
          <Controller name="originState" control={control} render={({ field }) => (
            <TextField {...field} label="State" size="small" error={!!errors.originState} helperText={errors.originState?.message} />
          )} />
          <Controller name="originZip" control={control} render={({ field }) => (
            <TextField {...field} label="ZIP Code" size="small" error={!!errors.originZip} helperText={errors.originZip?.message} />
          )} />
        </div>

        <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 3, mb: 2, color: '#333' }}>Destination</Typography>
        <div className="tms-form-grid">
          <Controller name="destinationCity" control={control} render={({ field }) => (
            <TextField {...field} label="City" size="small" error={!!errors.destinationCity} helperText={errors.destinationCity?.message} />
          )} />
          <Controller name="destinationState" control={control} render={({ field }) => (
            <TextField {...field} label="State" size="small" error={!!errors.destinationState} helperText={errors.destinationState?.message} />
          )} />
          <Controller name="destinationZip" control={control} render={({ field }) => (
            <TextField {...field} label="ZIP Code" size="small" error={!!errors.destinationZip} helperText={errors.destinationZip?.message} />
          )} />
        </div>

        <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 3, mb: 2, color: '#333' }}>Details</Typography>
        <div className="tms-form-grid">
          <Controller name="rate" control={control} render={({ field }) => (
            <TextField {...field} label="Rate ($)" type="number" size="small" error={!!errors.rate} helperText={errors.rate?.message} />
          )} />
          <Controller name="weight" control={control} render={({ field }) => (
            <TextField {...field} label="Weight (lbs)" type="number" size="small" error={!!errors.weight} helperText={errors.weight?.message} />
          )} />
          <Controller name="miles" control={control} render={({ field }) => (
            <TextField {...field} label="Miles" type="number" size="small" error={!!errors.miles} helperText={errors.miles?.message} />
          )} />
          <Controller name="pickupDate" control={control} render={({ field }) => (
            <TextField {...field} label="Pickup Date" type="date" size="small" InputLabelProps={{ shrink: true }} error={!!errors.pickupDate} helperText={errors.pickupDate?.message} />
          )} />
          <Controller name="deliveryDate" control={control} render={({ field }) => (
            <TextField {...field} label="Delivery Date" type="date" size="small" InputLabelProps={{ shrink: true }} error={!!errors.deliveryDate} helperText={errors.deliveryDate?.message} />
          )} />
        </div>

        <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 3, mb: 2, color: '#333' }}>Customer</Typography>
        <div className="tms-form-grid">
          <Controller name="customerName" control={control} render={({ field }) => (
            <TextField {...field} label="Customer Name" size="small" error={!!errors.customerName} helperText={errors.customerName?.message} />
          )} />
          <Controller name="customerEmail" control={control} render={({ field }) => (
            <TextField {...field} label="Customer Email" size="small" error={!!errors.customerEmail} helperText={errors.customerEmail?.message} />
          )} />
        </div>

        <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 3, mb: 2, color: '#333' }}>Assignment</Typography>
        <div className="tms-form-grid">
          <Controller name="driverId" control={control} render={({ field }) => (
            <TextField {...field} select label="Assign Driver" size="small">
              <MenuItem value="">Unassigned</MenuItem>
              {drivers.filter(d => d.status === 'active').map(d => (
                <MenuItem key={d.id} value={d.id}>{d.fullName}</MenuItem>
              ))}
            </TextField>
          )} />
          <Controller name="vehicleId" control={control} render={({ field }) => (
            <TextField {...field} select label="Assign Vehicle" size="small">
              <MenuItem value="">Unassigned</MenuItem>
              {vehicles.filter(v => v.status === 'active').map(v => (
                <MenuItem key={v.id} value={v.id}>{v.unitNumber} - {v.make} {v.model}</MenuItem>
              ))}
            </TextField>
          )} />
        </div>

        <div className="tms-form-grid" style={{ marginTop: 20 }}>
          <Controller name="specialInstructions" control={control} render={({ field }) => (
            <TextField {...field} label="Special Instructions" multiline rows={3} size="small" fullWidth />
          )} />
        </div>

        <div className="tms-form-actions">
          <Button type="submit" variant="contained" className="tms-btn-primary">
            {isEdit ? 'Update Load' : 'Create Load'}
          </Button>
          <Button onClick={() => navigate('/loads')} className="tms-btn-secondary">
            Cancel
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default LoadForm;
