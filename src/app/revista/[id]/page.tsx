import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";
import FlipbookWrapper from "@/components/Flipbook/FlipbookWrapper";
import styles from "./page.module.css";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditionViewerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: paramId } = await params;
  const id = parseInt(paramId);

  // @ts-ignore
  const edition = await prisma.edition.findUnique({
    where: { id }
  });

  if (!edition || edition.status !== "Publicado") {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/revista" className={styles.backBtn}>
            ← Volver a la biblioteca
          </Link>

          <div className={styles.header}>
            <h1 className={styles.title}>{edition.title}</h1>
            <p className={styles.subtitle}>Publicación oficial</p>
          </div>
          
          <div className={styles.flipbookWrapper}>
            <FlipbookWrapper pdfUrl={edition.pdfUrl} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
