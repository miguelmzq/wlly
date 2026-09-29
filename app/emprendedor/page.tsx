"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function Emprendedor() {
  const [mode, setMode] = useState<"login" | "register" | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nombre, setNombre] = useState("")
  const [negocio, setNegocio] = useState("")
  const [sector, setSector] = useState("")
  const [title, setTitle] = useState("")
  const router = useRouter()

  const fullTitle = "¡BIENVENIDO GRAN EMPRENDEDOR!"

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setTitle(fullTitle.slice(0, i + 1))
      i++
      if (i === fullTitle.length) clearInterval(interval)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      alert("Error al iniciar sesión: " + error.message)
    } else {
      router.push("/emprendedor/onboarding")
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      alert("Error al registrarse: " + error.message)
    } else {
      await supabase.from("emprendedores").insert([
        { id: data.user?.id, nombre, negocio, sector },
      ])
      alert("Cuenta creada, confirma tu correo y luego inicia sesión")
      setMode("login")
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen animated-bg text-black relative">
      {/* Flecha de regresar que manda a /login */}
      <button
        onClick={() => router.push("/login")}
        className="absolute top-4 left-4 text-2xl font-bold text-black hover:text-gray-700"
      >
        ←
      </button>

      <h1 className="text-4xl font-extrabold mb-4 tracking-wide">{title}</h1>
      <p className="text-xl mb-4">¡Inicia, gestiona y conecta tus ideas con el mundo al toque!</p>

      {!mode && (
        <div className="flex gap-6">
          <button
            onClick={() => setMode("login")}
            className="px-8 py-3 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100"
          >
            Iniciar sesión
          </button>
          <button
            onClick={() => setMode("register")}
            className="px-8 py-3 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100"
          >
            Registrarse
          </button>
        </div>
      )}

      {mode === "login" && (
        <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-6 w-80">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-400"
          />
          <button className="px-8 py-3 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100">
            Entrar
          </button>
        </form>
      )}

      {mode === "register" && (
        <form onSubmit={handleRegister} className="flex flex-col gap-4 mt-6 w-80">
          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Nombre del negocio"
            value={negocio}
            onChange={(e) => setNegocio(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          >
            <option value="">Selecciona un sector</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Salud">Salud</option>
            <option value="Educación">Educación</option>
            <option value="Moda">Moda</option>
            <option value="Servicios">Servicios</option>
          </select>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <button className="px-8 py-3 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100">
            Registrarse
          </button>
        </form>
      )}
    </main>
  )
}
