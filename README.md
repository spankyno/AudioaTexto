# Audio a Texto — by Aitor Sánchez Gutiérrez

Herramienta web gratuita para transcribir archivos de audio a texto mediante IA (Google Gemini 2.5 Flash).

## Stack tecnológico

- **Frontend**: React 19 + TypeScript + Tailwind CSS + Vite 6
- **IA**: Google Gemini 2.5 Flash (`@google/genai`)
- **Autenticación**: Clerk (`@clerk/clerk-react`)
- **Backend**: Vercel Edge Functions
- **Hosting**: Vercel

## Características

- Transcripción de audio con IA
- Autenticación con Clerk (registro/login)
- Sistema de cookies: usuarios invitados tienen 1 uso gratuito cada 5 días
- Footer con página "Acerca de" con stack tecnológico y datos de contacto

## Configuración

1. Clona el repositorio e instala dependencias:
   ```bash
   npm install
   ```

2. Copia `.env.example` a `.env.local` y rellena las claves:
   ```bash
   cp .env.example .env.local
   ```

3. Variables de entorno necesarias:

   | Variable | Descripción |
   |---|---|
   | `GEMINI_API_KEY` | API Key de Google AI Studio (servidor) |
   | `VITE_CLERK_PUBLISHABLE_KEY` | Publishable Key de Clerk (cliente) |

4. En Vercel, añade también `GEMINI_API_KEY` como variable de entorno del servidor.

## Clerk — Configuración rápida

1. Ve a [dashboard.clerk.com](https://dashboard.clerk.com) y crea una aplicación.
2. Copia la **Publishable Key** → `VITE_CLERK_PUBLISHABLE_KEY`.
3. (Opcional) Personaliza los métodos de inicio de sesión en el dashboard de Clerk.

## Desarrollo local

```bash
npm run dev
```

## Despliegue en Vercel

```bash
vercel --prod
```

---

**Autor:** Aitor Sánchez Gutiérrez © 2026 — Reservados todos los derechos  
**Correo:** blog.cottage627@passinbox.com  
**Contacto:** https://aitorsanchez.pages.dev/contacto/
**Blog:** https://aitorsanchez.pages.dev/
**Más apps:** https://aitorhub.vercel.app/
