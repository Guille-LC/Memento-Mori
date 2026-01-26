'use client'
import { useState } from 'react'
import Image from 'next/image'

const YEARS = 80
const WEEKS_PER_YEAR = 52
const TOTAL_WEEKS = YEARS * WEEKS_PER_YEAR

export default function LifeRemaining() {
  /* Estados */
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [collapsed, setCollapsed] = useState(true)
  const [userName, setUserName] = useState<string | null>(null)
  const [moodScores, setMoodScores] = useState<number[]>([])

  /* Fake moodscore */
  const generateMoodScores = (weeks: number) =>
    Array.from({ length: weeks }, () =>
      Math.floor(Math.random() * 10) + 1
    )

  const getMoodColor = (score: number) => {
    if (score <= 2) return 'bg-red-600'
    if (score <= 4) return 'bg-orange-500'
    if (score <= 6) return 'bg-yellow-400'
    if (score <= 8) return 'bg-lime-400'
    return 'bg-green-500'
  }

  /* Input de datos */
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
    setMoodScores(generateMoodScores(TOTAL_WEEKS))
  }

  /* Cálculos */
  let livedDays = 0
  let livedWeeks = 0
  let remainingWeeks = TOTAL_WEEKS
  let percentage = 0

  if (birthDate) {
    const today = new Date()
    const diffMs = today.getTime() - birthDate.getTime()
    livedDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    livedWeeks = Math.floor(livedDays / 7)
    remainingWeeks = Math.max(TOTAL_WEEKS - livedWeeks, 0)
    percentage = Math.min((livedWeeks / TOTAL_WEEKS) * 100, 100)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center px-4">
      <section className="w-full max-w-[1100px] bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl space-y-6">

        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/logoblanco.svg"
            alt="Omega"
            width={180}
            height={180}
            className="opacity-90 invert"
          />
        </div>

        {userName && (
          <h2 className="text-xl md:text-2xl font-semibold tracking-[0.4em] text-center">
            {userName.toUpperCase()}
          </h2>
        )}

        <div className="flex justify-center">
          <button
            onClick={handleCalculate}
            className="text-sm underline text-zinc-300"
          >
            Ingresar fecha de nacimiento
          </button>
        </div>

        {birthDate && (
          <div className="text-sm text-zinc-300 text-center space-y-1">
            <p>
              Viviste <span className="text-emerald-400">{livedWeeks}</span> semanas ·
              Te quedan <span className="text-red-400">{remainingWeeks}</span>
            </p>
            <p>Viviste aproximadamente <strong>{livedDays}</strong> días</p>
            <p>Eso representa <strong>{percentage.toFixed(1)}%</strong> de una vida promedio</p>
          </div>
        )}

        {/* Grilla */}
        {birthDate && !collapsed && (
          <>
            <h1 className="text-center text-xl font-bold">
              Renglón horizontal = 52 semanas / 1 año
            </h1>

            <div className="flex justify-center mt-8">
              <div
                className="grid gap-[3px]"
                style={{ gridTemplateColumns: 'repeat(52, 1fr)' }}
              >
                {Array.from({ length: TOTAL_WEEKS }).map((_, index) => {
                  const isLived = index < livedWeeks
                  const isCurrent = index === livedWeeks

                  let color = 'bg-zinc-700/40'
                  let mood: number | null = null

                  if (isLived) {
                    mood = moodScores[index] ?? 5
                    color = getMoodColor(mood)
                  }
                
                  if (isCurrent) color = 'bg-amber-400'
                
                  const weekOfYear = index % 52
                  const year = Math.floor(index / 52)
                
                  return (
                    <div
                      key={index}
                      className={`
                        w-[8px] h-[8px] rounded-[1px]
                        ${color}
                        ${weekOfYear !== 0 && weekOfYear % 13 === 0 ? 'ml-0.5' : ''}
                        ${year % 10 === 0 ? 'mt-2' : ''}
                      `}
                      title={mood ? `Mood: ${mood}` : ''}
                    />
                  )
                })}
              </div>
            </div>
          </>
        )}

        {birthDate && (
          <div className="flex justify-center">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="text-xs underline text-zinc-400"
            >
              {collapsed ? 'Ver vida completa' : 'Ocultar vida completa'}
            </button>
          </div>
        )}

        <h2 className="flex items-center justify-center gap-2 text-sm uppercase tracking-widest text-zinc-400">
          MEMENTO MORI
          <Image src="/omega.png" alt="omega" width={20} height={20} className="invert opacity-90" />
        </h2>

      </section>
    </div>
  )
}
