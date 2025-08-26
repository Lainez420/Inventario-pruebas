"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [token, isLoading, setToken] =  useLocalStorage("token")

    useEffect(()=> {
        if(!!token && !isLoading){
            router.push("/dashboard");
        }
    }, [token, isLoading, router])

    async function handleSubmit(e:React.FormEvent) {
        e.preventDefault();
        
        const res = await fetch("api/auth/login", {
            method: "POST",
            headers: {"Content-type":"application/json"},
            body: JSON.stringify({email, password})
        });

        const data:{token:string; error:any} = await res.json();

        if (res.ok) {
            setToken(data.token);
            
        } else {
            setError(data.error || "Error al iniciar sesion");
        }
    }

    return ( 
    <div className="flex min-h-screen items-center justify-center bg-gray-100"> 
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-96" > 
            <h1 className="text-2xl font-bold mb-6 text-center text-black">Iniciar Sesión</h1> 
            {error && ( <p className="text-red-500 text-sm mb-4 text-center">{error}</p> )} 
            <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded mb-4 text-zinc-800" /> 
            <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded mb-6 text-zinc-800" /> 
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700" > Entrar </button> 
        </form> 
    </div> 
    );
}