export interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  category: string;
}

export interface BlockFacility {
  id: string;
  name: string;
  size: string;
  dimensions?: string;
  surfaceArea?: string;
  facilities: string[];
  details: string[];
}

export interface LabourData {
  no: number;
  position: string;
  count: number;
  origin: string;
}

export interface BusinessProcessStep {
  id: string;
  title: string;
  description: string;
  details: string[];
  iconName: string;
}

export interface LegalComplianceItem {
  category: 'HEALTH' | 'SAFETY' | 'ENVIRONMENT';
  title: string;
  points: string[];
}

export interface EmergencyTeam {
  name: string;
  leader: string;
  description: string;
  members: string[];
}

export interface HotlineNumber {
  label: string;
  number: string;
}
