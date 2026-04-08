import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const excerpt = formData.get("excerpt") as string;
    const content = formData.get("content") as string;
    const file = formData.get("cover") as File | null;

    let coverUrl = null;

    if (file && file.size > 0) {
      const uniqueFileName = `articles/${Date.now()}_${file.name}`;
      const blob = await put(uniqueFileName, file, {
        access: 'public',
        addRandomSuffix: true
      });
      coverUrl = blob.url;
    }

    const newArticle = await prisma.article.create({
      data: {
        title,
        category,
        excerpt,
        content,
        // @ts-ignore
        coverUrl,
      },
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error: any) {
    console.error("Error en POST /api/articles:", error);
    return NextResponse.json({ 
      error: "Failed to create article",
      details: error.message 
    }, { status: 500 });
  }
}
