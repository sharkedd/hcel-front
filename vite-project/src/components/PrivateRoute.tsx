import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const { token, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  if (!token) return <Navigate to="/" replace />;

  return children;
}
