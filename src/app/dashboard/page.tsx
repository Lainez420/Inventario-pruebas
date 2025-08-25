"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function DashboardPage() {
  const router = useRouter();
  const [token, isLoading, setToken] =  useLocalStorage("token")

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [router, token]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bienvenido al Dashboard</h1>
      <p className="text-gray-700">estado de inventario 📊</p>
    </div>
  );
}
