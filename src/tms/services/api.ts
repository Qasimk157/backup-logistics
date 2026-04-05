import { Load, Driver, Vehicle, Invoice } from '../types';
import { mockLoads, mockDrivers, mockVehicles, mockInvoices } from '../mock/data';

// Simulate network delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// In-memory copies for CRUD (these would be API calls in production)
let loads = [...mockLoads];
let drivers = [...mockDrivers];
let vehicles = [...mockVehicles];
let invoices = [...mockInvoices];

// ============ LOADS ============

export const loadApi = {
  getAll: async (): Promise<Load[]> => {
    await delay();
    return [...loads];
  },
  getById: async (id: string): Promise<Load | undefined> => {
    await delay();
    return loads.find(l => l.id === id);
  },
  create: async (load: Omit<Load, 'id' | 'createdAt'>): Promise<Load> => {
    await delay();
    const newLoad: Load = {
      ...load,
      id: `l${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    loads = [newLoad, ...loads];
    return newLoad;
  },
  update: async (id: string, updates: Partial<Load>): Promise<Load> => {
    await delay();
    loads = loads.map(l => l.id === id ? { ...l, ...updates } : l);
    return loads.find(l => l.id === id)!;
  },
  delete: async (id: string): Promise<void> => {
    await delay();
    loads = loads.filter(l => l.id !== id);
  },
  updateStatus: async (id: string, status: Load['status']): Promise<Load> => {
    await delay();
    loads = loads.map(l => l.id === id ? { ...l, status } : l);
    return loads.find(l => l.id === id)!;
  },
};

// ============ DRIVERS ============

export const driverApi = {
  getAll: async (): Promise<Driver[]> => {
    await delay();
    return [...drivers];
  },
  getById: async (id: string): Promise<Driver | undefined> => {
    await delay();
    return drivers.find(d => d.id === id);
  },
  create: async (driver: Omit<Driver, 'id'>): Promise<Driver> => {
    await delay();
    const newDriver: Driver = { ...driver, id: `d${Date.now()}` };
    drivers = [newDriver, ...drivers];
    return newDriver;
  },
  update: async (id: string, updates: Partial<Driver>): Promise<Driver> => {
    await delay();
    drivers = drivers.map(d => d.id === id ? { ...d, ...updates } : d);
    return drivers.find(d => d.id === id)!;
  },
  delete: async (id: string): Promise<void> => {
    await delay();
    drivers = drivers.filter(d => d.id !== id);
  },
};

// ============ VEHICLES ============

export const vehicleApi = {
  getAll: async (): Promise<Vehicle[]> => {
    await delay();
    return [...vehicles];
  },
  getById: async (id: string): Promise<Vehicle | undefined> => {
    await delay();
    return vehicles.find(v => v.id === id);
  },
  create: async (vehicle: Omit<Vehicle, 'id'>): Promise<Vehicle> => {
    await delay();
    const newVehicle: Vehicle = { ...vehicle, id: `v${Date.now()}` };
    vehicles = [newVehicle, ...vehicles];
    return newVehicle;
  },
  update: async (id: string, updates: Partial<Vehicle>): Promise<Vehicle> => {
    await delay();
    vehicles = vehicles.map(v => v.id === id ? { ...v, ...updates } : v);
    return vehicles.find(v => v.id === id)!;
  },
  delete: async (id: string): Promise<void> => {
    await delay();
    vehicles = vehicles.filter(v => v.id !== id);
  },
};

// ============ INVOICES ============

export const invoiceApi = {
  getAll: async (): Promise<Invoice[]> => {
    await delay();
    return [...invoices];
  },
  getById: async (id: string): Promise<Invoice | undefined> => {
    await delay();
    return invoices.find(i => i.id === id);
  },
  create: async (invoice: Omit<Invoice, 'id' | 'createdAt'>): Promise<Invoice> => {
    await delay();
    const newInvoice: Invoice = {
      ...invoice,
      id: `inv${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    invoices = [newInvoice, ...invoices];
    return newInvoice;
  },
  update: async (id: string, updates: Partial<Invoice>): Promise<Invoice> => {
    await delay();
    invoices = invoices.map(i => i.id === id ? { ...i, ...updates } : i);
    return invoices.find(i => i.id === id)!;
  },
  delete: async (id: string): Promise<void> => {
    await delay();
    invoices = invoices.filter(i => i.id !== id);
  },
};
