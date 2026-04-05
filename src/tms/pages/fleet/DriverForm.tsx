import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, MenuItem, Box, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { RootState } from '../../store';
import { addDriver, updateDriver } from '../../store/tmsSlice';
import { Driver, DriverStatus } from '../../types';

const schema = yup.object({
  fullName: yup.string().required('Full name is required'),
  phone: yup.string().required('Phone is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  cdlNumber: yup.string().required('CDL number is required'),
  cdlExpiry: yup.string().required('CDL expiry is required'),
  hireDate: yup.string().required('Hire date is required'),
  status: yup.string().required('Status is required'),
  emergencyContact: yup.string().required('Emergency contact is required'),
});

type FormData = yup.InferType<typeof schema>;

const DriverForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const drivers = useSelector((state: RootState) => state.tms.drivers);
  const existingDriver = id ? drivers.find(d => d.id === id) : null;
  const isEdit = Boolean(existingDriver);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { fullName: '', phone: '', email: '', cdlNumber: '', cdlExpiry: '', hireDate: '', status: 'active', emergencyContact: '' },
  });

  useEffect(() => {
    if (existingDriver) {
      reset({
        fullName: existingDriver.fullName,
        phone: existingDriver.phone,
        email: existingDriver.email,
        cdlNumber: existingDriver.cdlNumber,
        cdlExpiry: existingDriver.cdlExpiry,
        hireDate: existingDriver.hireDate,
        status: existingDriver.status,
        emergencyContact: existingDriver.emergencyContact,
      });
    }
  }, [existingDriver, reset]);

  const onSubmit = (data: FormData) => {
    const driverData: Driver = {
      id: existingDriver?.id || `d${Date.now()}`,
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      cdlNumber: data.cdlNumber,
      cdlExpiry: data.cdlExpiry,
      hireDate: data.hireDate,
      status: data.status as DriverStatus,
      emergencyContact: data.emergencyContact,
      currentLoadId: existingDriver?.currentLoadId || null,
    };

    if (isEdit) {
      dispatch(updateDriver(driverData));
    } else {
      dispatch(addDriver(driverData));
    }
    navigate('/drivers');
  };

  return (
    <Box>
      <div className="tms-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/drivers')} className="tms-btn-secondary">Back</Button>
          <div>
            <h1 className="tms-page-title">{isEdit ? 'Edit Driver' : 'Add Driver'}</h1>
            <p className="tms-page-subtitle">{isEdit ? `Editing ${existingDriver?.fullName}` : 'Add a new driver'}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="tms-form-card">
        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>Personal Information</Typography>
        <div className="tms-form-grid">
          <Controller name="fullName" control={control} render={({ field }) => (
            <TextField {...field} label="Full Name" size="small" error={!!errors.fullName} helperText={errors.fullName?.message} />
          )} />
          <Controller name="phone" control={control} render={({ field }) => (
            <TextField {...field} label="Phone" size="small" error={!!errors.phone} helperText={errors.phone?.message} />
          )} />
          <Controller name="email" control={control} render={({ field }) => (
            <TextField {...field} label="Email" size="small" error={!!errors.email} helperText={errors.email?.message} />
          )} />
          <Controller name="emergencyContact" control={control} render={({ field }) => (
            <TextField {...field} label="Emergency Contact" size="small" error={!!errors.emergencyContact} helperText={errors.emergencyContact?.message} />
          )} />
        </div>

        <Typography variant="subtitle2" fontWeight={700} sx={{ mt: 3, mb: 2 }}>License & Employment</Typography>
        <div className="tms-form-grid">
          <Controller name="cdlNumber" control={control} render={({ field }) => (
            <TextField {...field} label="CDL Number" size="small" error={!!errors.cdlNumber} helperText={errors.cdlNumber?.message} />
          )} />
          <Controller name="cdlExpiry" control={control} render={({ field }) => (
            <TextField {...field} label="CDL Expiry" type="date" size="small" InputLabelProps={{ shrink: true }} error={!!errors.cdlExpiry} helperText={errors.cdlExpiry?.message} />
          )} />
          <Controller name="hireDate" control={control} render={({ field }) => (
            <TextField {...field} label="Hire Date" type="date" size="small" InputLabelProps={{ shrink: true }} error={!!errors.hireDate} helperText={errors.hireDate?.message} />
          )} />
          <Controller name="status" control={control} render={({ field }) => (
            <TextField {...field} select label="Status" size="small">
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="on_leave">On Leave</MenuItem>
            </TextField>
          )} />
        </div>

        <div className="tms-form-actions">
          <Button type="submit" variant="contained" className="tms-btn-primary">{isEdit ? 'Update Driver' : 'Add Driver'}</Button>
          <Button onClick={() => navigate('/drivers')} className="tms-btn-secondary">Cancel</Button>
        </div>
      </form>
    </Box>
  );
};

export default DriverForm;
