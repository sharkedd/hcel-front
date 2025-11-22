import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/BookDetails.css";

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
  const { accessToken } = useAuth();

  const [book, setBook] = useState<BookFull | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadBook() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/books/${id}/full`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        if (!res.ok) throw new Error("Error al obtener el libro");

        const data = await res.json();
        setBook(data);

        const userRes = await fetch(
          `${import.meta.env.VITE_API_URL}/users/by-id/${data.createdBy}`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );

        const userData = await userRes.json();
        setUser(userData);
      } catch (err) {
        setError("No se pudo cargar el libro.");
      }
    }

    loadBook();
  }, [accessToken, id]);

  if (error) return <p className="book-error">{error}</p>;
  if (!book) return <p className="book-loading">Cargando libro...</p>;

  return (
    <div className="book-page">
      <div className="book-card">
        {/* ← FLECHA DE REGRESO */}
        <div
          className="back-arrow"
          onClick={() => (window.location.href = "/books")}
        >
          ← Volver
        </div>

        <h1 className="book-title">{book.title}</h1>

        <p className="book-author">
          <strong>Autor:</strong> {user ? user.name : "Desconocido"}
        </p>

        <p className="book-date">
          {new Date(book.createdAt).toLocaleDateString()}
        </p>

        <hr className="book-separator" />

        <p className="book-content">{book.content.body}</p>
      </div>
    </div>
  );
}
