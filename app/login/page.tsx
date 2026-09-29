"use client"
import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()

  return (
    <main className="flex flex-col items-center justify-center min-h-screen animated-bg text-black">
      <h1 className="text-8xl font-extrabold mb-4 tracking-wide">altok</h1>

      <h2 className="text-xl mb-4">¿Eres Cliente, Emprendedor o Proveedor?</h2>

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/cliente")}
          className="px-8 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-100 transition-transform transform hover:scale-105"
        >
          Cliente
        </button>
        <button
          onClick={() => router.push("/emprendedor")}
          className="px-8 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-100 transition-transform transform hover:scale-105"
        >
          Emprendedor
        </button>
        <button
          onClick={() => router.push("/proveedor")}
          className="px-8 py-3 bg-white text-black font-semibold rounded-lg shadow hover:bg-gray-100 transition-transform transform hover:scale-105"
        >
          Proveedor
        </button>
      </div>
    </main>
  )
}
