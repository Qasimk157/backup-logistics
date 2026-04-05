// ============================================
// TMS TypeScript Interfaces
// ============================================

export interface User {
  id: string;
  fullName: string;
  email: string;
  company: string;
  role: 'admin' | 'dispatcher' | 'driver' | 'accountant';
  phone?: string;
}

export interface Address {
  city: string;
  state: string;
  zip: string;
}

export type LoadStatus = 'posted' | 'dispatched' | 'picked_up' | 'in_transit' | 'delivered' | 'invoiced';
export type EquipmentType = 'Dry Van' | 'Reefer' | 'Flatbed' | 'Step Deck' | 'Tanker';

export interface Load {
  id: string;
  loadNumber: string;
  origin: Address;
  destination: Address;
  status: LoadStatus;
  rate: number;
  weight: number;
  commodity: string;
  equipmentType: EquipmentType;
  pickupDate: string;
  deliveryDate: string;
  driverId: string | null;
  vehicleId: string | null;
  customerName: string;
  customerEmail: string;
  specialInstructions: string;
  miles: number;
  createdAt: string;
}

export type DriverStatus = 'active' | 'inactive' | 'on_leave';

export interface Driver {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  cdlNumber: string;
  cdlExpiry: string;
  hireDate: string;
  status: DriverStatus;
  emergencyContact: string;
  currentLoadId: string | null;
}

export type VehicleType = 'Truck' | 'Trailer';
export type VehicleStatus = 'active' | 'maintenance' | 'out_of_service';

export interface Vehicle {
  id: string;
  unitNumber: string;
  type: VehicleType;
  make: string;
  model: string;
  year: number;
  vin: string;
  licensePlate: string;
  status: VehicleStatus;
  mileage: number;
  lastServiceDate: string;
  nextServiceDue: string;
}

export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  loadId: string;
  loadNumber: string;
  customerName: string;
  customerEmail: string;
  lineItems: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  dueDate: string;
  createdAt: string;
  paidAt: string | null;
  notes: string;
}
