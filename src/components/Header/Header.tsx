"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./Header.module.css";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          {/* Aquí cargamos el avatar si existe, si no, se muestra el texto */}
          <img 
            src="/assets/logo.svg" 
            alt="Infoco" 
            className={styles.avatar} 
            onError={(e) => (e.currentTarget.style.display = 'none')} 
          />
          <span className={styles.brandText}>Infoco<span>.</span></span>
        </Link>
        
        <button className={styles.menuToggle} onClick={toggleMenu} aria-label="Abrir menú">
          <span className={`${styles.bar} ${isMenuOpen ? styles.bar1 : ""}`}></span>
          <span className={`${styles.bar} ${isMenuOpen ? styles.bar2 : ""}`}></span>
          <span className={`${styles.bar} ${isMenuOpen ? styles.bar3 : ""}`}></span>
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
          <Link href="/" className={styles.link} onClick={() => setIsMenuOpen(false)}>Inicio</Link>
          <Link href="/revista" className={styles.link} onClick={() => setIsMenuOpen(false)}>Edición Digital</Link>
          <Link href="/#articulos" className={styles.link} onClick={() => setIsMenuOpen(false)}>Artículos</Link>
          <Link href="/#nosotros" className={styles.link} onClick={() => setIsMenuOpen(false)}>Centro de Día</Link>
          <Link href="/dashboard" className={styles.loginBtnMobile}>Acceder al Dash</Link>
        </nav>

        <Link href="/dashboard" className={styles.loginBtn}>Acceder al Dash</Link>
      </div>
    </header>
  );
};
