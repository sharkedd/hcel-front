let getAccessToken: (() => string | null) | null = null;
let setAccessTokenGlobal: ((token: string | null) => void) | null = null;
let getRefreshToken: (() => string | null) | null = null;
let logoutGlobal: (() => void) | null = null;

// Esta función será llamada desde AuthProvider para registrar callbacks
export function registerAuthHandlers(handlers: {
  getAccessToken: () => string | null;
  setAccessToken: (token: string | null) => void;
  getRefreshToken: () => string | null;
  logout: () => void;
}) {
  getAccessToken = handlers.getAccessToken;
  setAccessTokenGlobal = handlers.setAccessToken;
  getRefreshToken = handlers.getRefreshToken;
  logoutGlobal = handlers.logout;
}

async function refreshAccessToken(): Promise<string | null> {
  if (!getRefreshToken || !setAccessTokenGlobal || !logoutGlobal) return null;

  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    logoutGlobal();
    return null;
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!response.ok) {
      logoutGlobal();
      return null;
    }

    const data = await response.json();

    // El backend debe devolver accessToken como string
    const newAccessToken = data.accessToken as string;

    // Guardar el nuevo token
    setAccessTokenGlobal(newAccessToken);

    return newAccessToken;
  } catch (err) {
    logoutGlobal();
    return null;
  }
}

export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = import.meta.env.VITE_API_URL;

  let token = getAccessToken ? getAccessToken() : null;

  const doFetch = async (accessToken?: string | null) => {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    });

    return response;
  };

  // Primer intento
  let response = await doFetch(token);

  // Si responde 401 → refrescar token
  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    if (!newToken) {
      throw new Error("No autorizado");
    }

    response = await doFetch(newToken);
  }

  if (!response.ok) {
    throw new Error(`Error en la API: ${response.status}`);
  }

  return response.json() as Promise<T>;
}
