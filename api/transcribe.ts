// Vercel Edge Function
// Ubicación: /api/transcribe.ts
import { GoogleGenAI } from "@google/genai";

export const config = {
  runtime: 'edge',
  // Aumentar el tamaño máximo de la carga útil para archivos de audio más grandes
  maxDuration: 30, 
};

// Función para convertir un Blob/File en una cadena Base64 compatible con Edge
async function fileToGenerativePart(file: File) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64Data = buffer.toString('base64');
  
  return {
    inlineData: { data: base64Data, mimeType: file.type },
  };
}


export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!process.env.API_KEY) {
    console.error('Error crítico: La variable de entorno API_KEY no está configurada.');
    return new Response(JSON.stringify({ error: 'La clave API de Google no está configurada en el servidor.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const formData = await req.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return new Response(JSON.stringify({ error: 'No se ha subido ningún archivo válido.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const audioPart = await fileToGenerativePart(file);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{
        parts: [
          { text: "Transcribe el siguiente audio:" },
          audioPart
        ]
      }],
    });

    const transcription = response.text;

    return new Response(JSON.stringify({ transcription }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error al contactar con la API de Gemini:', error);
    const errorMessage = error instanceof Error ? error.message : 'Ha ocurrido un error inesperado en el servidor.';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}