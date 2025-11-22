import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function CreateStory() {
  const { token } = useAuth();

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
          Authorization: `Bearer ${token}`, // ⬅️ Token del usuario
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al crear la historia");
      }

      setMessage("Historia creada con éxito 🎉");
      setTitle("");
      setContent("");
    } catch (err) {
      setMessage("Error al guardar la historia");
    }
  }

  function handleIaEdit() {
    setIaMessage("✨ Funcionalidad de edición con IA próximamente...");
    setTimeout(() => setIaMessage(""), 3000);
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto" }}>
      <h1>Crear Historia</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <input
          type="text"
          placeholder="Título de la historia"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Contenido de la historia..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={8}
        />

        <button type="button" onClick={handleSave}>
          Guardar Historia
        </button>

        <button
          type="button"
          onClick={handleIaEdit}
          style={{
            background: "#4b4bff",
            color: "white",
            padding: "8px 12px",
            border: "none",
          }}
        >
          ✨ Edición con IA
        </button>

        {message && <p style={{ color: "green" }}>{message}</p>}
        {iaMessage && <p style={{ color: "#444" }}>{iaMessage}</p>}
      </div>
    </div>
  );
}
