import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import styles from "./page.module.css";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

// Server component para cargar las revistas publicadas
export default async function RevistaCatalogPage() {
  // @ts-ignore
  const editions = await prisma.edition.findMany({
    where: { status: "Publicado" },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>Biblioteca de Ediciones</h1>
            <p className={styles.subtitle}>Explora nuestra colección histórica de revistas digitales.</p>
          </div>
          
          <div className={styles.grid}>
            {editions.length === 0 ? (
              <p style={{textAlign: "center", width: "100%", color: "var(--color-text-muted)"}}>Aún no hay revistas publicadas.</p>
            ) : (
              // @ts-ignore
              editions.map((edition) => (
                <Link href={`/revista/${edition.id}`} key={edition.id} className={styles.card}>
                  <div className={styles.cardIcon}>📖</div>
                  <h3 className={styles.cardTitle}>{edition.title}</h3>
                  <div className={styles.cardMeta}>{new Date(edition.createdAt).toLocaleDateString()}</div>
                  <div className={styles.readBtn}>Leer Edición →</div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
