// Este servicio ahora llama a nuestra propia API backend (función serverless de Vercel)
const API_ENDPOINT = '/api/transcribe';

export const transcribeAudio = async (audioFile: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', audioFile);

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      body: formData,
    });

    const rawBody = await response.text();
    let data: { transcription?: string; error?: string };
    try {
      data = rawBody ? JSON.parse(rawBody) : {};
    } catch {
      // La respuesta no es JSON: normalmente significa que la propia plataforma
      // (Vercel) cortó la función antes de que nuestro código respondiera
      // (por timeout, payload demasiado grande, etc.), en vez de un error
      // controlado de nuestra API.
      console.error('Respuesta no válida del servidor:', rawBody);
      throw new Error(
        response.status === 413
          ? 'El archivo es demasiado grande para el servidor.'
          : 'El servidor no respondió correctamente (puede que el archivo sea muy grande o haya tardado demasiado). Inténtalo con un archivo más corto o vuelve a intentarlo.'
      );
    }

    if (!response.ok) {
      // El error ahora viene de nuestra propia API, que debería darnos un mensaje claro.
      throw new Error(data.error || `Error del servidor: ${response.statusText}`);
    }
    
    return data.transcription ?? '';
  } catch (error) {
    console.error("Error al llamar a la API de transcripción:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("No se pudo conectar con el servicio de transcripción.");
  }
};