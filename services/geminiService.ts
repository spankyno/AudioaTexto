
import { GoogleGenAI } from "@google/genai";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove "data:*/*;base64," prefix
      resolve(result.split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const transcribeAudio = async (audioFile: File): Promise<string> => {
  if (!process.env.API_KEY) {
    throw new Error("La variable de entorno API_KEY no está configurada.");
  }
  
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const audioData64 = await fileToBase64(audioFile);

  const audioPart = {
    inlineData: {
      mimeType: audioFile.type,
      data: audioData64,
    },
  };

  const textPart = {
    text: "Transcribe el siguiente audio. Responde únicamente con el texto transcrito.",
  };

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: { parts: [audioPart, textPart] },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        if (error.message.includes('API key not valid')) {
            throw new Error('La clave API no es válida. Por favor, verifica tu clave.');
        }
         if (error.message.includes('429')) {
            throw new Error('Se ha superado el límite de solicitudes. Inténtalo de nuevo más tarde.');
        }
    }
    throw new Error("No se pudo conectar con la API de Gemini.");
  }
};
