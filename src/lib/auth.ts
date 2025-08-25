// src/lib/auth.ts
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function requireAuth(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth) {
    return { error: NextResponse.json({ error: "No autorizado" }, { status: 401 }) };
  }

  const [, token] = auth.split(" ");
  if (!token) {
    return { error: NextResponse.json({ error: "No autorizado" }, { status: 401 }) };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return { decoded };
  } catch (e) {
    console.error("verifyToken error:", e);
    return { error: NextResponse.json({ error: "Token inválido" }, { status: 401 }) };
  }
}
