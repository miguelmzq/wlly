"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()
  const [text, setText] = useState("")
  const fullText = "¿Eres Cliente, Emprendedor o Proveedor?"

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1))
      i++
      if (i === fullText.length) clearInterval(interval)
    }, 100) // velocidad de escritura
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen animated-bg text-black">
      {/* Logo desde /public */}
      <Image
        src="/logo.svg"
        alt="Altok Logo"
        width={400}
        height={120}
        priority
      />

      {/* Texto con efecto de escritura y tipografía por defecto */}
      <h2 className="text-2xl mb-4 mt-6">
        {text}
      </h2>

      {/* Botones de redirección */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={() => router.push("/cliente")}
          className="px-6 py-3 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100 transition-transform transform hover:scale-105"
        >
          Cliente
        </button>
        <button
          onClick={() => router.push("/emprendedor")}
          className="px-6 py-3 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100 transition-transform transform hover:scale-105"
        >
          Emprendedor
        </button>
        <button
          onClick={() => router.push("/proveedor")}
          className="px-6 py-3 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100 transition-transform transform hover:scale-105"
        >
          Proveedor
        </button>
      </div>
    </main>
  )
}
