import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface BookContent {
  _id: string;
  body: string;
}

interface BookFull {
  _id: string;
  title: string;
  createdBy: string;
  createdAt: string;
  content: BookContent;
}

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function BookDetails() {
  const { id } = useParams();
  const { token } = useAuth();

  const [book, setBook] = useState<BookFull | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBook() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/books/${id}/full`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Error al obtener el libro");

        const data = await res.json();
        setBook(data);

        // Buscar el autor
        const userRes = await fetch(
          `${import.meta.env.VITE_API_URL}/users/by-id/${data.createdBy}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const userData = await userRes.json();
        setUser(userData);
      } catch (err) {
        setError("No se pudo cargar el libro.");
      }
    }

    loadBook();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!book) return <p>Cargando libro...</p>;

  return (
    <div style={{ maxWidth: "700px", margin: "40px auto" }}>
      <h1>{book.title}</h1>

      <p>
        <strong>Autor:</strong> {user ? user.name : "Desconocido"}
      </p>

      <p>
        <small>Fecha: {new Date(book.createdAt).toLocaleDateString()}</small>
      </p>

      <hr />

      <p style={{ whiteSpace: "pre-line", marginTop: "20px" }}>
        {book.content.body}
      </p>
    </div>
  );
}
