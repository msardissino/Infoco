import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: paramId } = await context.params;
    const id = parseInt(paramId);
    const data = await request.json();

    // @ts-ignore
    const updatedEdition = await prisma.edition.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedEdition);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update edition" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: paramId } = await context.params;
    const id = parseInt(paramId);

    // Buscar la edición para borrar también su archivo físico
    // @ts-ignore
    const edition = await prisma.edition.findUnique({ where: { id } });
    if (!edition) {
      return NextResponse.json({ error: "Edición no encontrada" }, { status: 404 });
    }

    // Intentar borrar el archivo físico (con cuidado de los paths)
    if (edition.pdfUrl.startsWith("/ediciones/")) {
      const publicPath = path.join(process.cwd(), "public", edition.pdfUrl);
      if (fs.existsSync(publicPath)) {
        fs.unlinkSync(publicPath); // Borrar el archivo PDF!
      }
    }

    // Borrar de base de datos
    // @ts-ignore
    await prisma.edition.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete edition" }, { status: 500 });
  }
}
