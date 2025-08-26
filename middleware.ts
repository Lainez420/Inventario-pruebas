import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { BaseLoggger } from "html5-qrcode/esm/core";

export function middleware(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  console.log(token, process.env)
  if (!token) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET || "supersecret");
    
    return NextResponse.next();
  } catch (error) {
    return NextResponse.json({ error: "Token inválido" }, { status: 401 });
  }
}

// Definimos qué rutas estarán protegidas por este middleware
export const config = {
  matcher: ["/api/products/:path*", "/api/inventory/:path*"],
};
