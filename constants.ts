import { Doctor } from './types';

// Mock doctors scattered around a central point (approx New Delhi for demo)
// In a real app, these come from the backend based on user location
export const MOCK_DOCTORS: Doctor[] = [
  {
    uid: 'd1',
    name: 'Dr. Anjali Sharma',
    email: 'anjali@clinic.com',
    role: 'doctor',
    speciality: 'General Physician',
    verified: true,
    lat: 28.6139,
    lng: 77.2090,
    clinicAddress: 'Block A, Connaught Place',
    fee: 500,
    available: true,
    photoURL: 'https://picsum.photos/200/200?random=1'
  },
  {
    uid: 'd2',
    name: 'Dr. Rajesh Koothrappali',
    email: 'raj@clinic.com',
    role: 'doctor',
    speciality: 'Dermatologist',
    verified: true,
    lat: 28.6150, 
    lng: 77.2050, // Slightly offset
    clinicAddress: 'Sector 4, Market Road',
    fee: 800,
    available: true,
    photoURL: 'https://picsum.photos/200/200?random=2'
  },
  {
    uid: 'd3',
    name: 'Dr. House MD',
    email: 'house@clinic.com',
    role: 'doctor',
    speciality: 'Diagnostician',
    verified: false,
    lat: 28.6100,
    lng: 77.2150,
    clinicAddress: 'Teaching Hospital',
    fee: 1500,
    available: false,
    photoURL: 'https://picsum.photos/200/200?random=3'
  },
   {
    uid: 'd4',
    name: 'Dr. Sarah Smith',
    email: 'sarah@clinic.com',
    role: 'doctor',
    speciality: 'Pediatrician',
    verified: true,
    lat: 28.6200,
    lng: 77.2200,
    clinicAddress: 'Sunshine Clinic',
    fee: 600,
    available: true,
    photoURL: 'https://picsum.photos/200/200?random=4'
  }
];

export const MOCK_USER_LOCATION = {
  lat: 28.6129,
  lng: 77.2295
};
