"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default function NewArticlePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/dashboard/articulos");
      } else {
        alert("Error al guardar el artículo");
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con la base de datos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Crear Nuevo Artículo</h2>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>
        Completa los campos a continuación para publicar una nueva noticia en la revista.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="title">Título del Artículo</label>
          <input 
            className={styles.input} 
            type="text" 
            id="title" 
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Ej. Taller de Arte de Primavera" 
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="category">Categoría</label>
          <select 
            className={styles.select} 
            id="category" 
            required
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Selecciona una categoría...</option>
            <option value="Novedades">Novedades</option>
            <option value="Actividades">Actividades</option>
            <option value="Eventos">Eventos</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="excerpt">Resumen Corto (Para la portada)</label>
          <input 
            className={styles.input} 
            type="text" 
            id="excerpt" 
            required
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Breve descripción de qué trata el artículo..." 
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="content">Contenido Completo</label>
          <textarea 
            className={styles.textarea} 
            id="content" 
            required
            value={formData.content}
            onChange={handleChange}
            placeholder="Escribe aquí el contenido del artículo..."
          ></textarea>
        </div>

        <div className={styles.actions}>
          <Link href="/dashboard/articulos" className={styles.btnCancel}>Cancelar</Link>
          <button type="submit" className={styles.btnSave} disabled={loading}>
            {loading ? "Guardando..." : "Guardar Artículo"}
          </button>
        </div>
      </form>
    </div>
  );
}
