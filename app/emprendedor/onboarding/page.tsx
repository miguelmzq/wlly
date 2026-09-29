"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [respuesta, setRespuesta] = useState("")
  const [resumen, setResumen] = useState<any[]>([])
  const [mensajeTemporal, setMensajeTemporal] = useState("")
  const [animacion, setAnimacion] = useState("")
  const [redesRespondidas, setRedesRespondidas] = useState(false)
  const [mensajeRedes, setMensajeRedes] = useState("")
  const [mostrarLinks, setMostrarLinks] = useState(false)

  const preguntas = [
    "¿Describe tu idea de negocio en unas breves palabras?",
    "¿Cuál es tu especialización (tu producto que más destaques)?",
    "¿Qué es lo que te hace diferente?"
  ]

  const mensajesEfimeros = [
    "Cargando",
    "Pensando en tu negocio",
    "Interesantes ideas",
    "Procesando información"
  ]

  // Animación de puntitos en bucle
  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      const puntos = ".".repeat((i % 3) + 1)
      setAnimacion(puntos)
      i++
    }, 500)
    return () => clearInterval(interval)
  }, [])

  async function guardarRespuesta(res: string) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    let respuestaFinal = res
    if (preguntas[step].includes("especialización")) {
      respuestaFinal = `${res} (lo que más destacas de tus productos)`
    }

    await supabase.from("respuestas_onboarding").insert([
      { user_id: user.id, pregunta: preguntas[step], respuesta: respuestaFinal }
    ])

    setResumen([...resumen, { pregunta: preguntas[step], respuesta: respuestaFinal }])
    setRespuesta("")

    const mensaje = mensajesEfimeros[step % mensajesEfimeros.length]
    setMensajeTemporal(mensaje)
    setTimeout(() => {
      setMensajeTemporal("")
      if (step < preguntas.length - 1) {
        setStep(step + 1)
      } else {
        setStep(preguntas.length)
      }
    }, 3000)
  }

  function generarPautas() {
    const idea = resumen[0]?.respuesta || "tu idea de negocio"
    const especializacion = resumen[1]?.respuesta || "tu producto principal"
    const diferencia = resumen[2]?.respuesta || "tu diferenciación"

    return [
      `Identificar una necesidad: Tu negocio responde a la necesidad de ${idea}.`,
      `Identificar al cliente: Tus clientes buscan ${especializacion}.`,
      `Analizar el mercado: Te diferencias por ${diferencia}, analiza cómo compites en ese aspecto.`,
      `Análisis FODA: Fortalezas = ${diferencia}, Oportunidades = tendencia del mercado, Debilidades = falta de posicionamiento, Amenazas = competencia.`,
      `Propuesta de valor: Ofreces ${especializacion} que solucionan ${idea}.`,
      `Modelo de negocio: Determina cómo producir, vender y generar ingresos.`,
      `Validar la idea: Prueba con clientes mediante encuestas o un MVP.`,
      `Analizar costos y rentabilidad: Calcula costos, ingresos y punto de equilibrio.`,
      `Marketing: Producto, precio, lugar y promoción.`,
      `Lanzar y mejorar: Comienza a vender, mide resultados y ajusta.`,
      `Recuerda: una vez que tengas tu idea concreta, regístrala en Indecopi para protegerla legalmente.`
    ]
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen animated-bg text-black p-6">
      <h1 className="text-4xl font-extrabold mb-6">Onboarding del Emprendedor</h1>

      {step < preguntas.length ? (
        <div className="flex flex-col items-center justify-center">
          {!mensajeTemporal ? (
            <>
              <p className="mb-4 text-xl">{preguntas[step]}</p>
              <div className="flex flex-col items-center">
                <input
                  type="text"
                  value={respuesta}
                  onChange={(e) => setRespuesta(e.target.value)}
                  className="p-2 border rounded bg-white text-black w-80"
                />
                <button
                  onClick={() => guardarRespuesta(respuesta)}
                  className="mt-4 px-8 py-3 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100"
                >
                  Guardar y continuar
                </button>
              </div>
            </>
          ) : (
            <p className="mt-4 text-xl text-gray-700 italic">
              {mensajeTemporal}{animacion}
            </p>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Resumen de tus respuestas</h2>
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-lg mb-6">
            {resumen.map((r, i) => (
              <p key={i} className="mb-2"><strong>{r.pregunta}</strong>: {r.respuesta}</p>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4">Pautas para tu negocio</h2>
          <div className="bg-white p-6 rounded-lg shadow w-full max-w-lg text-left mb-6">
            <ul className="list-disc pl-6 space-y-2">
              {generarPautas().map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>

          {/* Pregunta de redes sociales */}
          {!redesRespondidas ? (
            <div className="flex flex-col items-center gap-4">
              <p className="text-xl">¿Tienes redes sociales?</p>
              <button
                onClick={() => {
                  setRedesRespondidas(true)
                  setMensajeRedes("Perfecto, ya vas un paso adelante 🚀")
                  setMostrarLinks(true)
                }}
                className="px-6 py-2 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100"
              >
                Sí
              </button>
              <button
                onClick={() => {
                  setRedesRespondidas(true)
                  setMensajeRedes("¡Créalas de una vez! 💡 Es clave para potenciar tu emprendimiento")
                  setMostrarLinks(true)
                }}
                className="px-6 py-2 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100"
              >
                No
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-4">
              <p className="text-gray-700 italic">{mensajeRedes}</p>
              {mostrarLinks && (
                <div className="flex flex-col gap-2 text-center mt-2">
                  <a href="https://www.instagram.com/accounts/emailsignup/" target="_blank" className="text-blue-600 underline">
                    Crear cuenta en Instagram
                  </a>
                  <a href="https://www.tiktok.com/signup" target="_blank" className="text-blue-600 underline">
                    Crear cuenta en TikTok
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Pregunta del RUC */}
          <div className="flex flex-col items-center mt-8">
            <p className="text-xl">¿Tienes tu RUC?</p>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => alert("Perfecto, ya tienes tu RUC ✅")}
                className="px-6 py-2 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100"
              >
                Sí
              </button>
              <button
                onClick={() => alert("Aquí tienes la información para sacar tu RUC")}
                className="px-6 py-2 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100"
              >
                No
              </button>
            </div>

            <p className="mt-4 text-gray-700 italic">
              Si aún no tienes RUC, puedes obtenerlo en la página oficial de SUNAT:{" "}
              <a
                href="https://www.sunat.gob.pe/empresas/inscripcion-ruc"
                target="_blank"
                className="text-blue-600 underline"
              >
                Cómo sacar tu RUC
              </a>
            </p>
          </div>

          {/* Botón para continuar al perfil */}
          <div className="mt-8">
            <button
              onClick={async () => {
                const { data: { user } } = await supabase.auth.getUser()
                if (!user) return
                await supabase.from("emprendedores").update({ primer_login: false }).eq("id", user.id)
                // Redirigir al perfil
                window.location.href = "/perfil"
              }}
              className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow hover:bg-blue-700"
            >
              Continúa personalizando tu perfil de emprendedor
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
