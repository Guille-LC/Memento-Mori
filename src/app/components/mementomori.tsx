'use client'
import { useState } from 'react'
import Image from 'next/image'

const YEARS = 80
const WEEKS_PER_YEAR = 52

export default function LifeRemaining() {
  /* Estados requeridos */
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [collapsed, setCollapsed] = useState(true)
  const [userName, setUserName] = useState<string | null>(null)
  
  /* Calcula la edad */
  const handleCalculate = () => {
    const day = prompt('Día de nacimiento (1-31)')
    const month = prompt('Mes de nacimiento (1-12)')
    const year = prompt('Año de nacimiento (ej: 1995)')

    if (!userName) {
      const name = prompt('¿Cuál es tu nombre?')
      if (!name) {
        alert('Nombre inválido')
        return
      }
      setUserName(name)
    }

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

  /* Cálculos de vida */
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
      <section className=" w-full max-w-[1100px] bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl space-y-6">

        {userName && (
          <div className="flex flex-col items-center gap-4">
    
          {/* Logo Blanco */}
          <Image src="/logoblanco.svg" alt="Omega" width={180} height={180} className="opacity-90 invert"/>
              
          {/* Nombre */}
          <h2 className="text-xl md:text-2xl font-semibold tracking-[0.4em] text-zinc-100 text-center">
            {userName.toUpperCase()}
          </h2>
              
          </div>
        )}

        {/* Botón para ingresar fecha de nacimiento */}
        <button onClick={handleCalculate} className="text-sm underline text-zinc-300">
          Ingresar fecha de nacimiento
        </button>

        {birthDate && (
          <div className="space-y-2 text-sm text-zinc-300">
            <p>
              Viviste <span className="text-emerald-400 font-medium">{livedWeeks}</span> semanas·
              Te quedan <span className="text-red-400 font-medium">{remainingWeeks}</span>
            </p>

            <p>Viviste aproximadamente <span className="font-medium">{livedDays}</span> días</p>

            <p>Eso representa <span className="font-medium">{percentage.toFixed(1)}%</span> de una vida promedio</p>
          </div>
        )}

        {/* Grilla de vida */}
        {birthDate && !collapsed && (
          <>
            <h1 className="text-center text-xl font-bold text-zinc-100">Renglon horizontal = 52 Semanas / 1 Año</h1>
            <div className="mt-8 flex justify-center">
              <div className="grid gap-[3px]" style={{gridTemplateColumns: 'repeat(52, 1fr)',}}>

                {Array.from({ length: totalWeeks }).map((_, index) => {
                  const lived = index < livedWeeks
                  const current = index === livedWeeks

                  const year = Math.floor(index / 52)

                  let color = 'bg-zinc-700/40'
                  if (lived) color = 'bg-zinc-100'
                  if (current) color = 'bg-amber-400'

                  return (
                    <div key={index} className={`w-[8px] h-[8px] rounded-[1px] ${color} ${year % 10 === 0 ? 'mt-2' : ''}`}/>
                  )
                })}
              </div>
            </div>
          </>
        )}

        {/* Información de vida */}
        <div className="text-xs text-zinc-400 text-center space-y-1 mt-6">
          <p>Viviste {livedWeeks} semanas</p>
          <p>Te quedan {remainingWeeks} semanas</p>
          <p>{percentage.toFixed(1)}% de una vida promedio</p>
        </div>

        {/* Botón para mostrar u ocultar la vida completa */}
        {birthDate && (
          <button onClick={() => setCollapsed(!collapsed)} className="text-xs underline text-zinc-400">
            {collapsed ? 'Ver vida completa' : 'Ocultar vida completa'}
          </button>
        )}

        <h2 className="flex items-center gap-2 text-sm uppercase tracking-widest text-zinc-400">
          Memento Mori
        </h2>

      </section>
    </div>
  )
}