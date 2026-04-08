"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./ArticleList.module.css";
import { Article } from "@/app/dashboard/articulos/page";

export const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/articles");
        const data = await res.json();
        const publishedArticles = data.filter((a: Article) => a.status === "Publicado");
        setArticles(publishedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section id="articulos" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Últimas Noticias</h2>
          </div>
          <p>Cargando noticias...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="articulos" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Últimas Noticias</h2>
        </div>
        
        <div className={styles.grid}>
          {articles.length === 0 ? (
            <p style={{ color: "var(--color-text-muted)" }}>Aún no hay artículos publicados.</p>
          ) : (
            articles.map((article) => (
              <Link href={`/articulos/${article.id}`} key={article.id} style={{textDecoration: "none"}}>
                <article className={styles.card}>
                  <div className={styles.imageContainer}>
                    {article.coverUrl ? (
                      <img 
                        src={article.coverUrl} 
                        alt={article.title} 
                        className={styles.cardImage} 
                      />
                    ) : (
                      <div className={styles.imagePlaceholder}>
                        <img src="/assets/img/infoco.svg" alt="Infoco" className={styles.placeholderIcon} />
                      </div>
                    )}
                  </div>
                  <div className={styles.cardContent}>
                    <span className={styles.badge}>{article.category}</span>
                    <h3 className={styles.cardTitle}>{article.title}</h3>
                    <p className={styles.cardExcerpt}>{article.excerpt}</p>
                    <div className={styles.cardFooter}>
                      <span>Administración</span>
                      <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
