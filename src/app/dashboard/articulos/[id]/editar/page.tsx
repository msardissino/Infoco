"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    excerpt: "",
    content: ""
  });

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await fetch(`/api/articles/${id}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            title: data.title,
            category: data.category,
            excerpt: data.excerpt,
            content: data.content
          });
        } else {
          alert("Artículo no encontrado");
          router.push("/dashboard/articulos");
        }
      } catch (error) {
        console.error("Error fetching", error);
      } finally {
        setFetching(false);
      }
    };
    fetchArticle();
  }, [id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: "PUT",
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

  if (fetching) return <div className={styles.container}>Cargando datos del artículo...</div>;

  return (
    <div className={styles.container}>
      <h2>Editar Artículo</h2>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>
        Modifica los campos del artículo. Al guardar, los cambios se reflejarán inmediatamente en todo el sistema.
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
          ></textarea>
        </div>

        <div className={styles.actions}>
          <Link href="/dashboard/articulos" className={styles.btnCancel}>Cancelar</Link>
          <button type="submit" className={styles.btnSave} disabled={loading}>
            {loading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
