import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

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

    // Convertir el Blob en un Buffer intermedio (ArrayBuffer -> Buffer en Node)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Generar nombre de archivo único
    const uniqueFileName = `${Date.now()}_${Math.round(Math.random() * 1e9)}.pdf`;
    const publicPath = path.join(process.cwd(), "public", "ediciones", uniqueFileName);

    // Escribir el archivo físicamente en public/ediciones/
    fs.writeFileSync(publicPath, buffer);

    // Path público para acceder vía URL en la web
    const pdfUrl = `/ediciones/${uniqueFileName}`;

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
