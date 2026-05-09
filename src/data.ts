import { ComponentData } from './types';

export const COMPONENT_LIST: ComponentData[] = [
  {
    id: 'biw-1',
    name: 'Body in White (BIW)',
    category: 'Structure',
    materials: {
      primary: { name: 'High-Strength Steel', index: 'LME Steel', weight: 0.85 },
      secondary: { name: 'Aluminum Stampings', index: 'LME Aluminum', weight: 0.15 }
    },
    sensitivityScore: 6.5,
    supplier: 'Gestamp / Magna Cosma',
    weight_kg: 315.0,
    logisticsSensitivity: 0.85,
    isGlobalSourcing: false,
    substitution: {
      name: 'High-Aluminum BIW',
      rationale: 'Deep lightweighting (approx -30% mass) but creates extreme sensitivity to LME Aluminum and energy price spikes.',
      materials: {
        primary: { name: 'Aluminum 6xxx', index: 'LME Aluminum', weight: 0.70 },
        secondary: { name: 'High-Strength Steel', index: 'LME Steel', weight: 0.30 }
      },
      weight_kg: 220.0
    }
  },
  {
    id: 'bat-1',
    name: 'EV Battery Pack',
    category: 'Powertrain',
    materials: {
      primary: { name: 'Lithium/Nickel/Cobalt', index: 'Rare Earth Index', weight: 0.40 },
      secondary: { name: 'Aluminum Housing', index: 'LME Aluminum', weight: 0.35 },
      tertiary: { name: 'Copper Busbars', index: 'LME Copper', weight: 0.25 }
    },
    sensitivityScore: 9.8,
    supplier: 'CATL / LG Energy / BYD',
    weight_kg: 450.0,
    logisticsSensitivity: 0.70,
    isGlobalSourcing: true,
    substitution: {
      name: 'LFP Battery Config',
      rationale: 'Lower energy density but removes Cobalt/Nickel volatility. Shifts dependency toward lower-cost Iron/Phosphate indices.',
      materials: {
        primary: { name: 'Iron Phosphate', index: 'LME Steel', weight: 0.50 },
        secondary: { name: 'Aluminum Housing', index: 'LME Aluminum', weight: 0.30 },
        tertiary: { name: 'Copper Busbars', index: 'LME Copper', weight: 0.20 }
      },
      weight_kg: 520.0
    }
  },
  {
    id: 'edu-1',
    name: 'Electric Drive Unit (EDU)',
    category: 'Powertrain',
    materials: {
      primary: { name: 'Copper Windings', index: 'LME Copper', weight: 0.45 },
      secondary: { name: 'Rare Earth Magnets', index: 'Rare Earth Index', weight: 0.25 },
      tertiary: { name: 'SiC Power Module', index: 'SOX Index', weight: 0.30 }
    },
    sensitivityScore: 9.5,
    supplier: 'BorgWarner / Bosch / Nidec',
    weight_kg: 86.0,
    logisticsSensitivity: 0.40,
    isGlobalSourcing: true,
    substitution: {
      name: 'Rare-Earth Free Motor',
      rationale: 'Eliminates dependency on volatile Rare Earth Index but requires larger copper windings (+15% copper) and increases overall system weight.',
      materials: {
        primary: { name: 'Copper Windings', index: 'LME Copper', weight: 0.60 },
        secondary: { name: 'Electrical Steel', index: 'LME Steel', weight: 0.30 },
        tertiary: { name: 'SiC Power Module', index: 'SOX Index', weight: 0.10 }
      },
      weight_kg: 98.0
    }
  },
  {
    id: 'trans-1',
    name: 'Auto-Transmission Assembly',
    category: 'Powertrain',
    materials: {
      primary: { name: 'Die-Cast Aluminum Housing', index: 'LME Aluminum', weight: 0.55 },
      secondary: { name: 'Alloy Steel (Gears/Shafts)', index: 'LME Steel', weight: 0.35 },
      tertiary: { name: 'Mechatronics/Semis', index: 'SOX Index', weight: 0.10 }
    },
    sensitivityScore: 8.2,
    supplier: 'ZF / Aisin / Magna',
    weight_kg: 95.0,
    logisticsSensitivity: 0.45,
    isGlobalSourcing: true,
    substitution: {
      name: 'Magnesium Housing Config',
      rationale: 'Advanced lightweighting (-15kg) but creates extreme exposure to high-purity Magnesium markets and energy volatility.',
      materials: {
        primary: { name: 'Magnesium Alloy', index: 'Energy Index', weight: 0.60 },
        secondary: { name: 'Alloy Steel', index: 'LME Steel', weight: 0.30 },
        tertiary: { name: 'Mechatronics', index: 'SOX Index', weight: 0.10 }
      },
      weight_kg: 80.0
    }
  },
  {
    id: 'brk-1',
    name: 'Braking System (Complete)',
    category: 'Chassis',
    materials: {
      primary: { name: 'Cast Iron (Rotors)', index: 'LME Steel', weight: 0.70 },
      secondary: { name: 'Aluminum (Calipers)', index: 'LME Aluminum', weight: 0.20 },
      tertiary: { name: 'Copper (Pads)', index: 'LME Copper', weight: 0.10 }
    },
    sensitivityScore: 6.8,
    supplier: 'Brembo / Bosch / Continental',
    weight_kg: 45.0,
    logisticsSensitivity: 0.30,
    isGlobalSourcing: false,
    substitution: {
      name: 'Ceramic Friction Configuration',
      rationale: 'Ceramic pads/rotors reduce dust and weight by ~50% in rotors, but increase cost by 5-10x and add specialized material dependency.',
      materials: {
        primary: { name: 'Ceramic/Composite', index: 'Energy Index', weight: 0.80 },
        secondary: { name: 'Aluminum Calipers', index: 'LME Aluminum', weight: 0.20 }
      },
      weight_kg: 23.0
    }
  },
  {
    id: 'susp-1',
    name: 'Suspension / Chassis System',
    category: 'Chassis',
    materials: {
      primary: { name: 'Stamped Steel Arms', index: 'LME Steel', weight: 0.75 },
      secondary: { name: 'Aluminum Knuckles', index: 'LME Aluminum', weight: 0.20 },
      tertiary: { name: 'Natural Rubber', index: 'SGX Rubber', weight: 0.05 }
    },
    sensitivityScore: 5.8,
    supplier: 'ZF / Mando / Gabriel',
    weight_kg: 240.0,
    logisticsSensitivity: 0.40,
    isGlobalSourcing: false,
    substitution: {
      name: 'Forged Aluminum Arms',
      rationale: 'Massively reduces unsprung weight. Replaces Steel HRC dependency with LME Aluminum.',
      materials: {
        primary: { name: 'Forged Aluminum', index: 'LME Aluminum', weight: 0.85 },
        secondary: { name: 'Rubber Bushings', index: 'SGX Rubber', weight: 0.15 }
      },
      weight_kg: 180.0
    }
  },
  {
    id: 'eng-1',
    name: 'Cylinder Block (ICE)',
    category: 'Engine',
    materials: {
      primary: { name: 'Cast Iron (class 25)', index: 'LME Steel', weight: 0.85 },
      secondary: { name: 'Aluminum Alloys', index: 'LME Aluminum', weight: 0.10 },
      tertiary: { name: 'Steel Inserts', index: 'LME Steel', weight: 0.05 }
    },
    sensitivityScore: 5.4,
    supplier: 'Federal-Mogul / Mahle',
    weight_kg: 45.0,
    logisticsSensitivity: 0.60,
    isGlobalSourcing: true,
    substitution: {
      name: 'All-Aluminum Block',
      rationale: 'Significant weight reduction (-25kg) but creates 8x higher dependency on LME Aluminum index.',
      materials: {
        primary: { name: 'Aluminum Alloy', index: 'LME Aluminum', weight: 0.80 },
        secondary: { name: 'Steel Liners', index: 'LME Steel', weight: 0.20 }
      },
      weight_kg: 20.0
    }
  },
  {
    id: 'exh-1',
    name: 'Exhaust System',
    category: 'Engine',
    materials: {
      primary: { name: 'Stainless Steel', index: 'LME Steel', weight: 0.90 },
      secondary: { name: 'PGM (Platinum/Palladium)', index: 'Precious Metals Index', weight: 0.05 },
      tertiary: { name: 'Ceramic Substrate', index: 'Energy Index', weight: 0.05 }
    },
    sensitivityScore: 8.9,
    supplier: 'Faurecia / Tenneco / Sharda',
    weight_kg: 22.0,
    logisticsSensitivity: 0.40,
    isGlobalSourcing: false,
    substitution: {
      name: 'Hydroformed Pipe Config',
      rationale: 'Reduces part count and mass (-10%) by replacing welded assemblies with complex hydroformed SS tubes.',
      materials: {
        primary: { name: 'Hydroformed SS', index: 'LME Steel', weight: 0.95 },
        secondary: { name: 'PGM Filter', index: 'Precious Metals Index', weight: 0.05 }
      },
      weight_kg: 19.5
    }
  },
  {
    id: 'wir-1',
    name: 'Vehicle Wiring Harness',
    category: 'Electrical',
    materials: {
      primary: { name: 'Copper Core', index: 'LME Copper', weight: 0.55 },
      secondary: { name: 'PVC/XLPE Insulation', index: 'Brent Crude', weight: 0.35 },
      tertiary: { name: 'Terminals (Zinc/Tin)', index: 'LME Zinc', weight: 0.10 }
    },
    sensitivityScore: 9.4,
    supplier: 'Yazaki / Motherson / Sumitomo',
    weight_kg: 35.0,
    logisticsSensitivity: 0.35,
    isGlobalSourcing: true,
    substitution: {
      name: 'Aluminum Wiring Shift',
      rationale: 'Reduces cost volatility of Copper (approx 40% mass saving). Increases cross-sectional diameter but protects against LME Copper spikes.',
      materials: {
        primary: { name: 'Aluminum Core', index: 'LME Aluminum', weight: 0.65 },
        secondary: { name: 'PVC Insulation', index: 'Brent Crude', weight: 0.25 },
        tertiary: { name: 'Terminals', index: 'LME Zinc', weight: 0.10 }
      },
      weight_kg: 22.0
    }
  },
  {
    id: 'adas-1',
    name: 'ADAS Domain Controller',
    category: 'Electrical',
    materials: {
      primary: { name: 'Processing SoC', index: 'SOX Index', weight: 0.70 },
      secondary: { name: 'PCB Laminates', index: 'LME Copper', weight: 0.20 },
      tertiary: { name: 'Aluminum Housing', index: 'LME Aluminum', weight: 0.10 }
    },
    sensitivityScore: 9.7,
    supplier: 'Continental / Bosch / NVIDIA',
    weight_kg: 3.5,
    logisticsSensitivity: 0.15,
    isGlobalSourcing: true
  },
  {
    id: 'ivi-1',
    name: 'Infotainment System (IVI)',
    category: 'Electrical',
    materials: {
      primary: { name: 'LCD Display Panel', index: 'Energy Index', weight: 0.40 },
      secondary: { name: 'Application Processor', index: 'SOX Index', weight: 0.35 },
      tertiary: { name: 'PCB/Copper traces', index: 'LME Copper', weight: 0.25 }
    },
    sensitivityScore: 9.2,
    supplier: 'Harman / Visteon / Panasonic',
    weight_kg: 7.0,
    logisticsSensitivity: 0.20,
    isGlobalSourcing: true
  },
  {
    id: 'seat-1',
    name: 'Driver Seat System',
    category: 'Interior',
    materials: {
      primary: { name: 'Steel Frame', index: 'LME Steel', weight: 0.60 },
      secondary: { name: 'PU Foam (Polyol)', index: 'Brent Crude', weight: 0.30 },
      tertiary: { name: 'Fabric/Leather', index: 'Precious Metals Index', weight: 0.10 }
    },
    sensitivityScore: 6.2,
    supplier: 'Lear / Adient / Toyota Boshoku',
    weight_kg: 25.0,
    logisticsSensitivity: 0.50,
    isGlobalSourcing: false,
    substitution: {
      name: 'HSS Seat Frame',
      rationale: 'High-Strength Steel allows for thinner gauges, reducing weight while maintaining Steel HRC index linkage.',
      materials: {
        primary: { name: 'HS Steel', index: 'LME Steel', weight: 0.70 },
        secondary: { name: 'Bio-PU Foam', index: 'Brent Crude', weight: 0.30 }
      },
      weight_kg: 19.5
    }
  },
  {
    id: 'ext-1',
    name: 'Front Bumper Assembly',
    category: 'Exterior',
    materials: {
      primary: { name: 'TPO (Polypropylene)', index: 'Brent Crude', weight: 0.75 },
      secondary: { name: 'EPP Foam', index: 'Brent Crude', weight: 0.15 },
      tertiary: { name: 'Steel Reinforcement', index: 'LME Steel', weight: 0.10 }
    },
    sensitivityScore: 7.8,
    supplier: 'Magna / Forvia / Motherson',
    weight_kg: 11.0,
    logisticsSensitivity: 0.60,
    isGlobalSourcing: false,
    substitution: {
      name: 'LGF-PP Bumper',
      rationale: 'Long Glass Fibre Reinforced PP reduces mass while maintaining structural integrity. Reduces dependency on steel inserts.',
      materials: {
        primary: { name: 'LGF-PP Composite', index: 'Brent Crude', weight: 0.85 },
        secondary: { name: 'TPO Skin', index: 'Brent Crude', weight: 0.15 }
      },
      weight_kg: 8.8
    }
  },
  {
    id: 'gls-1',
    name: 'Laminated Windshield',
    category: 'Glass',
    materials: {
      primary: { name: 'Safety Glass', index: 'Energy Index', weight: 0.90 },
      secondary: { name: 'PVB Interlayer', index: 'Brent Crude', weight: 0.08 },
      tertiary: { name: 'Silica/Soda Ash', index: 'Energy Index', weight: 0.02 }
    },
    sensitivityScore: 8.7,
    supplier: 'Saint-Gobain / AGC / Fuyao',
    weight_kg: 18.0,
    logisticsSensitivity: 0.35,
    isGlobalSourcing: true,
    substitution: {
      name: 'Thin-Wall Glazing',
      rationale: 'Reduction from 4mm to 3.5mm thickness. Lowers mass (-15%) and energy exposure during fabrication.',
      materials: {
        primary: { name: 'Thin Safety Glass', index: 'Energy Index', weight: 0.90 },
        secondary: { name: 'Acoustic PVB', index: 'Brent Crude', weight: 0.10 }
      },
      weight_kg: 15.3
    }
  },
  {
    id: 'wheel-1',
    name: 'Wheels & Tyres (Set of 4)',
    category: 'Chassis',
    materials: {
      primary: { name: 'Aluminum Alloy (Wheels)', index: 'LME Aluminum', weight: 0.60 },
      secondary: { name: 'Natural Rubber (Tyres)', index: 'SGX Rubber', weight: 0.30 },
      tertiary: { name: 'Steel Cord', index: 'LME Steel', weight: 0.10 }
    },
    sensitivityScore: 8.4,
    supplier: 'MRF / Apollo / Bridgestone',
    weight_kg: 80.0,
    logisticsSensitivity: 0.30,
    isGlobalSourcing: false,
    substitution: {
      name: 'Flow-Formed Alloys',
      rationale: 'Reduces wheel mass (-12%) while maintaining material linkage to Aluminum index.',
      materials: {
        primary: { name: 'Flow-Formed Aluminum', index: 'LME Aluminum', weight: 0.65 },
        secondary: { name: 'Natural Rubber', index: 'SGX Rubber', weight: 0.35 }
      },
      weight_kg: 70.0
    }
  },
  {
    id: 'hvac-1',
    name: 'HVAC Unit (AHU)',
    category: 'Climate',
    materials: {
      primary: { name: 'PP Housing', index: 'Brent Crude', weight: 0.50 },
      secondary: { name: 'Aluminum Core', index: 'LME Aluminum', weight: 0.40 },
      tertiary: { name: 'Copper Tubes', index: 'LME Copper', weight: 0.10 }
    },
    sensitivityScore: 7.5,
    supplier: 'Subros / Denso / Valeo',
    weight_kg: 9.5,
    logisticsSensitivity: 0.25,
    isGlobalSourcing: true
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
  { id: 'metals', name: 'Precious Metals Index', currentValue: 110, change3m: 2.1, unit: 'PTS' },
  { id: 'freight', name: 'Global Freight Index', currentValue: 3450, change3m: 45.0, unit: 'USD/FEU' }
];

export const HISTORICAL_SHOCKS = [
  { month: 'Nov', 'Brent Crude': -5.2, 'LME Copper': 2.1, 'SOX Index': 10.4, 'LME Steel': -1.5 },
  { month: 'Dec', 'Brent Crude': -2.1, 'LME Copper': 4.5, 'SOX Index': 15.2, 'LME Steel': 0.8 },
  { month: 'Jan', 'Brent Crude': 4.5, 'LME Copper': 8.2, 'SOX Index': 18.1, 'LME Steel': 3.2 },
  { month: 'Feb', 'Brent Crude': 8.2, 'LME Copper': 10.5, 'SOX Index': 20.4, 'LME Steel': 5.1 },
  { month: 'Mar', 'Brent Crude': 12.1, 'LME Copper': 11.2, 'SOX Index': 21.5, 'LME Steel': 6.8 },
  { month: 'Apr', 'Brent Crude': 15.0, 'LME Copper': 12.5, 'SOX Index': 22.4, 'LME Steel': 8.1 },
];
