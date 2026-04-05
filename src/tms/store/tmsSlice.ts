import { Load, Driver, Vehicle, Invoice } from '../types';
import { mockLoads, mockDrivers, mockVehicles, mockInvoices } from '../mock/data';

export interface TmsState {
  loads: Load[];
  drivers: Driver[];
  vehicles: Vehicle[];
  invoices: Invoice[];
}

const initialState: TmsState = {
  loads: mockLoads,
  drivers: mockDrivers,
  vehicles: mockVehicles,
  invoices: mockInvoices,
};

// Action types
export const TMS_SET_LOADS = 'tms/setLoads';
export const TMS_ADD_LOAD = 'tms/addLoad';
export const TMS_UPDATE_LOAD = 'tms/updateLoad';
export const TMS_DELETE_LOAD = 'tms/deleteLoad';

export const TMS_SET_DRIVERS = 'tms/setDrivers';
export const TMS_ADD_DRIVER = 'tms/addDriver';
export const TMS_UPDATE_DRIVER = 'tms/updateDriver';
export const TMS_DELETE_DRIVER = 'tms/deleteDriver';

export const TMS_SET_VEHICLES = 'tms/setVehicles';
export const TMS_ADD_VEHICLE = 'tms/addVehicle';
export const TMS_UPDATE_VEHICLE = 'tms/updateVehicle';
export const TMS_DELETE_VEHICLE = 'tms/deleteVehicle';

export const TMS_SET_INVOICES = 'tms/setInvoices';
export const TMS_ADD_INVOICE = 'tms/addInvoice';
export const TMS_UPDATE_INVOICE = 'tms/updateInvoice';
export const TMS_DELETE_INVOICE = 'tms/deleteInvoice';

// Action creators
export const setLoads = (loads: Load[]) => ({ type: TMS_SET_LOADS as typeof TMS_SET_LOADS, payload: loads });
export const addLoad = (load: Load) => ({ type: TMS_ADD_LOAD as typeof TMS_ADD_LOAD, payload: load });
export const updateLoad = (load: Load) => ({ type: TMS_UPDATE_LOAD as typeof TMS_UPDATE_LOAD, payload: load });
export const deleteLoad = (id: string) => ({ type: TMS_DELETE_LOAD as typeof TMS_DELETE_LOAD, payload: id });

export const setDrivers = (drivers: Driver[]) => ({ type: TMS_SET_DRIVERS as typeof TMS_SET_DRIVERS, payload: drivers });
export const addDriver = (driver: Driver) => ({ type: TMS_ADD_DRIVER as typeof TMS_ADD_DRIVER, payload: driver });
export const updateDriver = (driver: Driver) => ({ type: TMS_UPDATE_DRIVER as typeof TMS_UPDATE_DRIVER, payload: driver });
export const deleteDriver = (id: string) => ({ type: TMS_DELETE_DRIVER as typeof TMS_DELETE_DRIVER, payload: id });

export const setVehicles = (vehicles: Vehicle[]) => ({ type: TMS_SET_VEHICLES as typeof TMS_SET_VEHICLES, payload: vehicles });
export const addVehicle = (vehicle: Vehicle) => ({ type: TMS_ADD_VEHICLE as typeof TMS_ADD_VEHICLE, payload: vehicle });
export const updateVehicle = (vehicle: Vehicle) => ({ type: TMS_UPDATE_VEHICLE as typeof TMS_UPDATE_VEHICLE, payload: vehicle });
export const deleteVehicle = (id: string) => ({ type: TMS_DELETE_VEHICLE as typeof TMS_DELETE_VEHICLE, payload: id });

export const setInvoices = (invoices: Invoice[]) => ({ type: TMS_SET_INVOICES as typeof TMS_SET_INVOICES, payload: invoices });
export const addInvoice = (invoice: Invoice) => ({ type: TMS_ADD_INVOICE as typeof TMS_ADD_INVOICE, payload: invoice });
export const updateInvoice = (invoice: Invoice) => ({ type: TMS_UPDATE_INVOICE as typeof TMS_UPDATE_INVOICE, payload: invoice });
export const deleteInvoice = (id: string) => ({ type: TMS_DELETE_INVOICE as typeof TMS_DELETE_INVOICE, payload: id });

type TmsAction =
  | { type: typeof TMS_SET_LOADS; payload: Load[] }
  | { type: typeof TMS_ADD_LOAD; payload: Load }
  | { type: typeof TMS_UPDATE_LOAD; payload: Load }
  | { type: typeof TMS_DELETE_LOAD; payload: string }
  | { type: typeof TMS_SET_DRIVERS; payload: Driver[] }
  | { type: typeof TMS_ADD_DRIVER; payload: Driver }
  | { type: typeof TMS_UPDATE_DRIVER; payload: Driver }
  | { type: typeof TMS_DELETE_DRIVER; payload: string }
  | { type: typeof TMS_SET_VEHICLES; payload: Vehicle[] }
  | { type: typeof TMS_ADD_VEHICLE; payload: Vehicle }
  | { type: typeof TMS_UPDATE_VEHICLE; payload: Vehicle }
  | { type: typeof TMS_DELETE_VEHICLE; payload: string }
  | { type: typeof TMS_SET_INVOICES; payload: Invoice[] }
  | { type: typeof TMS_ADD_INVOICE; payload: Invoice }
  | { type: typeof TMS_UPDATE_INVOICE; payload: Invoice }
  | { type: typeof TMS_DELETE_INVOICE; payload: string };

export const tmsReducer = (state = initialState, action: TmsAction): TmsState => {
  switch (action.type) {
    case TMS_SET_LOADS:
      return { ...state, loads: action.payload };
    case TMS_ADD_LOAD:
      return { ...state, loads: [action.payload, ...state.loads] };
    case TMS_UPDATE_LOAD:
      return { ...state, loads: state.loads.map(l => l.id === action.payload.id ? action.payload : l) };
    case TMS_DELETE_LOAD:
      return { ...state, loads: state.loads.filter(l => l.id !== action.payload) };

    case TMS_SET_DRIVERS:
      return { ...state, drivers: action.payload };
    case TMS_ADD_DRIVER:
      return { ...state, drivers: [action.payload, ...state.drivers] };
    case TMS_UPDATE_DRIVER:
      return { ...state, drivers: state.drivers.map(d => d.id === action.payload.id ? action.payload : d) };
    case TMS_DELETE_DRIVER:
      return { ...state, drivers: state.drivers.filter(d => d.id !== action.payload) };

    case TMS_SET_VEHICLES:
      return { ...state, vehicles: action.payload };
    case TMS_ADD_VEHICLE:
      return { ...state, vehicles: [action.payload, ...state.vehicles] };
    case TMS_UPDATE_VEHICLE:
      return { ...state, vehicles: state.vehicles.map(v => v.id === action.payload.id ? action.payload : v) };
    case TMS_DELETE_VEHICLE:
      return { ...state, vehicles: state.vehicles.filter(v => v.id !== action.payload) };

    case TMS_SET_INVOICES:
      return { ...state, invoices: action.payload };
    case TMS_ADD_INVOICE:
      return { ...state, invoices: [action.payload, ...state.invoices] };
    case TMS_UPDATE_INVOICE:
      return { ...state, invoices: state.invoices.map(i => i.id === action.payload.id ? action.payload : i) };
    case TMS_DELETE_INVOICE:
      return { ...state, invoices: state.invoices.filter(i => i.id !== action.payload) };

    default:
      return state;
  }
};
