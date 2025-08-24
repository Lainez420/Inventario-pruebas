"use client";

import { useRouter } from "next/navigation";

export default function inventoryPage() {
  const router = useRouter();


  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bienvenido s los reportes</h1>
      <p className="text-gray-700">Reportes 📊</p>
    </div>
  );
}
