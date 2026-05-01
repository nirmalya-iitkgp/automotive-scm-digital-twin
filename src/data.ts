import { ComponentData } from './types';

export const COMPONENT_LIST: ComponentData[] = [
  {
    id: 'ext-1',
    name: 'Front Bumper',
    category: 'Exterior Trims',
    materials: {
      primary: { name: 'PP-TPO', index: 'Brent Crude', weight: 0.70 },
      secondary: { name: 'EPP Foam', index: 'Brent Crude', weight: 0.20 },
      tertiary: { name: 'Steel Brackets', index: 'LME Steel', weight: 0.10 }
    },
    sensitivityScore: 8.5,
    supplier: 'Supplier A',
    weight_kg: 7.5
  },
  {
    id: 'int-1',
    name: 'Front Door Trims',
    category: 'Interior Trims',
    materials: {
      primary: { name: 'PP Substrate', index: 'Brent Crude', weight: 0.55 },
      secondary: { name: 'Fabric/PU', index: 'Brent Crude', weight: 0.25 },
      tertiary: { name: 'Foam', index: 'Brent Crude', weight: 0.15 }
    },
    sensitivityScore: 7.8,
    supplier: 'Supplier K',
    weight_kg: 6.0
  },
  {
    id: 'ip-1',
    name: 'Instrument Panel',
    category: 'IP & Console',
    materials: {
      primary: { name: 'PP', index: 'Brent Crude', weight: 0.45 },
      secondary: { name: 'Steel Beam', index: 'LME Steel', weight: 0.25 },
      tertiary: { name: 'PU Foam', index: 'Brent Crude', weight: 0.15 }
    },
    sensitivityScore: 6.9,
    supplier: 'Supplier R',
    weight_kg: 16.0
  },
  {
    id: 'seat-1',
    name: 'Driver Seat',
    category: 'Seats',
    materials: {
      primary: { name: 'Steel Frame', index: 'LME Steel', weight: 0.55 },
      secondary: { name: 'PU Foam', index: 'Brent Crude', weight: 0.25 },
      tertiary: { name: 'Fabric', index: 'Brent Crude', weight: 0.15 }
    },
    sensitivityScore: 6.2,
    supplier: 'Supplier U',
    weight_kg: 18.0
  },
  {
    id: 'gls-1',
    name: 'Windshield (WS)',
    category: 'Glass',
    materials: {
      primary: { name: 'Laminated Glass', index: 'Energy Index', weight: 0.90 },
      secondary: { name: 'PVB Interlayer', index: 'Brent Crude', weight: 0.08 },
      tertiary: { name: 'Mirror Boss / Seals', index: 'LME Steel', weight: 0.02 }
    },
    sensitivityScore: 8.7,
    supplier: 'Supplier V',
    weight_kg: 12.0
  },
  {
    id: 'eng-1',
    name: 'Cylinder Block',
    category: 'Engine',
    materials: {
      primary: { name: 'Cast Iron', index: 'LME Steel', weight: 0.75 },
      secondary: { name: 'Aluminum', index: 'LME Aluminum', weight: 0.20 },
      tertiary: { name: 'Steel Inserts', index: 'LME Steel', weight: 0.05 }
    },
    sensitivityScore: 5.4,
    supplier: 'Supplier BG',
    weight_kg: 28.0
  },
  {
    id: 'brk-1',
    name: 'Front Calipers',
    category: 'Brakes',
    materials: {
      primary: { name: 'Cast Iron', index: 'LME Steel', weight: 0.85 },
      secondary: { name: 'Aluminum Piston', index: 'LME Aluminum', weight: 0.10 },
      tertiary: { name: 'Rubber Seals', index: 'Brent Crude', weight: 0.05 }
    },
    sensitivityScore: 6.1,
    supplier: 'Supplier AE',
    weight_kg: 6.5
  },
  {
    id: 'wir-1',
    name: 'Vehicle Wiring Harness',
    category: 'Wiring Harness',
    materials: {
      primary: { name: 'Copper', index: 'LME Copper', weight: 0.55 },
      secondary: { name: 'PVC Insulation', index: 'Brent Crude', weight: 0.35 },
      tertiary: { name: 'Connectors/Terminals', index: 'LME Zinc', weight: 0.10 }
    },
    sensitivityScore: 9.4,
    supplier: 'Supplier BU',
    weight_kg: 18.0
  },
  {
    id: 'rot-1',
    name: 'Alternator',
    category: 'Rotating Machines',
    materials: {
      primary: { name: 'Copper', index: 'LME Copper', weight: 0.35 },
      secondary: { name: 'Steel', index: 'LME Steel', weight: 0.25 },
      tertiary: { name: 'Aluminum', index: 'LME Aluminum', weight: 0.35 }
    },
    sensitivityScore: 9.1,
    supplier: 'Supplier BV',
    weight_kg: 6.0
  }
];

export const MARKET_INDICES = [
  { id: 'lme-cu', name: 'LME Copper', currentValue: 9200, change3m: 12.5, unit: 'USD/mt' },
  { id: 'lme-al', name: 'LME Aluminum', currentValue: 2450, change3m: -4.2, unit: 'USD/mt' },
  { id: 'lme-st', name: 'LME Steel', currentValue: 580, change3m: 8.1, unit: 'USD/mt' },
  { id: 'lme-zn', name: 'LME Zinc', currentValue: 2800, change3m: 3.5, unit: 'USD/mt' },
  { id: 'lme-ni', name: 'LME Nickel', currentValue: 18500, change3m: -10.2, unit: 'USD/mt' },
  { id: 'brent', name: 'Brent Crude', currentValue: 85.4, change3m: 15.0, unit: 'USD/bbl' },
  { id: 'sox', name: 'SOX Index', currentValue: 4850, change3m: 22.4, unit: 'PTS' },
  { id: 'sgx-ru', name: 'SGX Rubber', currentValue: 165, change3m: 6.8, unit: 'USc/kg' },
  { id: 'energy', name: 'Energy Index', currentValue: 145, change3m: 5.2, unit: 'PTS' },
  { id: 'rare', name: 'Rare Earth Index', currentValue: 320, change3m: 18.2, unit: 'PTS' },
  { id: 'metals', name: 'Precious Metals Index', currentValue: 110, change3m: 2.1, unit: 'PTS' }
];

export const HISTORICAL_SHOCKS = [
  { month: 'Nov', 'Brent Crude': -5.2, 'LME Copper': 2.1, 'SOX Index': 10.4, 'LME Steel': -1.5 },
  { month: 'Dec', 'Brent Crude': -2.1, 'LME Copper': 4.5, 'SOX Index': 15.2, 'LME Steel': 0.8 },
  { month: 'Jan', 'Brent Crude': 4.5, 'LME Copper': 8.2, 'SOX Index': 18.1, 'LME Steel': 3.2 },
  { month: 'Feb', 'Brent Crude': 8.2, 'LME Copper': 10.5, 'SOX Index': 20.4, 'LME Steel': 5.1 },
  { month: 'Mar', 'Brent Crude': 12.1, 'LME Copper': 11.2, 'SOX Index': 21.5, 'LME Steel': 6.8 },
  { month: 'Apr', 'Brent Crude': 15.0, 'LME Copper': 12.5, 'SOX Index': 22.4, 'LME Steel': 8.1 },
];
