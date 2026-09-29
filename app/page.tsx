"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Home() {
  const router = useRouter()
  const [text, setText] = useState("")
  const fullText = "Cotiza. Vende. Conecta."

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1))
      i++
      if (i === fullText.length) clearInterval(interval)
    }, 150) // velocidad de escritura
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen animated-bg text-black">
      {/* Logo con espacio moderado debajo */}
      <Image
        src="/logo.svg"
        alt="Altok Logo"
        width={400}
        height={120}
        priority
        className="mb-4"
      />

      {/* Texto con efecto de escritura y espacio moderado */}
      <h2 className="text-2xl mb-4">
        {text}
      </h2>

      {/* Botón simple y elegante */}
      <button
        onClick={() => router.push("/login")}
        className="px-8 py-3 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100 transition-transform transform hover:scale-105 flex gap-4 mt-6"
      >
        ¡Empieza al toque!
      </button>
    </main>
  )
}
