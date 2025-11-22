import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/BooksList.css";

interface Book {
  _id: string;
  title: string;
  createdBy: string;
  createdAt: string;
}

export default function BooksList() {
  const { accessToken } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBooks() {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, // CORRECTO
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
  }, [accessToken]);

  if (error) return <p className="books-error">{error}</p>;

  return (
    <div className="books-page">
      <div className="books-card">
        <h1 className="books-title">Mis Libros</h1>

        {books.length === 0 && (
          <p className="books-empty">Aún no has creado historias.</p>
        )}

        <ul className="books-list">
          {books.map((book) => (
            <li
              key={book._id}
              className="books-item"
              onClick={() => (window.location.href = `/books/${book._id}`)}
            >
              <strong className="books-item-title">{book.title}</strong>
              <br />
              <small className="books-item-date">
                {new Date(book.createdAt).toLocaleDateString()}
              </small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
