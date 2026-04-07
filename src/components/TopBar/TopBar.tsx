"use client";

import { usePathname } from "next/navigation";
import styles from "./TopBar.module.css";

export const TopBar = () => {
  const pathname = usePathname();
  
  // Lógica simple para el título
  let title = "Resumen del Sistema";
  if (pathname.includes("articulos")) title = "Gestión de Artículos";
  if (pathname.includes("nuevo")) title = "Nuevo Artículo";

  return (
    <header className={styles.topbar}>
      <h1 className={styles.heading}>{title}</h1>
      <div className={styles.actions}>
        <span className={styles.userName}>Admin</span>
        <div className={styles.avatar}>A</div>
      </div>
    </header>
  );
};
