// Este servicio ahora llama a nuestra propia API backend (función serverless de Vercel)
const API_ENDPOINT = '/api/transcribe';

export const transcribeWithWhisper = async (audioFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', audioFile);

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      // El error ahora viene de nuestra propia API, que debería darnos un mensaje claro.
      throw new Error(data.error || `Error del servidor: ${response.statusText}`);
    }
    
    return data.transcription;
  } catch (error) {
    console.error("Error al llamar a la API de transcripción:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("No se pudo conectar con el servicio de transcripción.");
  }
};