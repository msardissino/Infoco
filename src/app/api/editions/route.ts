import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // @ts-ignore
    const editions = await prisma.edition.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(editions);
  } catch (error) {
    return NextResponse.json({ error: "No se pudieron obtener las ediciones" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as Blob | null;
    const title = formData.get("title") as string | null;

    if (!file || !title) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    // Subir el archivo directamente a Vercel Blob
    const uniqueFileName = `ediciones/${Date.now()}_${Math.round(Math.random() * 1e9)}.pdf`;
    
    // El SDK de Vercel Blob se encarga de todo. 
    // En producción usará el token de las variables de entorno de Vercel.
    const blob = await put(uniqueFileName, file, { 
      access: 'public',
      addRandomSuffix: true // Vercel añade un sufijo para evitar colisiones
    });

    // Usamos la URL pública que nos devuelve Blob
    const pdfUrl = blob.url;

    // Crear el registro en base de datos
    // @ts-ignore
    const newEdition = await prisma.edition.create({
      data: {
        title,
        pdfUrl,
      },
    });

    return NextResponse.json(newEdition, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Hubo un error al procesar el archivo" }, { status: 500 });
  }
}
