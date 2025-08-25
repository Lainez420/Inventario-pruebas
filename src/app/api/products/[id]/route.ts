// src/app/api/products/[id]/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { requireAuth } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { error } = requireAuth(_);
  if (error) return error;

  try {
    const { id } = await context.params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al obtener producto" }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { error } = requireAuth(req);
  if (error) return error;

  try {
    const { id } = await context.params;
    const data = await req.json();
    const product = await prisma.product.update({ where: { id }, data });
    return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al actualizar producto" }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  const { error } = requireAuth(req);
  if (error) return error;

  try {
    const { id } = await context.params;
    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ message: "Producto eliminado" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error al eliminar producto" }, { status: 500 });
  }
}
