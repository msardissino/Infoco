import Link from "next/link";
import styles from "./Header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          Infoco<span>.</span>
        </div>
        <nav className={styles.nav}>
          <Link href="/" className={styles.link}>Inicio</Link>
          <Link href="/revista" className={styles.link}>Edición Digital</Link>
          <Link href="/#articulos" className={styles.link}>Artículos</Link>
          <Link href="/#nosotros" className={styles.link}>Centro de Día</Link>
        </nav>
        <Link href="/dashboard" className={styles.loginBtn}>Acceder al Dash</Link>
      </div>
    </header>
  );
};
