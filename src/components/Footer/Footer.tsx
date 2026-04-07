import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>
          Infoco<span>.</span>
        </div>
        <p className={styles.text}>
          Centro de Día Infoco - Promoviendo el bienestar y la inclusión desde una perspectiva moderna y cálida.
        </p>
        <div className={styles.copy}>
          © {new Date().getFullYear()} Centro de Día Infoco. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};
