import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Bienvenido a <span>Infoco</span>, la revista digital
        </h1>
        <p className={styles.subtitle}>
          Un espacio institucional del Centro de Día para compartir noticias, 
          eventos y experiencias de una manera moderna y descontracturada.
        </p>
        <button className={styles.cta}>Explorar Artículos</button>
      </div>
    </section>
  );
};
