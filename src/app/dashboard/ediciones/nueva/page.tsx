"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "@/app/dashboard/articulos/nuevo/page.module.css";

export default function NewEditionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Por favor, selecciona un archivo PDF.");
      return;
    }
    if (file.type !== "application/pdf") {
      alert("El archivo seleccionado no es un PDF válido.");
      return;
    }
    setLoading(true);

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("file", file);

    try {
      const res = await fetch("/api/editions", {
        method: "POST",
        body: payload,
      });

      if (res.ok) {
        router.push("/dashboard/ediciones");
      } else {
        alert("Error al guardar la revista");
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
      <h2>Subir Nueva Revista PDF</h2>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>
        Carga el archivo PDF de la nueva edición. Este archivo quedará disponible para mostrarse como Flipbook.
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="title">Título de la Edición</label>
          <input 
            className={styles.input} 
            type="text" 
            id="title" 
            required
            value={formData.title}
            onChange={handleChange}
            placeholder="Ej. Edición Otoño 2026" 
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="file">Archivo PDF</label>
          <input 
            className={styles.input} 
            style={{padding: "1rem", backgroundColor: "#f9f9fc", cursor: "pointer"}}
            type="file" 
            id="file" 
            accept="application/pdf"
            required
            onChange={handleFileChange}
          />
          <small style={{color: "var(--color-text-muted)"}}>Máximo recomendado: 50MB.</small>
        </div>

        <div className={styles.actions}>
          <Link href="/dashboard/ediciones" className={styles.btnCancel}>Cancelar</Link>
          <button type="submit" className={styles.btnSave} disabled={loading}>
            {loading ? "Subiendo archivo..." : "Subir Revista"}
          </button>
        </div>
      </form>
    </div>
  );
}
