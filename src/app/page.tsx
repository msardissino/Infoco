import { Header } from "@/components/Header/Header";
import { Hero } from "@/components/Hero/Hero";
import { ArticleList } from "@/components/ArticleList/ArticleList";
import { Footer } from "@/components/Footer/Footer";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Hero />
        <ArticleList />
      </main>
      <Footer />
    </div>
  );
}
