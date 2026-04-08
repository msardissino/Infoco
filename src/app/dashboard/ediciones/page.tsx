"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "@/app/dashboard/articulos/page.module.css"; // Reuse dashboard tables CSS

export interface Edition {
  id: number;
  title: string;
  pdfUrl: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function EditionsPage() {
  const [editions, setEditions] = useState<Edition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEditions();
  }, []);

  const fetchEditions = async () => {
    try {
      const res = await fetch("/api/editions");
      const data = await res.json();
      setEditions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de eliminar esta revista? Se borrará el PDF permanentemente.")) return;
    try {
      await fetch(`/api/editions/${id}`, { method: "DELETE" });
      fetchEditions(); // Recargar recambio
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleStatus = async (edition: Edition) => {
    const newStatus = edition.status === "Publicado" ? "Borrador" : "Publicado";
    try {
      await fetch(`/api/editions/${edition.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchEditions();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <div className={styles.container}>Cargando...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Listado de Revistas (PDFs)</h2>
        <Link href="/dashboard/ediciones/nueva" className={styles.createBtn}>
          + Subir Revista
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Título de Edición</th>
              <th>Enlace Visor</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {editions.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: "center" }}>No hay revistas cargadas.</td>
              </tr>
            )}
            {editions.map((edition) => (
              <tr key={edition.id}>
                <td data-label="Título de Edición" style={{ fontWeight: 500 }}>{edition.title}</td>
                <td data-label="Enlace Visor"><Link style={{color: "var(--color-primary)", textDecoration: "underline"}} href={edition.pdfUrl} target="_blank">Ver Archivo</Link></td>
                <td data-label="Estado">
                  <button 
                    onClick={() => handleToggleStatus(edition)}
                    style={{ 
                      padding: "0.25rem 0.5rem", 
                      borderRadius: "4px", 
                      fontSize: "0.8rem",
                      backgroundColor: edition.status === "Publicado" ? "#d3f9d8" : "#fff3cd",
                      color: edition.status === "Publicado" ? "#2b8a3e" : "#e67700",
                      border: "none",
                      cursor: "pointer"
                    }}
                  >
                    {edition.status}
                  </button>
                </td>
                <td data-label="Fecha">{new Date(edition.createdAt).toLocaleDateString()}</td>
                <td data-label="Acciones">
                  <div className={styles.actions}>
                    <button className={styles.btnDelete} onClick={() => handleDelete(edition.id)}>Borrar</button>
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
