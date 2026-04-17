import type { Resort, HintSlot } from '../types'
import clueData from '../data/clues.json'

const clueMap = clueData as Record<string, {
  mountainSystem: string
  apresBars: string[]
  signatureHook: string
  skiNetwork: string
  geoTag: string
}>

export function buildHints(resort: Resort, revealedCount: number): HintSlot[] {
  const c = clueMap[resort.id]
  const definitions = [
    { id: 'mountain-system', order: 1, label: 'Mountain System', icon: 'Mountain',  value: c.mountainSystem },
    { id: 'apres-bars',      order: 2, label: 'Après Bars',      icon: 'Wine',      value: c.apresBars.join(' · ') },
    { id: 'signature-hook',  order: 3, label: 'Signature',       icon: 'Sparkles',  value: c.signatureHook },
    { id: 'ski-network',     order: 4, label: 'Ski Network',     icon: 'Link2',     value: c.skiNetwork },
    { id: 'geo-tag',         order: 5, label: 'Location',        icon: 'MapPin',    value: c.geoTag },
  ]
  return definitions.map(d => ({ ...d, revealed: d.order <= revealedCount }))
}
