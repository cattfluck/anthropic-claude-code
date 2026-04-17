import type { Resort, HintSlot } from '../types'
import resortPhotos from '../data/resort-photos.json'

const photoTitles = resortPhotos as Record<string, string>

export function buildHints(resort: Resort, revealedCount: number): HintSlot[] {
  const definitions: Omit<HintSlot, 'revealed'>[] = [
    {
      id: 'photo',
      order: 1,
      label: 'Resort Photo',
      icon: 'Camera',
      value: photoTitles[resort.id] ?? '',
    },
    {
      id: 'mountain-range',
      order: 2,
      label: 'Mountain Range',
      icon: 'Mountain',
      value: resort.mountainRange,
    },
    {
      id: 'apres-bars',
      order: 3,
      label: 'Après Bars',
      icon: 'Wine',
      value: resort.apresBars.slice(0, 3).join(' · '),
    },
    {
      id: 'famous-runs',
      order: 4,
      label: 'Famous Runs',
      icon: 'Snowflake',
      value: resort.famousRuns.slice(0, 3).join(' · '),
    },
    {
      id: 'country',
      order: 5,
      label: 'Country',
      icon: 'MapPin',
      value: resort.country,
    },
    {
      id: 'mountain-stats',
      order: 6,
      label: 'Mountain Stats',
      icon: 'BarChart2',
      value: `${resort.verticalDropM}m vertical · ${resort.numberOfRuns} runs · ${resort.skiableAreaHa} ha · ${resort.annualSnowfallCm} cm snow/yr`,
    },
  ]

  return definitions.map((d) => ({ ...d, revealed: d.order <= revealedCount }))
}
