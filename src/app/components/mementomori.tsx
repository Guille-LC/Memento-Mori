'use client'
import { useState } from 'react'
import Image from 'next/image'

const YEARS = 80
const WEEKS_PER_YEAR = 52

export default function LifeRemaining() {
  /* Nueva funcionalidad */
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [collapsed, setCollapsed] = useState(true)
  

  /* Calcula la edad */
  const handleCalculate = () => {
    const day = prompt('Día de nacimiento (1-31)')
    const month = prompt('Mes de nacimiento (1-12)')
    const year = prompt('Año de nacimiento (ej: 1995)')

    if (!day || !month || !year) {
      alert('Datos inválidos')
      return
    }

    const birth = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    )

    if (isNaN(birth.getTime())) {
      alert('Fecha inválida')
      return
    }

    setBirthDate(birth)
  }

  let livedDays = 0
  let livedWeeks = 0
  const totalWeeks = YEARS * WEEKS_PER_YEAR
  let remainingWeeks = totalWeeks
  let percentage = 0

  if (birthDate) {
    const today = new Date()
    const diffMs = today.getTime() - birthDate.getTime()
    livedDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    livedWeeks = Math.floor(livedDays / 7)
    remainingWeeks = Math.max(totalWeeks - livedWeeks, 0)
    percentage = Math.min((livedWeeks / totalWeeks) * 100, 100)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-4">
      <section className=" w-full max-w-4xl lg:min-w-[900px] bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl space-y-4 text-center">


        <h2 className="flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-400">
          Memento Mori
          <Image src="/omega.png" alt="Omega" width={25} height={25} className="opacity-80"/>
        </h2>
        
        <button
          onClick={handleCalculate}
          className="text-sm underline text-zinc-300"
        >
          Ingresar fecha de nacimiento
        </button>

        {birthDate && (
  <div className="space-y-2 text-sm text-zinc-300">
    <p>
      Viviste <span className="text-emerald-400 font-medium">{livedWeeks}</span> semanas ·
      Te quedan <span className="text-red-400 font-medium">{remainingWeeks}</span>
    </p>

    <p>
      Viviste aproximadamente <span className="font-medium">{livedDays}</span> días
    </p>

    <p>
      Eso representa <span className="font-medium">{percentage.toFixed(1)}%</span> de una vida promedio
    </p>
  </div>
)}


        {birthDate && !collapsed && (
          <div className="mt-6 flex justify-center">

            <div className="grid grid-cols-[repeat(52,1fr)] gap-[2px]">
              {Array.from({ length: totalWeeks }).map((_, index) => {
                const lived = index < livedWeeks
                const current = index === livedWeeks

                let color = 'bg-zinc-800'
                if (lived) color = 'bg-emerald-500/80'
                if (current) color = 'bg-amber-400'

                return (
                  <div
                    key={index}
                    className={`w-[6px] h-[6px] sm:w-[8px] sm:h-[8px] rounded-sm ${color}`}
                  />
                )
              })}
            </div>
          </div>
        )}

        {birthDate && (
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-xs underline text-zinc-400"
          >
            {collapsed ? 'Ver vida completa' : 'Ocultar vida completa'}
          </button>
        )}

      </section>
    </div>
  )
}
