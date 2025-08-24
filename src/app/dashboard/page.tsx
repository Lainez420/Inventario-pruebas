"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bienvenido al Dashboard</h1>
      <p className="text-gray-700">estado de inventario 📊</p>
    </div>
  );
}
