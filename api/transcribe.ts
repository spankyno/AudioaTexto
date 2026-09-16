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

  // Aceptamos tanto API_KEY como GEMINI_API_KEY para evitar errores de configuración
  // en Vercel, ya que la documentación del proyecto usa GEMINI_API_KEY.
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('Error crítico: no se encontró la variable de entorno API_KEY ni GEMINI_API_KEY.');
    return new Response(JSON.stringify({ error: 'La clave API de Google no está configurada en el servidor. Añade la variable de entorno API_KEY (o GEMINI_API_KEY) en Vercel y vuelve a desplegar.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  try {
    const ai = new GoogleGenAI({ apiKey });

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