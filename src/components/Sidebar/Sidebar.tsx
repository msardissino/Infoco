"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

export const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Resumen", path: "/dashboard" },
    { name: "Artículos", path: "/dashboard/articulos" },
    { name: "Revistas PDF", path: "/dashboard/ediciones" },
    { name: "Volver a la Web", path: "/" },
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        Infoco<span>Dash</span>
      </div>
      
      <nav className={styles.nav}>
        {navItems.map((item) => {
          // Lógica simple para determinar si es la ruta activa
          const isActive = pathname === item.path || (item.path !== "/dashboard" && item.path !== "/" && pathname.startsWith(item.path));
          
          return (
            <Link 
              key={item.path} 
              href={item.path} 
              className={styles.navLink}
              data-active={isActive}
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
  );
};
