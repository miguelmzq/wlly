"use client"
import { useRouter } from "next/navigation"

export default function Cliente() {
  const router = useRouter()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen animated-bg text-black relative">
      {/* Flecha de regresar */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 text-2xl font-bold text-black hover:text-gray-700"
      >
        ←
      </button>

      <h1 className="text-3xl font-bold mb-4">Todavía en desarrollo 🔧</h1>
      <p className="text-gray-700">Estamos trabajando en tu experiencia.</p>
    </main>
  )
}
