import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();


    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 400 });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 400 });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "1d" }
    );

    return NextResponse.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  } finally {
    await prisma.$disconnect(); 
  }
}
