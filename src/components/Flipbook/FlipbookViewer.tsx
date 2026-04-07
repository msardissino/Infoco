"use client";

import React, { useState, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import styles from "./FlipbookViewer.module.css";

// Configurar el worker de PDF.js usando CDN para mayor seguridad y evitar problemas de empaquetado en Next.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PageProps {
  number: number;
  width: number;
  children?: React.ReactNode;
}

// React-pageflip exige usar forwardRef para darle las animaciones 3D a cada "div" de página.
const PageCover = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  return (
    <div className={styles.pageItem} ref={ref} data-density="hard">
      {props.children || (
        <Page 
          pageNumber={props.number} 
          renderTextLayer={false} 
          renderAnnotationLayer={false} 
          width={props.width} 
        />
      )}
    </div>
  );
});
PageCover.displayName = "PageCover";

const PageInner = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  return (
    <div className={styles.pageItem} ref={ref}>
      <Page 
        pageNumber={props.number} 
        renderTextLayer={false} 
        renderAnnotationLayer={false} 
        width={props.width} 
      />
    </div>
  );
});
PageInner.displayName = "PageInner";

export default function FlipbookViewer({ pdfUrl }: { pdfUrl: string }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [windowWidth, setWindowWidth] = useState(800);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setWindowWidth(window.innerWidth);
    
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      // Debounce para evitar "saltos" (feedback loops) al aparecer/desaparecer scrollbars
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 150);
    };
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  function onDocumentLoadSuccess(data: any) {
    setNumPages(data.numPages);
  }

  // Dimensiones dinámicas responsivas
  const mobile = windowWidth < 768;
  const bookWidth = mobile ? windowWidth - 40 : 400; // Si es móvil, ocupa todo, sino aprox 400px ancho por hoja
  const bookHeight = bookWidth * 1.414; // El ratio de aspecto estándar de un documento A4

  if (!isClient) return null;
  if (!pdfUrl) return <div>No hay URL del PDF provisto.</div>;

  // Construimos el array de páginas de forma segura porque HTMLFlipBook crashea si recibe booleanos/null en sus children
  const pages = [];
  if (numPages && numPages > 0) {
    // 1. Portada (Página 1)
    pages.push(<PageCover key="page_1" number={1} width={bookWidth} />);
    
    // 2. Páginas interiores (2 hasta n-1)
    for (let i = 2; i < numPages; i++) {
        pages.push(<PageInner key={`page_${i}`} number={i} width={bookWidth} />);
    }
    
    // 3. Contratapa (Última página, si hay más de 1)
    if (numPages > 1) {
        pages.push(<PageCover key={`page_${numPages}`} number={numPages} width={bookWidth} />);
    }
  }

  return (
    <div className={styles.container}>
      <Document 
        file={pdfUrl} 
        onLoadSuccess={onDocumentLoadSuccess} 
        className={styles.document}
        loading="Cargando las páginas de la revista..."
      >
        {numPages && pages.length > 0 && (
          // @ts-ignore - Los tipos de react-pageflip no son compatibles 100% con TS moderno
          <HTMLFlipBook 
            width={bookWidth} 
            height={bookHeight} 
            size="fixed"
            minWidth={300}
            maxWidth={600}
            minHeight={400}
            maxHeight={800}
            maxShadowOpacity={0.4}
            flippingTime={1100}
            usePortrait={mobile}
            drawShadow={true}
            showCover={true}
            mobileScrollSupport={true}
            className={styles.flipbook}
            style={{ margin: "0 auto" }}
          >
            {pages}
          </HTMLFlipBook>
        )}
      </Document>
      <div className={styles.controls}>
        {mobile ? "Desliza la hoja con tu dedo" : "Arrastra las esquines de la hoja con el mouse"}
      </div>
    </div>
  );
}
