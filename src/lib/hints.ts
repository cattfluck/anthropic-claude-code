import type { Resort, HintSlot } from '../types'

export function buildHints(resort: Resort, revealedCount: number): HintSlot[] {
  const definitions: Omit<HintSlot, 'revealed'>[] = [
    {
      id: 'mountain-range',
      order: 1,
      label: 'Mountain Range',
      icon: 'Mountain',
      value: resort.mountainRange,
    },
    {
      id: 'apres-bars',
      order: 2,
      label: 'Après Bars',
      icon: 'Wine',
      value: resort.apresBars.slice(0, 3).join(' · '),
    },
    {
      id: 'famous-runs',
      order: 3,
      label: 'Famous Runs',
      icon: 'Snowflake',
      value: resort.famousRuns.slice(0, 3).join(' · '),
    },
    {
      id: 'country',
      order: 4,
      label: 'Country',
      icon: 'MapPin',
      value: resort.country,
    },
    {
      id: 'mountain-stats',
      order: 5,
      label: 'Mountain Stats',
      icon: 'BarChart2',
      value: `${resort.verticalDropM}m vertical · ${resort.numberOfRuns} runs · ${resort.skiableAreaHa} ha · ${resort.annualSnowfallCm} cm snow/yr`,
    },
  ]

  return definitions.map((d) => ({ ...d, revealed: d.order <= revealedCount }))
}
