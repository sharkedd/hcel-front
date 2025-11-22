import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

interface Book {
  _id: string;
  title: string;
  createdBy: string;
  createdAt: string;
}

export default function BooksList() {
  const { token } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBooks() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener libros");

        const data = await res.json();
        setBooks(data);
      } catch (err) {
        setError("No se pudieron obtener los libros.");
      }
    }

    loadBooks();
  }, []);

  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h1>Mis Libros</h1>

      {books.length === 0 && <p>No hay libros aún.</p>}

      <ul style={{ marginTop: "20px", padding: 0, listStyle: "none" }}>
        {books.map((book) => (
          <li
            key={book._id}
            style={{
              padding: "12px",
              border: "1px solid #ccc",
              marginBottom: "12px",
              cursor: "pointer",
            }}
            onClick={() => (window.location.href = `/books/${book._id}`)}
          >
            <strong>{book.title}</strong>
            <br />
            <small>
              Fecha: {new Date(book.createdAt).toLocaleDateString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
