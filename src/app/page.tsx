"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Home() {
  const router = useRouter();
const [token, isLoading, setToken] =  useLocalStorage("token")
  useEffect(() => {
    
    if (token) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [router]);

  return <p className="text-center mt-10">Redirigiendo...</p>;
}
