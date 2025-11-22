import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { loginRequest } from "../services/auth";
import { BookOpen, Feather, ArrowRight } from "lucide-react";

export default function Login() {
  const { accessToken, login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Redirigir si ya hay token
  useEffect(() => {
    if (accessToken) {
      window.location.href = "/menu";
    }
  }, [accessToken]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const data = await loginRequest(email, password);

      // login correcto según tu AuthContext
      login(data.user, data.accessToken, data.refreshToken);
    } catch (err) {
      setError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* DECORACIÓN */}
        <div className="login-decoration">
          <div className="decoration-content">
            <div className="brand-logo">
              <BookOpen size={48} strokeWidth={1.5} />
            </div>
            <h1>Historias Convertidas en Libros</h1>
            <p>
              "La memoria es el único paraíso del que no podemos ser
              expulsados."
              <br />
              <span className="quote-author">— Jean Paul</span>
            </p>
            <div className="decoration-footer">
              <Feather className="feather-icon" />
              <span>Preservando tu legado</span>
            </div>
          </div>
          <div className="overlay-pattern"></div>
        </div>

        {/* FORMULARIO */}
        <div className="login-form-section">
          <div className="form-content">
            <div className="form-header">
              <h2>Bienvenido de nuevo</h2>
              <p>
                Ingresa tus credenciales para continuar escribiendo tu historia
              </p>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              {error && <div className="error-message">{error}</div>}

              <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="form-input"
                />
              </div>

              <button
                type="submit"
                className={`submit-btn ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  "Iniciando sesión..."
                ) : (
                  <>
                    Ingresar <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="form-footer">
              <p>
                ¿Aún no tienes una cuenta?{" "}
                <a href="/register">Comienza tu legado</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
