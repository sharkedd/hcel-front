import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/CreateStory.css";

export default function CreateStory() {
  const { accessToken } = useAuth(); // ← CORREGIDO

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [iaMessage, setIaMessage] = useState("");

  async function handleSave() {
    setMessage("");

    if (!title || !content) {
      setMessage("Por favor completa todos los campos.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // ← CORRECTO
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) throw new Error("Error al crear la historia");

      setMessage("Historia creada con éxito 🎉");
      setTitle("");
      setContent("");
    } catch {
      setMessage("Error al guardar la historia");
    }
  }

  function handleIaEdit() {
    setIaMessage("✨ Edición con IA próximamente...");
    setTimeout(() => setIaMessage(""), 3000);
  }

  return (
    <div className="story-page">
      <div className="story-card">
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
            placeholder="Escribe aquí tu historia..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={10}
          />

          <button className="story-btn" onClick={handleSave}>
            Guardar Historia
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
