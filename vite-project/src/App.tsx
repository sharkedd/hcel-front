import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import PrivateRoute from "./components/PrivateRoute";
import CreateStory from "./pages/CreateStory";
import BooksList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";

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

      <Route
        path="/crear"
        element={
          <PrivateRoute>
            <CreateStory />
          </PrivateRoute>
        }
      />

      <Route
        path="/books"
        element={
          <PrivateRoute>
            <BooksList />
          </PrivateRoute>
        }
      />

      <Route
        path="/books/:id"
        element={
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}
