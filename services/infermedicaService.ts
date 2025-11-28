
import { SymptomAnalysisResult } from "../types";

// In a real app, this would be an environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const checkSymptoms = async (
  symptoms: string, 
  age: number, 
  sex: 'male' | 'female'
): Promise<SymptomAnalysisResult> => {
  try {
    // Attempt to call the backend endpoint
    // NOTE: Since the backend is reference-only in this demo environment, 
    // this fetch will likely fail or needs to be mocked.
    const response = await fetch(`${API_URL}/symptom-checker`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: symptoms, age, sex })
    });

    if (response.ok) {
      return await response.json();
    }
    throw new Error('Backend not available');
  } catch (error) {
    console.warn("Using mock Infermedica data due to API/Backend unavailability.");
    
    // FALLBACK MOCK DATA
    // Simulating intelligent analysis based on keywords
    const lowerText = symptoms.toLowerCase();
    
    if (lowerText.includes('chest') && lowerText.includes('pain')) {
      return {
        conditions: [
          { id: 'c1', name: 'Myocardial Infarction', common_name: 'Heart Attack', probability: 0.85 },
          { id: 'c2', name: 'Gastroesophageal reflux', common_name: 'Acid Reflux', probability: 0.10 }
        ],
        triage: {
          triage_level: 'emergency',
          serious: [{ id: 's1', name: 'Chest pain', is_emergency: true }]
        }
      };
    }
    
    if (lowerText.includes('fever') || lowerText.includes('headache')) {
      return {
        conditions: [
          { id: 'c3', name: 'Viral pharyngitis', common_name: 'Viral Sore Throat', probability: 0.65 },
          { id: 'c4', name: 'Influenza', common_name: 'Flu', probability: 0.30 }
        ],
        triage: {
          triage_level: 'self_care',
          serious: []
        }
      };
    }

    return {
      conditions: [
        { id: 'c5', name: 'Common Cold', common_name: 'Cold', probability: 0.70 },
        { id: 'c6', name: 'Allergic rhinitis', common_name: 'Allergy', probability: 0.20 }
      ],
      triage: {
        triage_level: 'self_care',
        serious: []
      }
    };
  }
};
