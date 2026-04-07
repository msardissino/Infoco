import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: paramId } = await context.params;
    const id = parseInt(paramId);
    
    const article = await prisma.article.findUnique({
      where: { id },
    });

    if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: paramId } = await context.params;
    const id = parseInt(paramId);
    const data = await request.json();

    const updatedArticle = await prisma.article.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: paramId } = await context.params;
    const id = parseInt(paramId);
    await prisma.article.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
  }
}
