"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function DashboardEmprendedor() {
  const [perfil, setPerfil] = useState<any>(null)
  const [resumen, setResumen] = useState<string>("")
  const [sugerencias, setSugerencias] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      // Perfil
      const { data: emprendedor } = await supabase
        .from("emprendedores")
        .select("*")
        .eq("id", user.id)
        .single()
      setPerfil(emprendedor)

      // Respuestas onboarding
      const { data: respuestas } = await supabase
        .from("respuestas_onboarding")
        .select("pregunta,respuesta")
        .eq("user_id", user.id)

      if (respuestas) {
        // Construir resumen dinámico
        const resumenTexto = respuestas.map(r => {
          if (r.pregunta.includes("especialización")) {
            return `${r.pregunta}: ${r.respuesta} (lo que más destacas de tus productos)`
          }
          return `${r.pregunta}: ${r.respuesta}`
        }).join("\n")
        setResumen(resumenTexto)

        // Algoritmo de sugerencias dinámicas
        const sector = respuestas.find(r => r.pregunta.includes("idea"))?.respuesta || ""
        const redes = respuestas.find(r => r.pregunta.includes("redes"))?.respuesta || "No"
        const sugerenciasGeneradas: string[] = []

        if (sector.includes("Alimentos")) {
          sugerenciasGeneradas.push("Explota la tendencia hacia productos saludables.")
          sugerenciasGeneradas.push("Haz un análisis FODA sobre empaques biodegradables y certificaciones.")
        } else if (sector.includes("Tecnología")) {
          sugerenciasGeneradas.push("Tu negocio apunta a innovación digital, explótalo en tu marketing.")
          sugerenciasGeneradas.push("Haz un análisis FODA sobre riesgos de ciberseguridad.")
        } else {
          sugerenciasGeneradas.push("Define tu propuesta de valor y realiza un análisis FODA.")
        }

        if (redes === "No") {
          sugerenciasGeneradas.push("Crea Instagram/TikTok y muéstralas en tu perfil.")
        } else {
          sugerenciasGeneradas.push("Integra tus redes sociales en tu perfil para aumentar visibilidad.")
        }

        setSugerencias(sugerenciasGeneradas)
      }
    }
    fetchData()
  }, [])

  async function actualizarPerfil() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return
    await supabase.from("emprendedores").update(perfil).eq("id", user.id)
    alert("Perfil actualizado ✅")
  }

  return (
    <main className="flex flex-col items-center justify-start min-h-screen animated-bg text-black relative p-6">
      {/* Flecha de regresar */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 text-2xl font-bold text-black hover:text-gray-700"
      >
        ←
      </button>

      <h1 className="text-4xl font-extrabold mb-6">Dashboard del Emprendedor</h1>

      {/* Perfil editable */}
      {perfil && (
        <div className="bg-white p-6 rounded-lg shadow w-full max-w-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Perfil</h2>
          <input
            type="text"
            value={perfil.nombre || ""}
            onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })}
            placeholder="Nombre completo"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            value={perfil.negocio || ""}
            onChange={(e) => setPerfil({ ...perfil, negocio: e.target.value })}
            placeholder="Nombre del negocio"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            value={perfil.sector || ""}
            onChange={(e) => setPerfil({ ...perfil, sector: e.target.value })}
            placeholder="Sector"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            value={perfil.redes || ""}
            onChange={(e) => setPerfil({ ...perfil, redes: e.target.value })}
            placeholder="Redes sociales (ej. Instagram, TikTok)"
            className="w-full p-2 border rounded mb-2"
          />
          <button
            onClick={actualizarPerfil}
            className="px-6 py-2 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100"
          >
            Guardar cambios
          </button>
        </div>
      )}

      {/* Resumen de respuestas */}
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-lg mb-6">
        <h2 className="text-2xl font-bold mb-4">Resumen del Onboarding</h2>
        <pre className="whitespace-pre-wrap text-gray-700">{resumen}</pre>
      </div>

      {/* Sugerencias dinámicas */}
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Sugerencias para tu negocio</h2>
        <ul className="list-disc pl-6 text-gray-700">
          {sugerencias.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}
