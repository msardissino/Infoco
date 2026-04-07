"use client";

import dynamic from "next/dynamic";

// Al estar dentro de un archivo "use client", Next.js permite usar ssr: false tranquilamente
const FlipbookViewer = dynamic(() => import("./FlipbookViewer"), {
  ssr: false,
  loading: () => <p>Cargando visor interactivo 3D...</p>
});

export default function FlipbookWrapper({ pdfUrl }: { pdfUrl: string }) {
  return <FlipbookViewer pdfUrl={pdfUrl} />;
}
