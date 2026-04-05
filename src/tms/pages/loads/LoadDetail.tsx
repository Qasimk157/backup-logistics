import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CircleIcon from '@mui/icons-material/Circle';
import { RootState } from '../../store';
import { updateLoad } from '../../store/tmsSlice';
import StatusBadge from '../../components/StatusBadge';
import { LoadStatus } from '../../types';

const statusOrder: LoadStatus[] = ['posted', 'dispatched', 'picked_up', 'in_transit', 'delivered', 'invoiced'];
const statusLabels: Record<LoadStatus, string> = {
  posted: 'Posted',
  dispatched: 'Dispatched',
  picked_up: 'Picked Up',
  in_transit: 'In Transit',
  delivered: 'Delivered',
  invoiced: 'Invoiced',
};

const LoadDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const load = useSelector((state: RootState) => state.tms.loads.find(l => l.id === id));
  const drivers = useSelector((state: RootState) => state.tms.drivers);
  const vehicles = useSelector((state: RootState) => state.tms.vehicles);

  if (!load) {
    return (
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="h6">Load not found</Typography>
        <Button onClick={() => navigate('/loads')} sx={{ mt: 2 }}>Back to Loads</Button>
      </Box>
    );
  }

  const currentIndex = statusOrder.indexOf(load.status);
  const driver = load.driverId ? drivers.find(d => d.id === load.driverId) : null;
  const vehicle = load.vehicleId ? vehicles.find(v => v.id === load.vehicleId) : null;

  const nextStatus = currentIndex < statusOrder.length - 1 ? statusOrder[currentIndex + 1] : null;

  const advanceStatus = () => {
    if (nextStatus) {
      dispatch(updateLoad({ ...load, status: nextStatus }));
    }
  };

  return (
    <Box>
      <div className="tms-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/loads')} className="tms-btn-secondary">
            Back
          </Button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <h1 className="tms-page-title">{load.loadNumber}</h1>
              <StatusBadge status={load.status} />
            </div>
            <p className="tms-page-subtitle">{load.customerName}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {nextStatus && (
            <Button variant="contained" onClick={advanceStatus} className="tms-btn-primary">
              Mark as {statusLabels[nextStatus]}
            </Button>
          )}
          <Button startIcon={<EditIcon />} onClick={() => navigate(`/loads/${load.id}/edit`)} className="tms-btn-secondary">
            Edit
          </Button>
        </div>
      </div>

      {/* Status Timeline */}
      <div className="tms-detail-card">
        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>Status Timeline</Typography>
        <div className="tms-timeline">
          {statusOrder.map((status, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            return (
              <React.Fragment key={status}>
                <div className="tms-timeline-step">
                  <div className={`tms-timeline-dot ${isCompleted ? 'completed' : isCurrent ? 'active' : 'pending'}`}>
                    {isCompleted ? <CheckCircleIcon sx={{ fontSize: 18 }} /> : isCurrent ? <CircleIcon sx={{ fontSize: 12 }} /> : <RadioButtonUncheckedIcon sx={{ fontSize: 18 }} />}
                  </div>
                  <span className="tms-timeline-label">{statusLabels[status]}</span>
                </div>
                {index < statusOrder.length - 1 && (
                  <div className={`tms-timeline-connector ${index < currentIndex ? 'completed' : 'pending'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Load Details */}
      <div className="tms-detail-card">
        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>Load Information</Typography>
        <div className="tms-detail-grid">
          <div className="tms-detail-item">
            <span className="tms-detail-label">Origin</span>
            <span className="tms-detail-value">{load.origin.city}, {load.origin.state} {load.origin.zip}</span>
          </div>
          <div className="tms-detail-item">
            <span className="tms-detail-label">Destination</span>
            <span className="tms-detail-value">{load.destination.city}, {load.destination.state} {load.destination.zip}</span>
          </div>
          <div className="tms-detail-item">
            <span className="tms-detail-label">Rate</span>
            <span className="tms-detail-value">${load.rate.toLocaleString()}</span>
          </div>
          <div className="tms-detail-item">
            <span className="tms-detail-label">Weight</span>
            <span className="tms-detail-value">{load.weight.toLocaleString()} lbs</span>
          </div>
          <div className="tms-detail-item">
            <span className="tms-detail-label">Miles</span>
            <span className="tms-detail-value">{load.miles}</span>
          </div>
          <div className="tms-detail-item">
            <span className="tms-detail-label">Equipment</span>
            <span className="tms-detail-value">{load.equipmentType}</span>
          </div>
          <div className="tms-detail-item">
            <span className="tms-detail-label">Commodity</span>
            <span className="tms-detail-value">{load.commodity}</span>
          </div>
          <div className="tms-detail-item">
            <span className="tms-detail-label">Pickup Date</span>
            <span className="tms-detail-value">{load.pickupDate}</span>
          </div>
          <div className="tms-detail-item">
            <span className="tms-detail-label">Delivery Date</span>
            <span className="tms-detail-value">{load.deliveryDate}</span>
          </div>
        </div>
      </div>

      {/* Assignment */}
      <div className="tms-detail-card">
        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>Assignment</Typography>
        <div className="tms-detail-grid">
          <div className="tms-detail-item">
            <span className="tms-detail-label">Driver</span>
            <span className="tms-detail-value">{driver ? driver.fullName : 'Unassigned'}</span>
          </div>
          <div className="tms-detail-item">
            <span className="tms-detail-label">Driver Phone</span>
            <span className="tms-detail-value">{driver ? driver.phone : '—'}</span>
          </div>
          <div className="tms-detail-item">
            <span className="tms-detail-label">Vehicle</span>
            <span className="tms-detail-value">{vehicle ? `${vehicle.unitNumber} - ${vehicle.make} ${vehicle.model}` : 'Unassigned'}</span>
          </div>
        </div>
      </div>

      {/* Customer & Notes */}
      <div className="tms-detail-card">
        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 2 }}>Customer & Notes</Typography>
        <div className="tms-detail-grid">
          <div className="tms-detail-item">
            <span className="tms-detail-label">Customer</span>
            <span className="tms-detail-value">{load.customerName}</span>
          </div>
          <div className="tms-detail-item">
            <span className="tms-detail-label">Email</span>
            <span className="tms-detail-value">{load.customerEmail}</span>
          </div>
          <div className="tms-detail-item">
            <span className="tms-detail-label">Special Instructions</span>
            <span className="tms-detail-value">{load.specialInstructions || 'None'}</span>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default LoadDetail;
