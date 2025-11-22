import { useAuth } from "../context/AuthContext";

export default function Menu() {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Menú Principal</h1>
      <p>Hola, {user?.email}</p>

      <button onClick={() => (window.location.href = "/books")}>
        Ver todos los libros
      </button>

      <button onClick={() => (window.location.href = "/crear")}>
        Crear historia
      </button>

      <button onClick={logout} style={{ marginTop: "30px" }}>
        Cerrar sesión
      </button>
    </div>
  );
}
