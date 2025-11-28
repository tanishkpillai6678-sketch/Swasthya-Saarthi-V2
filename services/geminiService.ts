import { GoogleGenAI, Type } from "@google/genai";
import { Remedy, Medicine } from "../types";

// NOTE: In a real production app, you should proxy these calls through your backend 
// to keep your API key secure. For this demo, we use it client-side.
const apiKey = process.env.API_KEY || ''; 

let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const analyzeSymptoms = async (symptoms: string): Promise<Remedy[]> => {
  if (!ai) {
    // Fallback if no key provided
    return [
      {
        id: 'mock-1',
        title: 'Stay Hydrated & Rest (Mock)',
        description: 'It seems you have mild symptoms. Rest is best.',
        ingredients: ['Water', 'Sleep', 'Vitamin C'],
        steps: ['Drink 2L water', 'Sleep 8 hours'],
        severity: 'mild',
        disclaimer: 'This is mock data because no API key was detected.'
      }
    ];
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `User symptoms: ${symptoms}. Suggest 3 home remedies and triage the severity.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
              steps: { type: Type.ARRAY, items: { type: Type.STRING } },
              severity: { type: Type.STRING, enum: ['mild', 'moderate', 'severe'] },
              disclaimer: { type: Type.STRING }
            }
          }
        }
      }
    });
    
    return JSON.parse(response.text || '[]') as Remedy[];
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};

export const getMedicineInfo = async (medicineName: string): Promise<Medicine | null> => {
  if (!ai) {
    return {
      name: medicineName,
      category: 'Analgesic (Mock)',
      uses: ['Pain relief', 'Fever reduction'],
      sideEffects: ['Nausea', 'Dizziness'],
      dosageNote: 'Take one pill after food. (Mock)',
      warnings: ['Consult doctor if pregnant']
    };
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Provide structured medical information for the drug: ${medicineName}. Be concise but accurate.`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            category: { type: Type.STRING },
            uses: { type: Type.ARRAY, items: { type: Type.STRING } },
            sideEffects: { type: Type.ARRAY, items: { type: Type.STRING } },
            dosageNote: { type: Type.STRING },
            warnings: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    return JSON.parse(response.text || '{}') as Medicine;
  } catch (error) {
    console.error("Gemini Medicine Error:", error);
    return null;
  }
};
