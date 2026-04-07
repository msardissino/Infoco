import styles from "./page.module.css";
import Link from "next/link";

export default function DashboardResume() {
  return (
    <div className={styles.container}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>12</div>
          <div className={styles.statLabel}>Artículos Publicados</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>3</div>
          <div className={styles.statLabel}>Borradores</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>350</div>
          <div className={styles.statLabel}>Visitas este mes</div>
        </div>
      </div>

      <div className={styles.recentSection}>
        <h2 className={styles.recentTitle}>Atajos</h2>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link href="/dashboard/articulos/nuevo" style={{ 
            backgroundColor: "var(--color-accent)", 
            color: "white", 
            padding: "0.75rem 1.5rem", 
            borderRadius: "var(--radius-sm)", 
            fontWeight: "600" 
          }}>
            + Crear nuevo artículo
          </Link>
          <Link href="/dashboard/articulos" style={{ 
            backgroundColor: "var(--color-primary)", 
            color: "white", 
            padding: "0.75rem 1.5rem", 
            borderRadius: "var(--radius-sm)", 
            fontWeight: "600" 
          }}>
            Ver todos los artículos
          </Link>
        </div>
      </div>
    </div>
  );
}
