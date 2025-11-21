import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/menu"
        element={
          <PrivateRoute>
            <Menu />
          </PrivateRoute>
        }
      />

      <Route
        path="/historias"
        element={
          <PrivateRoute>
            <h1>Historias</h1>
          </PrivateRoute>
        }
      />

      <Route
        path="/escribir"
        element={
          <PrivateRoute>
            <h1>Escribir historia</h1>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
