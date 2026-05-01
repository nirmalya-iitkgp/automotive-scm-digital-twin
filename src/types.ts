/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum RiskCategory {
  COMMODITY = 'Commodity',
  ENERGY = 'Energy',
  GEOPOLITICAL = 'Geopolitical',
  LOGISTICS = 'Logistics',
}

export enum ImpactLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical',
}

export interface MaterialSource {
  name: string;
  index: string; // e.g. "LME Copper"
  weight: number; // 0 to 1
}

export interface ComponentData {
  id: string;
  name: string;
  category: string;
  materials: {
    primary: MaterialSource;
    secondary?: MaterialSource;
    tertiary?: MaterialSource;
  };
  sensitivityScore: number; // Calculated default
  supplier?: string;
  weight_kg?: number;
}

export interface MarketIndex {
  id: string;
  name: string;
  currentValue: number;
  change3m: number;
  unit: string;
}
