// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { error } = requireAuth(req);
  if (error) return error;

  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");

    if (code) {
      const product = await prisma.product.findUnique({ where: { code } });
      return NextResponse.json({ product });
    }

    const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ products });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const { error } = requireAuth(req);
  if (error) return error;

  try {
    const { name, code, price, stock, category } = await req.json();

    if (!name || !code) {
      return NextResponse.json(
        { error: "Nombre y código requeridos" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        code,
        price: Number(price),
        stock: Number(stock),
        category,
      },
    });

    return NextResponse.json({ product });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al crear producto" }, { status: 500 });
  }
}
