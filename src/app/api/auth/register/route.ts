import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import  bcrypt  from "bcryptjs";

export const runtime = "nodejs"

export async function POST(req:Request) {
  const {name, email, role, password} = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({error: "Campos requeridos faltantes"}, {status: 400});
  }

   const userExist = await prisma.user.findUnique({where: {email}});
   if (userExist) {
    return NextResponse.json({error: "Usuario ya registrado"}, {status: 400})
   } 

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: role || "EMPLOYEE"
    },
  });

  return NextResponse.json({user: {id: user.id, name: user.name, email: user.email, role: user.role}})
}