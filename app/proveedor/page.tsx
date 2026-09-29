"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function Proveedor() {
  const [mode, setMode] = useState<"login" | "register" | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [nombre, setNombre] = useState("")
  const [empresa, setEmpresa] = useState("")
  const [categoria, setCategoria] = useState("")
  const [title, setTitle] = useState("")
  const router = useRouter()

  const fullTitle = "¡BIENVENIDO GRAN PROVEEDOR!"

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
    if (error) alert("Error al iniciar sesión: " + error.message)
    else router.push("/proveedor/dashboard")
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) alert("Error al registrarse: " + error.message)
    else {
      await supabase.from("proveedores").insert([
        { id: data.user?.id, nombre, empresa, categoria },
      ])
      alert("Cuenta creada, confirma tu correo y luego inicia sesión")
      setMode("login")
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen animated-bg text-black">
      <h1 className="text-4xl font-extrabold mb-4 tracking-wide">{title}</h1>
      <p className="text-xl mb-4">¡Conecta tus productos y servicios con Altok!</p>

      {!mode && (
        <div className="flex gap-6">
          <button onClick={() => setMode("login")}
            className="px-8 py-3 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100">
            Iniciar sesión
          </button>
          <button onClick={() => setMode("register")}
            className="px-8 py-3 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100">
            Registrarse
          </button>
        </div>
      )}

      {mode === "login" && (
        <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-6 w-80">
          <input type="email" placeholder="Correo electrónico" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-400"/>
          <input type="password" placeholder="Contraseña" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-400"/>
          <button className="px-8 py-3 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100">
            Entrar
          </button>
        </form>
      )}

      {mode === "register" && (
        <form onSubmit={handleRegister} className="flex flex-col gap-4 mt-6 w-80">
          <input type="text" placeholder="Nombre completo" value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="p-2 border rounded bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-400"/>
          <input type="text" placeholder="Empresa" value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            className="p-2 border rounded bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-400"/>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)}
            className="p-2 border rounded bg-white text-black focus:ring-2 focus:ring-blue-400">
            <option value="">Selecciona una categoría</option>
            <option value="Distribución">Distribución</option>
            <option value="Fabricación">Fabricación</option>
            <option value="Servicios">Servicios</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Alimentos">Alimentos</option>
            <option value="Moda">Moda</option>
          </select>
          <input type="email" placeholder="Correo electrónico" value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-400"/>
          <input type="password" placeholder="Contraseña" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded bg-white text-black placeholder-gray-500 focus:ring-2 focus:ring-blue-400"/>
          <button className="px-8 py-3 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100">
            Registrarse
          </button>
        </form>
      )}
    </main>
  )
}
