export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export async function loginRequest(email: string, password: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error("Credenciales incorrectas");

  return res.json() as Promise<LoginResponse>;
}
