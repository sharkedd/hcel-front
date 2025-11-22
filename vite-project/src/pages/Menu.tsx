import { useAuth } from "../context/AuthContext";
import "../styles/Menu.css";

export default function Menu() {
  const { user, logout } = useAuth();

  return (
    <div className="menu-container">
      <div className="menu-card">
        <h1 className="menu-title">Menú Principal</h1>
        <p className="menu-subtitle">Hola, {user?.email}</p>

        <button
          className="menu-button"
          onClick={() => (window.location.href = "/books")}
        >
          Ver todos los libros
        </button>

        <button
          className="menu-button"
          onClick={() => (window.location.href = "/crear")}
        >
          Crear historia
        </button>

        <button className="menu-button logout-button" onClick={logout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
