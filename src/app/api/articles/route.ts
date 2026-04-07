import { NextResponse } from "next/server";
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
    const data = await request.json();
    const newArticle = await prisma.article.create({
      data: {
        title: data.title,
        category: data.category,
        excerpt: data.excerpt,
        content: data.content,
        // status is "Borrador" by default
      },
    });
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 });
  }
}
