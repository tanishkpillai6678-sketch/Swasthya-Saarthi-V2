
export type Role = 'user' | 'doctor' | 'admin';

export interface User {
  uid: string;
  name: string;
  email: string;
  role: Role;
  photoURL?: string;
}

export interface Doctor extends User {
  speciality: string;
  verified: boolean;
  lat: number;
  lng: number;
  clinicAddress: string;
  fee: number;
  available: boolean;
}

export interface Remedy {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  severity: 'mild' | 'moderate' | 'severe';
  disclaimer: string;
}

export interface Medicine {
  name: string;
  category: string;
  uses: string[];
  sideEffects: string[];
  dosageNote: string;
  warnings: string[];
}

export interface Location {
  lat: number;
  lng: number;
}

// Infermedica Types
export interface DiagnosisCondition {
  id: string;
  name: string;
  common_name: string;
  probability: number;
}

export interface TriageResult {
  triage_level: 'emergency' | 'consultation' | 'self_care';
  serious: {
    id: string;
    name: string;
    is_emergency: boolean;
  }[];
}

export interface SymptomAnalysisResult {
  conditions: DiagnosisCondition[];
  triage: TriageResult;
}

// Chat Types
export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  status: 'sent' | 'delivered' | 'read';
}

export interface Consultation {
  id: string;
  doctorId: string;
  userId: string;
  doctorName: string;
  doctorPhoto?: string;
  status: 'active' | 'completed';
}
