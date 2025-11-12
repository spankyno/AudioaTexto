const OPENAI_API_URL = 'https://api.openai.com/v1/audio/transcriptions';

export const transcribeWithWhisper = async (audioFile: File, apiKey: string): Promise<string> => {
  if (!apiKey) {
    throw new Error("La clave API de OpenAI no ha sido proporcionada.");
  }

  const formData = new FormData();
  formData.append('file', audioFile);
  formData.append('model', 'whisper-1');

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      let errorMessage = `Error de la API: ${response.statusText}`;
      if (data && data.error && data.error.message) {
        errorMessage = data.error.message;
      }
      if (response.status === 401) {
          throw new Error('La clave API de OpenAI no es válida. Por favor, verifícala.');
      }
      throw new Error(errorMessage);
    }
    
    return data.text;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    if (error instanceof Error) {
        throw error;
    }
    throw new Error("No se pudo conectar con la API de OpenAI.");
  }
};
