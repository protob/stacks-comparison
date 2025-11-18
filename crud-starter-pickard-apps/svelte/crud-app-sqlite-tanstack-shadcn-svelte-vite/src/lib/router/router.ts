// src/lib/router/router.ts
export type Route =
  | { name: 'home' }
  | { name: 'about' }
  | { name: 'item-detail'; categorySlug: string; itemSlug: string };

export function resolveRoute(pathname: string): Route {
  if (pathname === '/' || pathname === '') {
    return { name: 'home' };
  }
  if (pathname === '/about') {
    return { name: 'about' };
  }

  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] === 'items' && parts.length === 3) {
    const [, categorySlug, itemSlug] = parts;
    return { name: 'item-detail', categorySlug, itemSlug };
  }

  // fallback: home
  return { name: 'home' };
}

export function navigate(path: string) {
  if (window.location.pathname !== path) {
    history.pushState({}, '', path);
    const event = new CustomEvent('app:navigated', { detail: path });
    window.dispatchEvent(event);
  }
}