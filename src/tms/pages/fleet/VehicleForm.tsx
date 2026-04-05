import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { RootState } from '../../store';
import { addVehicle, updateVehicle } from '../../store/tmsSlice';
import { Vehicle, VehicleType, VehicleStatus } from '../../types';

const schema = yup.object({
  unitNumber: yup.string().required('Unit number is required'),
  type: yup.string().required('Type is required'),
  make: yup.string().required('Make is required'),
  model: yup.string().required('Model is required'),
  year: yup.number().min(1990).max(2030).required('Year is required'),
  vin: yup.string().required('VIN is required'),
  licensePlate: yup.string().required('License plate is required'),
  status: yup.string().required('Status is required'),
  mileage: yup.number().min(0).required('Mileage is required'),
  lastServiceDate: yup.string().required('Last service date is required'),
  nextServiceDue: yup.string().required('Next service due is required'),
});

type FormData = yup.InferType<typeof schema>;

const VehicleForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const vehicles = useSelector((state: RootState) => state.tms.vehicles);
  const existingVehicle = id ? vehicles.find(v => v.id === id) : null;
  const isEdit = Boolean(existingVehicle);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      unitNumber: '', type: 'Truck', make: '', model: '', year: 2024,
      vin: '', licensePlate: '', status: 'active', mileage: 0,
      lastServiceDate: '', nextServiceDue: '',
    },
  });

  useEffect(() => {
    if (existingVehicle) {
      reset({
        unitNumber: existingVehicle.unitNumber,
        type: existingVehicle.type,
        make: existingVehicle.make,
        model: existingVehicle.model,
        year: existingVehicle.year,
        vin: existingVehicle.vin,
        licensePlate: existingVehicle.licensePlate,
        status: existingVehicle.status,
        mileage: existingVehicle.mileage,
        lastServiceDate: existingVehicle.lastServiceDate,
        nextServiceDue: existingVehicle.nextServiceDue,
      });
    }
  }, [existingVehicle, reset]);

  const onSubmit = (data: FormData) => {
    const vehicleData: Vehicle = {
      id: existingVehicle?.id || `v${Date.now()}`,
      unitNumber: data.unitNumber,
      type: data.type as VehicleType,
      make: data.make,
      model: data.model,
      year: data.year,
      vin: data.vin,
      licensePlate: data.licensePlate,
      status: data.status as VehicleStatus,
      mileage: data.mileage,
      lastServiceDate: data.lastServiceDate,
      nextServiceDue: data.nextServiceDue,
    };

    if (isEdit) {
      dispatch(updateVehicle(vehicleData));
    } else {
      dispatch(addVehicle(vehicleData));
    }
    navigate('/vehicles');
  };

  return (
    <Box>
      <div className="tms-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/vehicles')} className="tms-btn-secondary">Back</Button>
          <div>
            <h1 className="tms-page-title">{isEdit ? 'Edit Vehicle' : 'Add Vehicle'}</h1>
            <p className="tms-page-subtitle">{isEdit ? `Editing ${existingVehicle?.unitNumber}` : 'Add a new vehicle'}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="tms-form-card">
        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>Vehicle Information</Typography>
        <div className="tms-form-grid">
          <Controller name="unitNumber" control={control} render={({ field }) => (
            <TextField {...field} label="Unit Number" size="small" error={!!errors.unitNumber} helperText={errors.unitNumber?.message} />
          )} />
          <Controller name="type" control={control} render={({ field }) => (
            <TextField {...field} select label="Type" size="small">
              <MenuItem value="Truck">Truck</MenuItem>
              <MenuItem value="Trailer">Trailer</MenuItem>
            </TextField>
          )} />
          <Controller name="status" control={control} render={({ field }) => (
            <TextField {...field} select label="Status" size="small">
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="maintenance">Maintenance</MenuItem>
              <MenuItem value="out_of_service">Out of Service</MenuItem>
            </TextField>
          )} />
        </div>

        <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 3, mb: 2 }}>Specifications</Typography>
        <div className="tms-form-grid">
          <Controller name="make" control={control} render={({ field }) => (
            <TextField {...field} label="Make" size="small" error={!!errors.make} helperText={errors.make?.message} />
          )} />
          <Controller name="model" control={control} render={({ field }) => (
            <TextField {...field} label="Model" size="small" error={!!errors.model} helperText={errors.model?.message} />
          )} />
          <Controller name="year" control={control} render={({ field }) => (
            <TextField {...field} label="Year" type="number" size="small" error={!!errors.year} helperText={errors.year?.message} />
          )} />
          <Controller name="vin" control={control} render={({ field }) => (
            <TextField {...field} label="VIN" size="small" error={!!errors.vin} helperText={errors.vin?.message} />
          )} />
          <Controller name="licensePlate" control={control} render={({ field }) => (
            <TextField {...field} label="License Plate" size="small" error={!!errors.licensePlate} helperText={errors.licensePlate?.message} />
          )} />
          <Controller name="mileage" control={control} render={({ field }) => (
            <TextField {...field} label="Mileage" type="number" size="small" error={!!errors.mileage} helperText={errors.mileage?.message} />
          )} />
        </div>

        <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 3, mb: 2 }}>Service</Typography>
        <div className="tms-form-grid">
          <Controller name="lastServiceDate" control={control} render={({ field }) => (
            <TextField {...field} label="Last Service Date" type="date" size="small" InputLabelProps={{ shrink: true }} error={!!errors.lastServiceDate} helperText={errors.lastServiceDate?.message} />
          )} />
          <Controller name="nextServiceDue" control={control} render={({ field }) => (
            <TextField {...field} label="Next Service Due" type="date" size="small" InputLabelProps={{ shrink: true }} error={!!errors.nextServiceDue} helperText={errors.nextServiceDue?.message} />
          )} />
        </div>

        <div className="tms-form-actions">
          <Button type="submit" variant="contained" className="tms-btn-primary">{isEdit ? 'Update Vehicle' : 'Add Vehicle'}</Button>
          <Button onClick={() => navigate('/vehicles')} className="tms-btn-secondary">Cancel</Button>
        </div>
      </form>
    </Box>
  );
};

export default VehicleForm;
