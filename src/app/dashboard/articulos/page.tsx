"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
// Definición local para evitar errores de cache del IDE (TS)
export interface Article {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  status: string;
  coverUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/articles");
      const data = await res.json();
      setArticles(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este artículo?")) return;
    try {
      await fetch(`/api/articles/${id}`, { method: "DELETE" });
      fetchArticles(); // Recargar recambio
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleStatus = async (article: Article) => {
    const newStatus = article.status === "Publicado" ? "Borrador" : "Publicado";
    try {
      await fetch(`/api/articles/${article.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchArticles();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className={styles.container}>Cargando...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Listado de Artículos</h2>
        <Link href="/dashboard/articulos/nuevo" className={styles.createBtn}>
          + Nuevo Artículo
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {articles.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>No hay artículos creados.</td>
              </tr>
            )}
            {articles.map((article) => (
              <tr key={article.id}>
                <td data-label="Título" style={{ fontWeight: 500 }}>{article.title}</td>
                <td data-label="Categoría">{article.category}</td>
                <td data-label="Estado">
                  <button 
                    onClick={() => handleToggleStatus(article)}
                    style={{ 
                      padding: "0.25rem 0.5rem", 
                      borderRadius: "4px", 
                      fontSize: "0.8rem",
                      backgroundColor: article.status === "Publicado" ? "#d3f9d8" : "#fff3cd",
                      color: article.status === "Publicado" ? "#2b8a3e" : "#e67700",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    {article.status}
                  </button>
                </td>
                <td data-label="Fecha">{new Date(article.createdAt).toLocaleDateString()}</td>
                <td data-label="Acciones">
                  <div className={styles.actions}>
                    {/* El editar se deja como UI placeholder por el momento */}
                    <Link href={`/dashboard/articulos/${article.id}/editar`} className={styles.btnEdit}>Editar</Link>
                    <button className={styles.btnDelete} onClick={() => handleDelete(article.id)}>Borrar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
