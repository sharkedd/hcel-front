import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/CreateStory.css";

export default function CreateStory() {
  const { accessToken } = useAuth();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [iaMessage, setIaMessage] = useState("");
  const [loading, setLoading] = useState(false); // ← nuevo

  async function handleSave() {
    if (loading) return; // ← evitar doble click
    setLoading(true);
    setMessage("");

    if (!title || !content) {
      setMessage("Por favor completa todos los campos.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) throw new Error("Error");

      setMessage("Historia creada con éxito 🎉");
      setTitle("");
      setContent("");
    } catch {
      setMessage("Error al guardar la historia");
    } finally {
      setLoading(false);
    }
  }

  function handleIaEdit() {
    setIaMessage("✨ Edición con IA próximamente...");
    setTimeout(() => setIaMessage(""), 3000);
  }

  return (
    <div className="story-page">
      <div className="story-card">
        {/* ← FLECHA DE REGRESO */}
        <div
          className="back-arrow"
          onClick={() => (window.location.href = "/menu")}
        >
          ← Volver
        </div>

        <h1 className="story-title">Crear Historia</h1>

        <div className="story-form">
          <input
            className="story-input"
            type="text"
            placeholder="Título de la historia"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            className="story-textarea"
            placeholder="Escribe tu historia..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            className="story-btn"
            onClick={handleSave}
            disabled={loading} // ← botón deshabilitado
          >
            {loading ? "Guardando..." : "Guardar Historia"}
          </button>

          <button className="story-btn ia" onClick={handleIaEdit}>
            ✨ Edición con IA
          </button>

          {message && <p className="story-success">{message}</p>}
          {iaMessage && <p className="story-ia">{iaMessage}</p>}
        </div>
      </div>
    </div>
  );
}
