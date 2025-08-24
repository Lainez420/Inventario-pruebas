"use client";
import Link from "next/link";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar en desktop */}
      <aside className="hidden md:flex md:flex-col w-64 bg-gray-900 text-white p-5 fixed h-screen">
        <h2 className="text-2xl font-bold mb-8">Inventario</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard">📊 Dashboard</Link>
          <Link href="/dashboard/producsts">📦 Productos</Link>
          <Link href="/dashboard/inventory">📥 Entradas/Salidas</Link>
          <Link href="/dashboard/reports">📑 Reportes</Link>
        </nav>
      </aside>

      {/* Botón de menú móvil */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white px-3 py-2 rounded"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Sidebar móvil */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-5 transform transition-transform duration-300 z-40 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <h2 className="text-2xl font-bold mb-8">Inventario</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/dashboard" onClick={() => setOpen(false)}>
            📊 Dashboard
          </Link>
          <Link href="/dashboard/producsts" onClick={() => setOpen(false)}>
            📦 Productos
          </Link>
          <Link href="/dashboard/inventory" onClick={() => setOpen(false)}>
            📥 Entradas/Salidas
          </Link>
          <Link href="/dashboard/reports" onClick={() => setOpen(false)}>
            📑 Reportes
          </Link>
        </nav>
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 bg-gray-100 p-8 md:ml-64 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
