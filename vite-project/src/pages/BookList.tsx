import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/BooksListShelf.css";
import { getCoverTexture } from "../utils/bookTextures";

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
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error("Error al obtener libros");

        const data = await res.json();
        setBooks(data);
      } catch {
        setError("No se pudieron obtener los libros.");
      }
    }

    loadBooks();
  }, [accessToken]);

  if (error) return <p className="shelf-error">{error}</p>;

  return (
    <div className="shelf-page">
      <div
        className="back-arrow"
        onClick={() => (window.location.href = "/menu")}
      >
        ← Volver
      </div>

      <h1 className="shelf-title">Tu Biblioteca</h1>

      <div className="shelf-grid">
        {books.map((book) => (
          <div
            key={book._id}
            className="shelf-book"
            onClick={() => (window.location.href = `/books/${book._id}`)}
          >
            <div
              className="shelf-book-cover"
              style={{
                backgroundImage: `url(${getCoverTexture(book._id)})`,
              }}
            >
              <div className="shelf-book-title">{book.title}</div>
            </div>

            <div className="shelf-book-footer">
              <small>
                {new Date(book.createdAt).toLocaleDateString("es-ES")}
              </small>
            </div>
          </div>
        ))}

        {/* Si está vacío */}
        {books.length === 0 && (
          <p className="shelf-empty">Aún no hay libros en tu biblioteca.</p>
        )}
      </div>
    </div>
  );
}
