import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoadList from './pages/loads/LoadList';
import LoadForm from './pages/loads/LoadForm';
import LoadDetail from './pages/loads/LoadDetail';
import DispatchBoard from './pages/dispatch/DispatchBoard';
import DriverList from './pages/fleet/DriverList';
import DriverForm from './pages/fleet/DriverForm';
import VehicleList from './pages/fleet/VehicleList';
import VehicleForm from './pages/fleet/VehicleForm';
import InvoiceList from './pages/invoicing/InvoiceList';
import InvoiceForm from './pages/invoicing/InvoiceForm';
import InvoiceDetail from './pages/invoicing/InvoiceDetail';

const TmsRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/loads" element={<LoadList />} />
      <Route path="/loads/new" element={<LoadForm />} />
      <Route path="/loads/:id" element={<LoadDetail />} />
      <Route path="/loads/:id/edit" element={<LoadForm />} />
      <Route path="/dispatch" element={<DispatchBoard />} />
      <Route path="/drivers" element={<DriverList />} />
      <Route path="/drivers/new" element={<DriverForm />} />
      <Route path="/drivers/:id/edit" element={<DriverForm />} />
      <Route path="/vehicles" element={<VehicleList />} />
      <Route path="/vehicles/new" element={<VehicleForm />} />
      <Route path="/vehicles/:id/edit" element={<VehicleForm />} />
      <Route path="/invoices" element={<InvoiceList />} />
      <Route path="/invoices/new" element={<InvoiceForm />} />
      <Route path="/invoices/:id" element={<InvoiceDetail />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default TmsRoutes;
