"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [text, setText] = useState("")
  const fullText = "altok"

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setText(fullText.slice(0, i + 1))
      i++
      if (i === fullText.length) clearInterval(interval)
    }, 200) // velocidad de escritura (200ms por letra)
    return () => clearInterval(interval)
  }, [])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen animated-bg text-black">
      <h1 className="text-8xl font-extrabold mb-4 tracking-wide">
        {text}
      </h1>
      <p className="text-2xl italic mb-8">
        "Si lo sueñas, crea, empieza y conecta al toque"
      </p>

      <button
        onClick={() => router.push("/login")}
        className="px-8 py-3 bg-white text-black font-bold rounded-lg shadow hover:bg-gray-100 transition-transform transform hover:scale-105"
      >
        ¡Empieza al toque!
      </button>
    </main>
  )
}
