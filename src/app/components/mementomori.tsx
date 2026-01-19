'use client'
import { useState } from 'react'

const LIFE_EXPECTANCY = 80

export default function LifeRemaining() {
  const [result, setResult] = useState<number | null>(null)
  const [edadDelUser, setEdadDelUser] = useState<number | null>(null)

  const handleCalculate = () => {
    const input = prompt('Ingrese su edad')

    if (!input || isNaN(Number(input)) || Number(input) < 0) {
      alert('Por favor ingrese una edad válida.')
      return
    }

    const edad = Number(input)
    setEdadDelUser(edad)
    setResult(LIFE_EXPECTANCY - edad)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-4">
  <section className="max-w-md w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4 text-center">

    <h2 className="text-sm uppercase tracking-widest text-zinc-400">
      Memento Mori
    </h2>

    {edadDelUser !== null && (
      <>
        <h1 className="text-3xl font-semibold text-zinc-100">
          Vos tenés {edadDelUser} años
        </h1>

        <p className="text-zinc-300 leading-relaxed">
          Has vivido aproximadamente {edadDelUser * 365} días.
        </p>
      </>
    )}

    <button
      onClick={handleCalculate}
      className="w-full mt-4 bg-zinc-100 text-zinc-900 py-2 rounded-xl font-medium hover:bg-zinc-200 transition"
    >
      Calcular
    </button>

    {result !== null && (
      <>
        <p className="text-zinc-200 font-medium">
          {result > 0
            ? `Te quedan aproximadamente ${result} años de vida.`
            : `Ya superaste la esperanza de vida promedio.`}
        </p>

        <p className="text-red-400 font-semibold">
          Te quedan por vivir aproximadamente {result * 365} días.
        </p>
      </>
    )}

  </section>
</div>

  )
}
