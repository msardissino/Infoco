"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Resumen", path: "/dashboard" },
    { name: "Artículos", path: "/dashboard/articulos" },
    { name: "Revistas PDF", path: "/dashboard/ediciones" },
    { name: "Volver a la Web", path: "/" },
  ];

  return (
    <>
      {/* Mobile Header for Dashboard */}
      <div className={styles.mobileHeader}>
        <div className={styles.mobileLogo}>
          Infoco<span>Dash</span>
        </div>
        <button className={styles.toggleBtn} onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)}></div>}

      <aside className={`${styles.sidebar} ${isOpen ? styles.isOpen : ""}`}>
        <Link href="/" className={styles.logo} onClick={() => setIsOpen(false)}>
          <img 
            src="/assets/avatar.png" 
            alt="Infoco" 
            className={styles.avatar} 
            onError={(e) => (e.currentTarget.style.display = 'none')} 
          />
          <span>Infoco<span>Dash</span></span>
        </Link>
        
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== "/dashboard" && item.path !== "/" && pathname.startsWith(item.path));
            
            return (
              <Link 
                key={item.path} 
                href={item.path} 
                className={styles.navLink}
                data-active={isActive}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className={styles.logout}>
          <button className={styles.logoutBtn}>Cerrar Sesión</button>
        </div>
      </aside>
    </>
  );
};
