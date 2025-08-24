import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({ where: { id: params.id } });
    if (!product) return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Error al obtener producto" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { params } = context; // 👈 aquí ya accedes a params
    const data = await req.json();

    const product = await prisma.product.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al actualizar producto" },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.product.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Producto eliminado" });
  } catch {
    return NextResponse.json({ error: "Error al eliminar producto" }, { status: 500 });
  }
}
