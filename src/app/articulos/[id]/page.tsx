import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import styles from "./page.module.css";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

// Este es un Server Component que obtiene el dato directamente
export default async function PublicArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: paramId } = await params;
  const id = parseInt(paramId);

  const article = await prisma.article.findUnique({
    where: { id }
  });

  if (!article || article.status !== "Publicado") {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/" className={styles.backBtn}>
            ← Volver a la portada
          </Link>
          
          <header className={styles.header}>
            <span className={styles.badge}>{article.category}</span>
            <h1 className={styles.title}>{article.title}</h1>
            <div className={styles.meta}>
              <span>Publicado por: Dirección Administrativa</span>
              <span>•</span>
              <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            </div>
          </header>

          <div className={styles.content}>
            {article.content}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
