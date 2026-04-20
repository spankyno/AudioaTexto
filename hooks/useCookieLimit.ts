// hooks/useCookieLimit.ts
// Controls free usage for non-authenticated users: 1 use every 5 days

const COOKIE_NAME = 'aat_guest_last_use';
const DAYS_LIMIT = 5;

function getCookieValue(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookieValue(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires.toUTCString() + '; path=/; SameSite=Lax';
}

export function useCookieLimit() {
  const lastUseRaw = getCookieValue(COOKIE_NAME);

  if (!lastUseRaw) {
    return {
      canUse: true,
      daysLeft: 0,
      markUsed: () => setCookieValue(COOKIE_NAME, new Date().toISOString(), DAYS_LIMIT + 1),
    };
  }

  const lastUse = new Date(lastUseRaw);
  const now = new Date();
  const msDiff = now.getTime() - lastUse.getTime();
  const daysDiff = msDiff / (1000 * 60 * 60 * 24);

  if (daysDiff >= DAYS_LIMIT) {
    return {
      canUse: true,
      daysLeft: 0,
      markUsed: () => setCookieValue(COOKIE_NAME, new Date().toISOString(), DAYS_LIMIT + 1),
    };
  }

  const daysLeft = Math.ceil(DAYS_LIMIT - daysDiff);

  return {
    canUse: false,
    daysLeft,
    markUsed: () => {},
  };
}
