// src/utils/api.ts
export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const baseHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    (baseHeaders as any).Authorization = `Bearer ${token}`;
  }

  return fetch(url, {
    ...options,
    headers: baseHeaders,
  });
}
